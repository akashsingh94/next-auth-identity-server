"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("No JWT");
      console.log(status);
      signIn("BKMIdentityServer");
    } else if (status === "authenticated") {
      router.push("/");
    }
  }, [router, status]);

  return null;
}
