import { AccountPage } from "@/modules/account/pages/account-page";
import { getUser } from "@/modules/auth/lib/get-user";

export default async function Page() {
  const user = await getUser();

  return <AccountPage user={user} />;
}
