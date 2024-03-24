import { Separator } from "@/components/ui/separator";
import { Sidebar } from "./sidebar";
import SidebarMobile from "./sidebar-mobile";

type Props = {
  children: React.ReactNode;
};

const AccountSidebarLayout = ({ children }: Props) => {
  return (
    <div className="space-y-6 pt-12  pb-16">
      <div className="hidden lg:flex space-y-0.5">
        <div className="flex-flex-col">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-muted-foreground">
            Manage your account and settings.
          </p>
        </div>
      </div>
      <div className="flex lg:hidden">
        <SidebarMobile />
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <Sidebar />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
};

export default AccountSidebarLayout;
