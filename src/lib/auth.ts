"use server";

import { headers } from "next/headers";
import { auth } from "./authConfig";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}
