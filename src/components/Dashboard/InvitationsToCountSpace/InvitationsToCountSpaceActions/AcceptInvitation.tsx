"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { acceptInvitation } from "@/server/actions/userInvitedToCountSpace";
import { useMutation } from "@tanstack/react-query";
import { isLoading } from "@/utils/formHelpers";

const AcceptInvitation = ({ invitationId }: { invitationId: number }) => {
  const router = useRouter();

  const { mutateAsync, isIdle, isSuccess } = useMutation({
    mutationFn: acceptInvitation,
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Button
      variant="outline"
      onClick={() => mutateAsync({ invitationId })}
      disabled={isLoading({ isIdle, isSuccess })}
    >
      Accept
    </Button>
  );
};

export default AcceptInvitation;
