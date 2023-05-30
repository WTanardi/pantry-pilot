"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/login" })}>
      <LogOut size={36}></LogOut>
    </button>
  );
}
