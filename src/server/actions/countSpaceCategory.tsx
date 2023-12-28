"use server";

import { queryWrapper } from "@/utils/errorHandler";
import { prisma } from "@/utils/prismaThingsUsedForServerActions.ts";

export const addNewCountSpaceCategory = async ({
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
    const newCountSpaceItem = await prisma.countSpaceCategory.create({
      data: {
        countSpace: { connect: { id: countSpaceId } },
        name,
        budget,
        unit,
      },
    });
    return newCountSpaceItem;
  });
};

export const updateCountSpaceCategory = async ({
  countSpaceCategoryId,
  name,
  budget,
  unit,
}: {
  countSpaceCategoryId: number;
  name: string;
  budget?: number;
  unit?: string;
}) => {
  return await queryWrapper(async () => {
    const updatedCountSpaceItem = await prisma.countSpaceCategory.update({
      where: { id: countSpaceCategoryId },
      data: {
        name,
        budget,
        unit,
      },
    });
    return updatedCountSpaceItem;
  });
};
