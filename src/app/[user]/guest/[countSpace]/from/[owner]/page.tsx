import HistoryTable from "@/app/[user]/owner/[countSpace]/HistoryTable";
import SummaryTable from "@/app/[user]/owner/[countSpace]/Summary/SummaryTable";
import { getOneCountSpace } from "@/server/actions/countSpace";
import { getUserNameByEmail } from "@/server/actions/user";
import { getServerSession } from "next-auth";

const CountSpaceGuestPage = async ({
  params: { user, countSpace, owner },
}: {
  params: { user: string; countSpace: string; owner: string };
}) => {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email)
    return <div>Go back home page</div>;

  const data = await getUserNameByEmail(session.user.email);
  if (!data.success) return <div>Go back home page</div>;

  const {
    result: { name },
  } = data;

  if (name !== user) return <div>Go back home page</div>;
  // -----------------------------

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
