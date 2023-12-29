import { userSanitizer } from "@/utils/user";

export default async function Layout({
  children,
  params: { user },
}: {
  children: React.ReactNode;
  params: { user: string };
}) {
  const { userName } = await userSanitizer();
  //TODO: redirect to home page (with a countdown)
  if (user !== userName) return <div>Go back home page</div>;
  return <>{children}</>;
}
