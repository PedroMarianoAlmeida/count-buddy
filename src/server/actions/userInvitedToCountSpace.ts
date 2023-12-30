"use server";
import {
  prisma,
  transactionWrapper,
} from "@/utils/prismaThingsUsedForServerActions";

export const addUserInvitationToCountSpace = async ({
  guestName,
  countSpaceId,
}: {
  guestName: string;
  countSpaceId: number;
}) => {
  // TODO: Validate if the user logged is really the owner of the countSpace

  return await transactionWrapper(async () => {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { name: guestName },
    });

    if (user === null) {
      throw new Error("User not found");
    }
    const newGuest = await prisma.userInvitedToCountSpace.create({
      data: {
        countSpace: { connect: { id: countSpaceId } },
        user: { connect: { name: guestName } },
      },
    });
    return newGuest;
  });
};
