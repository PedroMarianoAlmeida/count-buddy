export interface QueryWrapperError {
  success: false;
  message: string;
}

interface QueryWrapperSuccess<T> {
  result: T;
  success: true;
}

export type QueryResponse<T> = QueryWrapperSuccess<T> | QueryWrapperError;
export const queryWrapper = async <T>(
  callback: () => Promise<T>
): Promise<QueryResponse<T>> => {
  try {
    const result = await callback();
    return { success: true, result };
  } catch (error: any) {
     console.log("queryWrapper function error", { error });
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    return { success: false, message };
  }
};
