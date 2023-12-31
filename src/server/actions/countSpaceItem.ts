"use server";

import { queryWrapper } from "@/utils/errorHandler";
import { prisma } from "@/utils/prismaThingsUsedForServerActions";

export const addNewCountSpaceItem = async ({
  countSpaceCategoryId,
  name,
  amount,
  itemDate,
}: {
  countSpaceCategoryId: number;
  name: string;
  amount: number;
  itemDate: Date;
}) => {
  // TODO: Check if the user is the owner or guest of the countSpace

  return await queryWrapper(async () => {
    const newCountSpaceItem = await prisma.countSpaceItem.create({
      data: {
        name,
        amount,
        itemDate,
        countSpaceCategory: { connect: { id: countSpaceCategoryId } },
      },
    });
    return newCountSpaceItem;
  });
};

export const updateCountSpaceItem = async ({
  countSpaceItemId,
  name,
  amount,
  itemDate,
}: {
  countSpaceItemId: number;
  name: string;
  amount: number;
  itemDate: Date;
}) => {
  return await queryWrapper(async () => {
    const updatedCountSpaceItem = await prisma.countSpaceItem.update({
      where: { id: countSpaceItemId },
      data: { name, amount, itemDate },
    });
    return updatedCountSpaceItem;
  });
};
