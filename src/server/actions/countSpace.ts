"use server";

import { queryWrapper } from "@/utils/errorHandler";
import { prisma } from "@/utils/prismaThingsUsedForServerActions";
import { userSanitizer } from "@/utils/user";
import { CycleUnit } from "@prisma/client";

export const getAllUserCountSpaces = async () => {
  const { userName } = await userSanitizer();
  if (userName === null) {
    throw new Error("userName is null");
  }

  return await queryWrapper(async () => {
    const countSpaces = await prisma.countSpace.findMany({
      where: { owner: { name: userName } },
      include: {
        guests: true,
      },
    });

    return countSpaces;
  });
};

export const createNewCountSpace = async ({
  name,
  slug,
  defaultCycle,
  defaultCycleUnit,
}: {
  name: string;
  slug: string;
  defaultCycle: number;
  defaultCycleUnit: CycleUnit;
}) => {
  const { userName } = await userSanitizer();
  if (userName === null) {
    throw new Error("userName is null");
  }

  return await queryWrapper(async () => {
    const newCountSpace = await prisma.countSpace.create({
      data: {
        name,
        slug,
        defaultCycle,
        defaultCycleUnit,
        owner: { connect: { name: userName } },
      },
    });

    return newCountSpace;
  });
};

export const getOneCountSpace = async ({
  countSpaceSlug,
  ownerName,
}: {
  countSpaceSlug: string;
  ownerName: string;
}) => {
  return await queryWrapper(async () => {
    const countSpace = await prisma.countSpace.findUnique({
      where: {
        ownerName_slug: {
          ownerName,
          slug: countSpaceSlug,
        },
      },
      include: {
        categories: {
          include: {
            items: {
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });
    if (!countSpace) throw new Error("CountSpace not found");
    return countSpace;
    // TODO: Check if the user logged is owner or guest of the countSpace
  });
};
