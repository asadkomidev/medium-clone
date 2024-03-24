import { ExtendedUser } from "../../../../next-auth";
import { AccountItem } from "./account-item";

type Props = {
  user?: ExtendedUser;
};

export const Account = ({ user }: Props) => {
  return (
    <div className="w-full">
      <div className="space-y-4">
        <AccountItem label="ID" value={user?.id} />
        <AccountItem label="Name" value={user?.name} />
        <AccountItem label="Email" value={user?.email} />
        <AccountItem label="Role" value={user?.role} />
        <AccountItem
          label="Two Factor Authentication"
          value={user?.isTwoFactorEnabled ? "ON" : "OFF"}
        />
      </div>
    </div>
  );
};
