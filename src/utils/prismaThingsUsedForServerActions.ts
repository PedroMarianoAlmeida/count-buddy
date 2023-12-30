import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

import { queryWrapper, QueryResponse } from "@/utils/errorHandler";

export const transactionWrapper = async <T>(
  callback: () => Promise<T>
): Promise<QueryResponse<T>> => {
  return queryWrapper(async () => {
    const result = await prisma.$transaction(async () => {
      return callback();
    });
    return result;
  });
};
