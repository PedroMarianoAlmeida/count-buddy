'use server'

import { queryWrapper } from "@/utils/errorHandler";
import { prisma } from "@/utils/prismaThingsUsedForServerActions.ts";

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