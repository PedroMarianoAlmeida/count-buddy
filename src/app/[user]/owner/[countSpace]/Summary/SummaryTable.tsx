import TableHandler from "@/components/TableHandler";
import { CountSpaceCategory, CountSpaceItem } from "@prisma/client";
import SummaryActions from "./SummaryActions";

interface ExtendedCountSpaceCategory extends CountSpaceCategory {
  items: CountSpaceItem[];
}

interface CategoriesTableProps {
  categories: ExtendedCountSpaceCategory[];
}

const SummaryTable = ({ categories }: CategoriesTableProps) => {
  const tableHeader = [
    { key: "name", value: "Name" },
    { key: "budget", value: "Budget" },
    { key: "total", value: "Total" },
    { key: "unit", value: "Unit" },
    { key: "actions", value: "Actions" },
  ];
  const tableRows = categories.map(({ name, budget, unit, items, id }) => ({
    name,
    budget: budget ?? "-",
    total: items.reduce((acc, { amount }) => acc + amount, 0),
    unit: unit ?? "-",
    actions: <SummaryActions category={name} countSpaceCategoryId={id} />,
  }));

  return (
    <div>
      <h2>Summary</h2>
      <TableHandler columnHeaders={tableHeader} rows={tableRows} />
    </div>
  );
};

export default SummaryTable;
