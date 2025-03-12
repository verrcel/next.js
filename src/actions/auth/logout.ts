"use server";

import { signOut } from "@/auth";

export const logout_ACTION = async () => {
  await signOut({
    redirectTo: "/",  });
};