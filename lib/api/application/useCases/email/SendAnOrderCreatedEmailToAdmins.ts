import { PeopleRepository } from "@/lib/api/domain/repository/PeopleRepository";
import { People } from "@/lib/api/domain/entity/People";
import { resend } from "@/lib/client/email/resend";
import env from "@/lib/utils/env";
import { Order } from "@/lib/api/domain/entity/Order";
import { ItemRepository } from "@/lib/api/domain/repository/ItemRepository";
import { Item } from "@/lib/api/domain/entity/Item";

export const sendAnOrderCreatedEmailToAdmins = async (
  peopleRepo: PeopleRepository,
  itemRepo: ItemRepository,
  params: { people: People; order: Order },
): Promise<People[]> => {
  const adminsInvolved: People[] = await peopleRepo.findAllByRolePermissions({
    hasFullAccess: true,
  });

  const adminEmails: string[] = adminsInvolved.map((admin) => admin.email);

  if (adminEmails.length === 0) return [];

  const item: Item | undefined = await itemRepo.findById(params.order.itemId);

  const email = await resend.emails.send({
    from: "Hotline Wei <no-reply@weinter-is-coming.com>",
    to: adminEmails,
    subject: "Nouvelle commande",
    html: `
      <p>Bonjour,</p>
      <p>Une nouvelle commande est arrivée : </p>
      <p>
        <strong>Prénom : </strong> ${params.people.firstName}<br/>
        <strong>Nom : </strong> ${params.people.lastName}<br/>
      </p>
      <p>
        <strong>Commande : </strong> ${item?.title}<br/>
        <strong>Date de livraison : </strong> ${params.order.createdAt.toLocaleString(
          "fr-FR",
          {
            dateStyle: "medium",
            timeStyle: "short",
          },
        )}<br/>
        <strong>Lieu de livraison : </strong> ${params.order.deliverPlace}<br/>
      </p>
      <p>
        Cliquez ici pour gérer les commandes :<br/>
        <a href="${env.appUrl}/admin">
          Voir les commandes
        </a>
      </p>
    `,
  });

  console.info("Mail sent : ", email);

  return adminsInvolved;
};
