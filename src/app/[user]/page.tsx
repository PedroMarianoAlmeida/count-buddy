import { addNewCountSpaceItem, addUserAsGuestInExistingCountSpace, getAllUserCountSpaces } from "@/server/actions/countSpace";
import { getUserNameByEmail } from "@/server/actions/user";
import { getServerSession } from "next-auth";

const DashboardPage = async ({
  params: { user },
}: {
  params: { user: string };
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
  const countSpace = await getAllUserCountSpaces()

  if (!countSpace.success) return <div>Failing fetching your Count Spaces</div>;
  // console.log(countSpace.result)

  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
};

export default DashboardPage;
