import TableHandler from "@/components/TableHandler";
import { CountSpaceCategory, CountSpaceItem } from "@prisma/client";
import SummaryActions from "./SummaryActions";
import { NewCategory } from "./NewCategory";
import { Edit } from "lucide-react";
import { EditCategory } from "./EditCategory";

interface ExtendedCountSpaceCategory extends CountSpaceCategory {
  items: CountSpaceItem[];
}

interface CategoriesTableProps {
  categories: ExtendedCountSpaceCategory[];
  countSpaceId: number;
}

const SummaryTable = ({ categories, countSpaceId }: CategoriesTableProps) => {
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
    actions: (
      <SummaryActions
        category={name}
        countSpaceCategoryId={id}
        budget={budget}
        unit={unit}
      />
    ),
  }));

  return (
    <div>
      <div className="flex gap-3 items-center">
        <h2 className="my-0">Summary</h2>
        <NewCategory countSpaceId={countSpaceId} />
      </div>

      <TableHandler columnHeaders={tableHeader} rows={tableRows} />
    </div>
  );
};

export default SummaryTable;
