import InvitationsToCountSpace from "@/components/Dashboard/InvitationsToCountSpace";
import OwnedCountSpaceTable from "@/components/Dashboard/OwnedCountSpaceTable";

const DashboardPage = async () => {
  return (
    <main>
      <h1>Dashboard</h1>
      <OwnedCountSpaceTable />
      <InvitationsToCountSpace />
    </main>
  );
};

export default DashboardPage;
