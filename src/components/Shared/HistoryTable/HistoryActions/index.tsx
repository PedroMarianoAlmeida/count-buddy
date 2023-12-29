import { EditRecord } from "./EditRecord";
import { CountSpaceItemShared } from "@/components/Shared/HistoryTable";

const HistoryActions = ({ amount, id, name }: CountSpaceItemShared) => {
  return (
    <div className="flex gap-2">
      <EditRecord name={name} amount={amount} id={id} />
    </div>
  );
};

export default HistoryActions;
