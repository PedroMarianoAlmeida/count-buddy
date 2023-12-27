"use server";

import { queryWrapper } from "@/utils/errorHandler";
import { prisma } from "@/utils/prismaThingsUsedForServerActions.ts";
import { userSanitizer } from "@/utils/user";

import { User } from "@prisma/client";

export const getUserNameByEmail = async (email: string) => {
  return await queryWrapper<User>(async () => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user === null) throw new Error("User not found");
    return user;
  });
};

export interface OnlyUsername {
  username: string;
}

export const checkUserNameExists = async ({ username }: OnlyUsername) => {
  return await queryWrapper<{ exist: boolean }>(async () => {
    const user = await prisma.user.findUnique({
      where: {
        name: username,
      },
    });
    return { exist: user !== null };
  });
};

// export const postNewUserNameHardCoded = async ({
//   username,
//   email,
// }: {
//   username: string;
//   email: string;
// }) => {
//   return await queryWrapper(async () => {
//     const user = await prisma.user.create({
//       data: {
//         name: username,
//         email,
//       },
//     });
//     if (user === null) throw new Error("Error inserting new username");
//     return null;
//   });
// };

export const postNewUserName = async ({ username }: OnlyUsername) => {
  const { email } = await userSanitizer();
  return await queryWrapper(async () => {
    if (!email) throw new Error("Please login to register a new username");
    const user = await prisma.user.create({
      data: {
        name: username,
        email,
      },
    });
    if (user === null) throw new Error("Error inserting new username");
    return null;
  });
};

export const deleteUserById = async (id: number) => {
  return await queryWrapper(async () => {
    await prisma.user.delete({
      where: {
        id,
      },
    });
    return null;
  });
};

export const userNameHandler = async (currentPath: string) => {
  const { isValid, email } = await userSanitizer();

  // Have an user is essential to all logged pages (because I don't want to use email as a key)
  // So if the user is logged, so it is need had an user name (or the user can logout and user as anonymous)
  if (!isValid && email !== null && currentPath !== "register-user") {
    return { shouldRedirect: true, destination: "/register-user" };
  }

  return { shouldRedirect: false, destination: "" };
};
