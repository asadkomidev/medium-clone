"use client";

import { Suspense } from "react";

import { AccountPageLayout } from "@/modules/shared/layouts/account-page-layout";
import { ExtendedUser } from "../../../../next-auth";
import { AccountSkeleton } from "../components/account-skeleton";
import { Account } from "../components/account";

type Props = {
  user?: ExtendedUser;
};

export const AccountPage = ({ user }: Props) => {
  return (
    <AccountPageLayout
      title="Account"
      description="This is how others will see you on the site.">
      <Suspense fallback={<AccountSkeleton />}>
        <Account user={user} />
      </Suspense>
    </AccountPageLayout>
  );
};
