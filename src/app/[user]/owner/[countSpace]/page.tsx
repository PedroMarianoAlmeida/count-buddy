import { getOneCountSpace } from "@/server/actions/countSpace";
import { getUserNameByEmail } from "@/server/actions/user";
import { getServerSession } from "next-auth";

import SummaryTable from "./Summary/SummaryTable";
import HistoryTable from "./HistoryTable";

const CountSpacePage = async ({
  params: { user, countSpace },
}: {
  params: { user: string; countSpace: string };
}) => {
  //TODO: Pass this logic to Layout (and use on [user]/page too)
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
    ownerName: user,
  });

  if (!countSpaceDetails.success) return <div>Error, try again</div>;
  const { categories } = countSpaceDetails.result;

  return (
    <main>
      <h1>CountSpace Details</h1>
      <SummaryTable categories={categories} />
      <HistoryTable categories={categories} />
    </main>
  );
};

export default CountSpacePage;
