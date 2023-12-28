import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
import QueryProvider from "./QueryProvider";

export const RootProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <QueryProvider>{children}</QueryProvider>
  </AuthProvider>
);

export default RootProviders;
