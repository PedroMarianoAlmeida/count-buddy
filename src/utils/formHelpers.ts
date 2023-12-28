export const isLoading = ({
  isIdle,
  isSuccess,
}: {
  isIdle: boolean;
  isSuccess: boolean;
}) => !isIdle && !isSuccess;
