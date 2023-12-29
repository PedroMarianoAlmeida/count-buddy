import OwnedCountSpaceTable from "@/components/Dashboard/OwnedCountSpaceTable";
import { getAllUserCountSpaces } from "@/server/actions/countSpace";

const DashboardPage = async () => {
  const countSpace = await getAllUserCountSpaces();

  if (!countSpace.success) return <div>Failing fetching your Count Spaces</div>;

  return (
    <main>
      <h1>Dashboard</h1>
      <OwnedCountSpaceTable countSpace={countSpace.result} />
    </main>
  );
};

export default DashboardPage;
