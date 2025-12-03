"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/utils";

const useAuthGuard = ({
  protectedRoutes = ["/dashboard"],
  authPages = ["/login", "/signup", "/verify-otp"],
  tempAuthPages = ["/signup", "/verify-otp"], // pages allowed for temp token
} = {}) => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken("token"); // permanent token
    const tmptoken = getToken("tmptoken"); // temporary token
    const path = window.location.pathname;

    if (token) {
      if (authPages.includes(path)) {
        router.replace("/dashboard");
      }
      return;
    }

    if (tmptoken) {
      const blockedForTemp = !tempAuthPages.includes(path);
      if (blockedForTemp) {
        router.replace("/verify-otp"); // redirect to verify otp if trying dashboard
      }
      return;
    }

    const isProtected = protectedRoutes.some((route) => path.startsWith(route));
    if (isProtected) {
      router.replace("/login");
    }
  }, [router, protectedRoutes, authPages, tempAuthPages]);
};

export default useAuthGuard;
