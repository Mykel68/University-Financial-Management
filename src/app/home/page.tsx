import { SignoutButton } from "@/components/auth/signout-buttons";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getSession();

  if (!session) redirect("/login");
  return (
    <div>
      Home Page
      <SignoutButton />
    </div>
  );
};

export default page;
