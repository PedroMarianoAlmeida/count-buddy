import { EditRecord } from "./EditRecord";
import { CountSpaceItemShared } from "@/components/Shared/HistoryTable";

const HistoryActions = ({
  amount,
  id,
  name,
  itemDate,
}: CountSpaceItemShared) => {
  return (
    <div className="flex gap-2">
      <EditRecord name={name} amount={amount} id={id} itemDate={itemDate} />
    </div>
  );
};

export default HistoryActions;
