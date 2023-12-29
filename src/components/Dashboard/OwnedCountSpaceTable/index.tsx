import TableHandler from "@/components/TableHandler";
import { Button } from "@/components/ui/button";

import { CountSpace, UserCountSpaceGuest } from "@prisma/client";

interface ExtendedCountSpace extends CountSpace {
  guests: UserCountSpaceGuest[];
}
interface OwnedCountSpaceTableProps {
  countSpace: ExtendedCountSpace[];
}
const OwnedCountSpaceTable = ({ countSpace }: OwnedCountSpaceTableProps) => {
  const tableHeader = [
    { key: "name", value: "Name" },
    { key: "guests", value: "Guests" },
    { key: "actions", value: "Actions" },
  ];

  const tableRows = countSpace.map(({ name, guests }) => ({
    name,
    // TODO: For each guest, add the option to remove them from the Count Space
    guests: guests.length === 0 ? "-" : guests.map(({ userName }) => userName).join(", "),
    actions: "Add guest | Edit | Delete", // TODO: Add actions
  }));

  return (
    <div>
      <div className="flex gap-3 items-center">
        <h2 className="my-0">My Count Spaces</h2>
        <Button>New Count Space</Button>
      </div>

      <TableHandler columnHeaders={tableHeader} rows={tableRows} />
    </div>
  );
};

export default OwnedCountSpaceTable;
