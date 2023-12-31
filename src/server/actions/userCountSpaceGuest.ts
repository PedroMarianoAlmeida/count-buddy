'use server'

import { queryWrapper } from "@/utils/errorHandler";
import { prisma } from "@/utils/prismaThingsUsedForServerActions";

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