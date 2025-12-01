"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeTogglerButton from "../theme-toggler";
import { useAuthStore } from "@/lib/store/auth.store";

const Header = ({ hideAuthButtons }: { hideAuthButtons: boolean }) => {
  const { isAuthenticated } = useAuthStore();
  const showAuthButtons = !isAuthenticated && !hideAuthButtons;

  return (
    <header className="px-4 py-2 flex justify-between shadow-sm bg-zinc-50 dark:bg-gray-900">
      <Link
        href="/"
        className="font-light text-black dark:text-gray-200 text-2xl first-letter:font-normal tracking-tight"
      >
        Task Master
      </Link>

      <div className="flex justify-between items-center gap-2">
        {showAuthButtons && (
          <Link href="/login">
            <Button className="rounded-full cursor-pointer">Log in</Button>
          </Link>
        )}
        {showAuthButtons && (
          <Link href="/signup">
            <Button className="rounded-full hidden sm:block cursor-pointer">
              Sign up for free
            </Button>
          </Link>
        )}

        <ThemeTogglerButton />
      </div>
    </header>
  );
};

export default Header;
