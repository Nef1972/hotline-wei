import { PeopleRepository } from "@/lib/api/domain/repository/PeopleRepository";
import { People } from "@/lib/api/domain/entity/People";
import { resend } from "@/lib/client/email/resend";
import { AccessRequest } from "@/lib/api/domain/entity/AccessRequest";
import env from "@/lib/utils/env";

export const sendAnAccessRequestEmailToAdmins = async (
  repo: PeopleRepository,
  params: { people: People; accessRequest: AccessRequest },
): Promise<People[]> => {
  const adminsInvolved: People[] = await repo.findAllByRolePermissions({
    hasFullAccess: true,
  });

  const adminEmails: string[] = adminsInvolved.map((admin) => admin.email);

  if (adminEmails.length === 0) return [];

  const email = await resend.emails.send({
    from: "Weinter is coming <no-reply@weinter-is-coming.com>",
    to: adminEmails,
    subject: "Nouvelle demande d'accès à l'application",
    html: `
      <p>Bonjour,</p>
      <p>Un utilisateur demande l'accès à l'application.</p>
      <p>
        <strong>Prénom : </strong> ${params.people.firstName}<br/>
        <strong>Nom : </strong> ${params.people.lastName}<br/>
        <strong>Date : </strong> ${params.accessRequest.createdAt.toLocaleString(
          "fr-FR",
          {
            dateStyle: "medium",
            timeStyle: "short",
          },
        )}<br/>
      </p>
      <p>
        Cliquez ici pour gérer les demandes :<br/>
        <a href="${env.appUrl}/admin">
          Voir les demandes
        </a>
      </p>
    `,
  });

  console.info("Mail sent : ", email);

  return adminsInvolved;
};
