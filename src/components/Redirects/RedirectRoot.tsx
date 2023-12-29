"use client";

import { UserSanitizer } from "@/utils/user";
import { redirect, usePathname } from "next/navigation";
import { ReactNode } from "react";

interface RedirectRootProps {
  children: ReactNode;
  userSanitized: UserSanitizer;
}

const RedirectRoot = ({ children, userSanitized }: RedirectRootProps) => {
  const pathname = usePathname();
  const { email, userName } = userSanitized;

  const loggedUser = Boolean(email);
  const registerUser = Boolean(userName);

  if (pathname !== "/register-user" && loggedUser && !registerUser) {
    redirect("/register-user");
  }

  if (pathname === "/register-user") {
    if (registerUser) redirect(`user/${userName}`);
    if (!loggedUser) redirect("/");
  }

  return <>{children}</>;
};

export default RedirectRoot;
