import React, { Suspense } from "react";

import { AccountPageLayout } from "@/modules/shared/layouts/account-page-layout";
import Settings from "../components/settings";
import { SettingsSkeleton } from "../components/settings-skeleton";

export const SettingsPage = () => {
  return (
    <AccountPageLayout
      title="Settings"
      description="This is how others will see you on the site.">
      <Suspense fallback={<SettingsSkeleton />}>
        <Settings />
      </Suspense>
    </AccountPageLayout>
  );
};
