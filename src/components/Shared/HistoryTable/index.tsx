import TableHandler from "@/components/TableHandler";
import { CountSpaceCategory, CountSpaceItem } from "@prisma/client";
import HistoryActions from "./HistoryActions";
import { format } from "date-fns";

export type CountSpaceItemShared = Pick<
  CountSpaceItem,
  "name" | "amount" | "id" | "itemDate"
>;
interface ExtendedCountSpaceCategory extends CountSpaceCategory {
  items: CountSpaceItem[];
}

interface CategoriesTableProps {
  categories: ExtendedCountSpaceCategory[];
}

const HistoryTable = ({ categories }: CategoriesTableProps) => {
  const tableHeader = [
    { key: "category", value: "Category" },
    { key: "name", value: "Description" },
    { key: "amount", value: "Amount" },
    { key: "itemDate", value: "Date" },
    { key: "actions", value: "Actions" },
  ];
  const tableRows = categories
    .map(({ name: category, items }) =>
      items.map(({ name, amount, createdAt, id, itemDate }) => ({
        category,
        name,
        amount,
        actions: (
          <HistoryActions
            name={name}
            amount={amount}
            id={id}
            itemDate={itemDate}
          />
        ),
        itemDate: format(itemDate, "yyyy MMM dd"),
        sort: createdAt.getTime(),
      }))
    )
    .flat()
    .sort((a, b) => b.sort - a.sort);

  return (
    <div>
      <h2 className="my-0">History</h2>
      <TableHandler columnHeaders={tableHeader} rows={tableRows} />
    </div>
  );
};

export default HistoryTable;
