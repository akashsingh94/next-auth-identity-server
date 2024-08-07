"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export default function Dashboard() {
  const { data, status } = useSession();
  const router = useRouter();
  console.log(data);

  const handleLogout = useCallback(async () => {
    await signOut();
    if (data?.id_token)
      router.push(
        `${process.env.NEXT_PUBLIC_IDENTITY_URL}/connect/endsession?id_token_hint=${data.id_token}&post_logout_redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}`
      );
  }, [data?.id_token, router]);

  if (status === "loading") return <div>Loading...</div>;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      {!data && (
        <button onClick={() => signIn("BKMIdentityServer")}>LogIn</button>
      )}
      {data && (
        <div>
          <div>Hello, {data.user.name}</div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      <Link href="/about">About</Link>
    </div>
  );
}
