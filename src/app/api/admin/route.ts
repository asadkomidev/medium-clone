import { getRole } from "@/modules/auth/lib/get-user";
import { RoleAccess } from "@/modules/auth/types/type-role-access";
import { NextResponse } from "next/server";

export async function GET() {
  const role = await getRole();

  if (role === RoleAccess.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
