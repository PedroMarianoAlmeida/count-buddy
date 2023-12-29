"use client";

import { AddRecord } from "./AddRecord";
import { EditCategory } from "./EditCategory";

const SummaryActions = ({
  category,
  countSpaceCategoryId,
  budget,
  unit,
}: {
  category: string;
  countSpaceCategoryId: number;
  budget: number | null;
  unit: string | null;
}) => {
  return (
    <div className="flex gap-2">
      <AddRecord
        category={category}
        countSpaceCategoryId={countSpaceCategoryId}
      />
      <EditCategory
        category={category}
        countSpaceCategoryId={countSpaceCategoryId}
        budget={budget}
        unit={unit}
      />
    </div>
  );
};

export default SummaryActions;
