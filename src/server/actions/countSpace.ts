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
      include: {
        guests: true
      }
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

export const getOneCountSpace = async ({
  countSpaceName,
  ownerName,
}: {
  countSpaceName: string;
  ownerName: string;
}) => {
  return await queryWrapper(async () => {
    const countSpace = await prisma.countSpace.findUnique({
      where: {
        ownerName_name: {
          ownerName,
          name: countSpaceName,
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
