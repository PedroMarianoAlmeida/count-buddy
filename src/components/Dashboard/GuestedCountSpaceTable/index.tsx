import TableHandler from "@/components/TableHandler";
import { getAllUserCountSpacesGuests } from "@/server/actions/userCountSpaceGuest";

const GuestedCountSpaceTable = async () => {
  const countSpaceGuests = await getAllUserCountSpacesGuests();
  if (!countSpaceGuests.success)
    return <div>Failing fetching your Count Spaces</div>;

  if (countSpaceGuests.result.length === 0)
    return <div>No Count Spaces as Guest</div>;

  const data = countSpaceGuests.result;
  console.log({ data });

  const tableHeader = [
    { key: "name", value: "Name" },
    { key: "ownerName", value: "Owner" },
    { key: "actions", value: "Actions" },
  ];

  const tableRows = data.map(({ countSpace: { name, ownerName, id } }) => ({
    name,
    ownerName,
    actions: (
      <div>
        <button>Leave</button>
      </div>
    ),
  }));
  return <TableHandler columnHeaders={tableHeader} rows={tableRows} />;
};

export default GuestedCountSpaceTable;
