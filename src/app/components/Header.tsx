"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import { account } from "@/models/client/config";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function Header() {
  const { user, setUser, verifySession } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const hideHeader = ["/", "/login", "/signup"].includes(pathname);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      await verifySession();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (hideHeader) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <div className="relative bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            <Logo />
            <div className="flex items-center gap-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <div className="flex items-center gap-4">
                  <Link href="/login">
                    <ShimmerButton className="px-6 py-2 text-sm bg-white/10 hover:bg-white/20 text-white">
                      Log in
                    </ShimmerButton>
                  </Link>
                  <Link href="/signup">
                    <ShimmerButton className="px-6 py-2 text-sm bg-purple-500 hover:bg-purple-600 text-white">
                      Sign up
                    </ShimmerButton>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
