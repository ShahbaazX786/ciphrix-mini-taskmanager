"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/utils";

const useAuthGuard = ({
  protectedRoutes = ["/dashboard", "/verify-otp"],
  authPages = ["/login", "/signup", "/verify-otp"],
} = {}) => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const path = window.location.pathname;

    if (token) {
      if (authPages.includes(path)) {
        router.replace("/dashboard");
      }
    } else {
      const isProtected = protectedRoutes.some((route) =>
        path.startsWith(route)
      );
      if (isProtected) {
        router.replace("/login");
      }
    }
  }, [router, protectedRoutes, authPages]);
};

export default useAuthGuard;
