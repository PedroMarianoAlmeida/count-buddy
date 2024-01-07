import TableHandler from "@/components/TableHandler";
import { getAllUserCountSpacesGuests } from "@/server/actions/userCountSpaceGuest";
import GuestCountSpaceActions from "./Actions";

const GuestedCountSpaceTable = async () => {
  const countSpaceGuests = await getAllUserCountSpacesGuests();
  if (!countSpaceGuests.success)
    return <div>Failing fetching your Count Spaces</div>;

  if (countSpaceGuests.result.length === 0)
    return <div>No Count Spaces as Guest</div>;

  const data = countSpaceGuests.result;

  const tableHeader = [
    { key: "name", value: "Name" },
    { key: "ownerName", value: "Owner" },
    { key: "actions", value: "Actions" },
  ];

  const tableRows = data.map(({ countSpace: { name, ownerName, slug } }) => ({
    name,
    ownerName,
    actions: (
      <GuestCountSpaceActions ownerName={ownerName} countSpaceSlug={slug} />
    ),
  }));
  return <TableHandler columnHeaders={tableHeader} rows={tableRows} />;
};

export default GuestedCountSpaceTable;
