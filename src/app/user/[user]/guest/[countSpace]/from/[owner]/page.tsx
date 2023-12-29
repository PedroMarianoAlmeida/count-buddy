import HistoryTable from "@/components/Shared/HistoryTable";
import SummaryTable from "@/components/Shared/SummaryTable";
import { getOneCountSpace } from "@/server/actions/countSpace";

const CountSpaceGuestPage = async ({
  params: { countSpace, owner },
}: {
  params: { user: string; countSpace: string; owner: string };
}) => {
  const countSpaceDetails = await getOneCountSpace({
    countSpaceName: countSpace,
    ownerName: owner,
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

export default CountSpaceGuestPage;
