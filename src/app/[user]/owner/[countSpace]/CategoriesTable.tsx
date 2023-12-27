import TableHandler from "@/components/TableHandler";
import { CountSpaceCategory } from "@prisma/client";

interface CategoriesTableProps {
  categories: CountSpaceCategory[];
}

const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const tableHeader = [
    { key: "name", value: "Name" },
    { key: "budget", value: "Budget" },
    { key: "unit", value: "Unit" },
  ];
  const tableRows = categories.map(({ name, budget, unit }) => ({
    name,
    budget: budget ?? "-",
    unit: unit ?? "-",
  }));

  return <TableHandler columnHeaders={tableHeader} rows={tableRows} />;
};

export default CategoriesTable;
