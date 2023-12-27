"use client";

import { AddRecord } from "./AddRecord";

const SummaryActions = ({category}: {category: string}) => {
  return (
    <div>
      <AddRecord category={category}/>
    </div>
  );
};

export default SummaryActions;
