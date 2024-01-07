import GuestedCountSpaceTable from "@/components/Dashboard/GuestedCountSpaceTable";
import InvitationsToCountSpace from "@/components/Dashboard/InvitationsToCountSpace";
import OwnedCountSpaceTable from "@/components/Dashboard/OwnedCountSpaceTable";

const DashboardPage = async () => {
  return (
    <main>
      <h1>Dashboard</h1>
      <OwnedCountSpaceTable />
      <GuestedCountSpaceTable />
      <InvitationsToCountSpace />
    </main>
  );
};

export default DashboardPage;
