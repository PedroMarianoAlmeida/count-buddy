import { getAllUserCountSpaces } from "@/server/actions/countSpace";

const DashboardPage = async ({
  params: { user },
}: {
  params: { user: string };
}) => {
  const countSpace = await getAllUserCountSpaces();

  if (!countSpace.success) return <div>Failing fetching your Count Spaces</div>;
  // console.log(countSpace.result)

  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
};

export default DashboardPage;
