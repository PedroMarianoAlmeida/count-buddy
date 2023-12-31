import { getOneCountSpace } from "@/server/actions/countSpace";
import { getUserNameByEmail } from "@/server/actions/user";
import { getServerSession } from "next-auth";

import SummaryTable from "@/components/Shared/SummaryTable";
import HistoryTable from "@/components/Shared/HistoryTable";

const CountSpacePage = async ({
  params: { user, countSpace },
}: {
  params: { user: string; countSpace: string };
}) => {

  const countSpaceDetails = await getOneCountSpace({
    countSpaceSlug: countSpace,
    ownerName: user,
  });

  if (!countSpaceDetails.success) return <div>Error, try again</div>;
  const { categories, id, name: countSpaceName } = countSpaceDetails.result;

  return (
    <main className="px-2 flex flex-col">
      <h1 className="text-center">{countSpaceName} Details</h1>
      <SummaryTable categories={categories} countSpaceId={id} />
      <HistoryTable categories={categories} />
    </main>
  );
};

export default CountSpacePage;
