import React from "react";

const Layout = async ({
  children,
}: {
  children: React.ReactNode;
  params: { userId: string; userSlug: string };
}) => {
  // const user = await users.get<UserPrefs>(params.userId);

  return <div className="w-full">{children}</div>;
};

export default Layout;
