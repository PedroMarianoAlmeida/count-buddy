"use server";

import { queryWrapper } from "@/utils/errorHandler";
import { prisma } from "@/utils/prismaThingsUsedForServerActions.ts";

export const addNewCountSpaceItem = async ({
  countSpaceCategoryId,
  name,
  amount,
}: {
  countSpaceCategoryId: number;
  name: string;
  amount: number;
}) => {
  // TODO: Check if the user is the owner or guest of the countSpace

  return await queryWrapper(async () => {
    const newCountSpaceItem = await prisma.countSpaceItem.create({
      data: {
        name,
        amount,
        countSpaceCategory: { connect: { id: countSpaceCategoryId } },
      },
    });
    return newCountSpaceItem;
  });
};
