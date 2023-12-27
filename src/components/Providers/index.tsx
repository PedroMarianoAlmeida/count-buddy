import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";

export const RootProviders = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default RootProviders;
