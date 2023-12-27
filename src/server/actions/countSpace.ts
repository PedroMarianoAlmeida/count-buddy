"use server";

import { queryWrapper } from "@/utils/errorHandler";
import { prisma } from "@/utils/prismaThingsUsedForServerActions.ts";
import { userSanitizer } from "@/utils/user";

export const getAllUserCountSpaces = async () => {
  const { userName } = await userSanitizer();
  if (userName === null) {
    throw new Error("userName is null");
  }

  return await queryWrapper(async () => {
    const countSpaces = await prisma.countSpace.findMany({
      where: { owner: { name: userName } },
      include: { items: true },
    });

    return countSpaces;
  });
};

export const createNewCountSpace = async (name: string) => {
  const { userName } = await userSanitizer();
  if (userName === null) {
    throw new Error("userName is null");
  }

  return await queryWrapper(async () => {
    const newCountSpace = await prisma.countSpace.create({
      data: {
        name,
        owner: { connect: { name: userName } },
      },
    });

    return newCountSpace;
  });
};

export const addUserAsGuestInExistingCountSpace = async ({
  guestName,
  countSpaceId,
}: {
  guestName: string;
  countSpaceId: number;
}) => {
  // TODO: Validate if the user logged is really the owner of the countSpace
  // TODO: Validate if the guest want to be added in the countSpace (before adding it)

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

export const addNewCountSpaceItem = async ({
  countSpaceId,
  name,
  budget,
  unit,
}: {
  countSpaceId: number;
  name: string;
  budget?: number;
  unit?: string;
}) => {
  // TODO: Validate if the user logged is a owner or a guest of the countSpace

  return await queryWrapper(async () => {
    const newCountSpaceItem = await prisma.countSpaceItem.create({
      data: {
        countSpace: { connect: { id: countSpaceId } },
        name,
        budget,
        unit,
      },
    });
    console.log({ newCountSpaceItem });
    return newCountSpaceItem;
  });
};
