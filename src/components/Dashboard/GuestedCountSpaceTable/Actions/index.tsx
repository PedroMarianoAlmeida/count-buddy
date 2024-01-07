import { Button } from "@/components/ui/button";
import { userSanitizer } from "@/utils/user";
import Link from "next/link";

const GuestCountSpaceActions = async ({
  ownerName,
  countSpaceSlug,
}: {
  ownerName: string;
  countSpaceSlug: string;
}) => {
  const { userName } = await userSanitizer();

  return (
    <div className="flex gap-2">
      <Link
        href={`/user/${userName}/guest/${countSpaceSlug}/from/${ownerName}`}
      >
        <Button variant="outline">Visit</Button>
      </Link>
      Leave
    </div>
  );
};

export default GuestCountSpaceActions;
