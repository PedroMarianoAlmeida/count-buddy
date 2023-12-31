"use server";
import {
  prisma,
  transactionWrapper,
} from "@/utils/prismaThingsUsedForServerActions";
import { queryWrapper } from "@/utils/errorHandler";

import { userSanitizer } from "@/utils/user";

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

export const getAllInvitationsForUser = async () => {
  const { userName } = await userSanitizer();
  if (userName === null) {
    throw new Error("userName is null");
  }

  return await queryWrapper(async () => {
    const invitations = await prisma.userInvitedToCountSpace.findMany({
      where: { user: { name: userName } },
      include: {
        countSpace: true,
      },
    });

    return invitations;
  });
};
