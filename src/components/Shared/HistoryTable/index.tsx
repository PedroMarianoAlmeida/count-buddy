import TableHandler from "@/components/TableHandler";
import { convertDateToYYYYMMDD } from "@/utils/date";
import { CountSpaceCategory, CountSpaceItem } from "@prisma/client";
import HistoryActions from "./HistoryActions";

export type CountSpaceItemShared = Pick<CountSpaceItem, "name" | "amount" | "id"> 
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
    { key: "createdAt", value: "Date" },
    { key: "actions", value: "Actions" },
  ];
  const tableRows = categories
    .map(({ name: category, items }) =>
      items.map(({ name, amount, createdAt, id }) => ({
        category,
        name,
        amount,
        actions: (
          <HistoryActions name={name} amount={amount} id={id} />
        ),
        createdAt: convertDateToYYYYMMDD(createdAt),
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