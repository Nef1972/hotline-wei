import { Order } from "@/lib/api/domain/entity/Order";
import { DoneTag } from "@/lib/components/shared/tags/DoneTag";
import { InProgressTag } from "@/lib/components/shared/tags/InProgressTag";
import { DeletedTag } from "@/lib/components/shared/tags/DeletedTag";

export const statusTag = (order: Order) => {
  switch (order.status) {
    case "DONE":
      return <DoneTag />;
    case "IN_PROGRESS":
      return <InProgressTag />;
    case "DELETED":
      return <DeletedTag />;
    default:
      return null;
  }
};
