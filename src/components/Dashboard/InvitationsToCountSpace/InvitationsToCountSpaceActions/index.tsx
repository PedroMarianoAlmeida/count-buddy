import AcceptInvitation from "./AcceptInvitation";

const OwnedCountSpaceActions = ({ invitationId }: { invitationId: number }) => {
  return (
    <div className="flex gap-2">
      <AcceptInvitation invitationId={invitationId} /> | Decline
    </div>
  );
};

export default OwnedCountSpaceActions;
