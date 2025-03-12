import { FC } from "react";

import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import Link from "next/link";
import { User } from "lucide-react";
import { logout_ACTION } from "@/actions/auth/logout";
import { LogoutButton } from "./logout-button";

interface UserNavigationProps {}

const UserNavigation: FC<UserNavigationProps> = async ({}) => {
  const session = await auth();
  if (!session)
    return (
      <Button asChild>
        <Link href="/login">
          <User className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>
    );

  return <LogoutButton />;
};

export default UserNavigation;
