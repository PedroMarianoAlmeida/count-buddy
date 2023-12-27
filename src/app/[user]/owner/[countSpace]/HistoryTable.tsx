import TableHandler from "@/components/TableHandler";
import { CountSpaceCategory, CountSpaceItem } from "@prisma/client";

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
    { key: "actions", value: "Actions" },
  ];
  const tableRows = categories
    .map(({ name: category, items }) =>
      items.map(({ name, amount }) => ({ category, name, amount, actions: "Edit" }))
    )
    .flat();

  return (
    <div>
      <h2>History</h2>
      <TableHandler columnHeaders={tableHeader} rows={tableRows} />
    </div>
  );
};

export default HistoryTable;
