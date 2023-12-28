"use client";

import { AddRecord } from "./AddRecord";

const SummaryActions = ({
  category,
  countSpaceCategoryId,
}: {
  category: string;
  countSpaceCategoryId: number;
}) => {
  return (
    <div>
      <AddRecord category={category} countSpaceCategoryId={countSpaceCategoryId}/>
    </div>
  );
};

export default SummaryActions;
