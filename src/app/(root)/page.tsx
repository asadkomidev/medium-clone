import { getUser } from "@/modules/auth/lib/get-user";
import HomePage from "@/modules/home/pages/home-page";
import MainPage from "@/modules/home/pages/main-page";

export default async function Home() {
  const user = await getUser();

  return <>{!user ? <MainPage /> : <HomePage />}</>;
}
