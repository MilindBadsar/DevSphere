import { avatars } from "@/models/client/config";
import { users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import React from "react";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string; userSlug: string };
}) => {
  const user = await users.get<UserPrefs>(params.userId);

  return <div className="w-full">{children}</div>;
};

export default Layout;
