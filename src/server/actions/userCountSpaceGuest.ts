"use server";

import { queryWrapper } from "@/utils/errorHandler";
import { prisma } from "@/utils/prismaThingsUsedForServerActions";
import { userSanitizer } from "@/utils/user";

export const addUserAsGuestInExistingCountSpace = async ({
  guestName,
  countSpaceId,
}: {
  guestName: string;
  countSpaceId: number;
}) => {
  return await queryWrapper(async () => {
    const newGuest = await prisma.userCountSpaceGuest.create({
      data: {
        countSpace: { connect: { id: countSpaceId } },
        user: { connect: { name: guestName } },
      },
    });

    return newGuest;
  });
};

export const getAllUserCountSpacesGuests = async () => {
  const { userName } = await userSanitizer();
  if (!userName) throw new Error("No user name found");

  return await queryWrapper(async () => {
    const allGuests = await prisma.userCountSpaceGuest.findMany({
      where: { userName },
      include: {
        countSpace: true,
      },
    });
    if (!allGuests) throw new Error("No guests found");
    
    return allGuests;
  });
};
