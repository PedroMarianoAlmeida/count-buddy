import TableHandler from "@/components/TableHandler";

import { NewCountSpace } from "./NewCountSpace";
import OwnedCountSpaceActions from "./OwnedCountSpaceActions";
import { getAllUserCountSpaces } from "@/server/actions/countSpace";

const OwnedCountSpaceTable = async () => {
  const countSpace = await getAllUserCountSpaces();
  if (!countSpace.success) return <div>Failing fetching your Count Spaces</div>;

  const tableHeader = [
    { key: "name", value: "Name" },
    { key: "guests", value: "Guests" },
    { key: "actions", value: "Actions" },
  ];

  const tableRows = countSpace.result.map(
    ({ name, guests, ownerName, slug, id }) => ({
      name,
      // TODO: For each guest, add the option to remove them from the Count Space
      guests:
        guests.length === 0
          ? "-"
          : guests.map(({ userName }) => userName).join(", "),
      actions: (
        <OwnedCountSpaceActions
          ownerName={ownerName}
          countSpaceSlug={slug}
          countSpaceId={id}
        />
      ),
    })
  );

  return (
    <div>
      <div className="flex gap-3 items-center">
        <h2 className="my-0">My Count Spaces</h2>
        <NewCountSpace />
      </div>

      <TableHandler columnHeaders={tableHeader} rows={tableRows} />
    </div>
  );
};

export default OwnedCountSpaceTable;
