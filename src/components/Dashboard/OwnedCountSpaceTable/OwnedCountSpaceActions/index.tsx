import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateInvitation } from "./CreateInvitation";

const OwnedCountSpaceActions = ({
  ownerName,
  countSpaceSlug,
  countSpaceId,
}: {
  ownerName: string;
  countSpaceSlug: string;
  countSpaceId: number;
}) => {
  return (
    <div className="flex gap-2">
      <Link href={`/user/${ownerName}/owner/${countSpaceSlug}`}>
        <Button variant="outline">Visit</Button>
      </Link>
      <CreateInvitation countSpaceId={countSpaceId} />
      Edit | Delete
    </div>
  );
};

export default OwnedCountSpaceActions;
