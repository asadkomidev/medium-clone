"use client";

import { useRole } from "@/hooks/use-role";
import { RoleAccess } from "../types/type-role-access";

type Props = {
  children: React.ReactNode;
  allowedRole: RoleAccess;
};

export const AccessRole = ({ children, allowedRole }: Props) => {
  const role = useRole();

  if (role !== allowedRole) {
    return (
      // <FormError message="You do not have permission to view this content!" />
      // TODO: Add FormError component
      <p className="">You do not have permission to view this content!</p>
    );
  }

  return <>{children}</>;
};
