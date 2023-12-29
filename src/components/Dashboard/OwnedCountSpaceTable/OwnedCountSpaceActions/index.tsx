import { Button } from "@/components/ui/button";
import Link from "next/link";
import More from "./More";

const OwnedCountSpaceActions = ({
  countSpaceName,
  ownerName,
}: {
  countSpaceName: string;
  ownerName: string;
}) => {
  return (
    <div className="flex gap-2">
      <Link href={`/user/${ownerName}/owner/${countSpaceName}`}>
        <Button variant="outline">Visit</Button>
      </Link>
      <More />
    </div>
  );
};

export default OwnedCountSpaceActions;
