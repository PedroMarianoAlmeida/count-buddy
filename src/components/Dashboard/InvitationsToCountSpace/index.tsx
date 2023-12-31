import TableHandler from "@/components/TableHandler";
import { getAllInvitationsForUser } from "@/server/actions/userInvitedToCountSpace";

const InvitationsToCountSpace = async () => {
  const invitations = await getAllInvitationsForUser();
  if (!invitations.success) return <div>Failed to fetch invitations</div>;
  if (invitations.result.length === 0) return <div>No invitations</div>;

  const tableHeader = [
    { key: "name", value: "Name" },
    { key: "owner", value: "Owner" },
    { key: "actions", value: "Actions" },
  ];

  const tableRows = invitations.result.map(
    ({ countSpace: { name, ownerName, id } }) => ({
      name,
      owner: ownerName,
      actions: "Accept / Decline",
    })
  );
  return (
    <div>
      <h2>Pending invitations</h2>
      <TableHandler columnHeaders={tableHeader} rows={tableRows} />
    </div>
  );
};

export default InvitationsToCountSpace;
