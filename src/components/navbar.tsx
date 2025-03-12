import { routes } from "@/lib/constants";
import { cn, getFullPath } from "@/lib/utils";
import { NavigationMenuItemType } from "@/types";
import Link from "next/link";
import { FC } from "react";
import UserNavigation from "./auth/user-navigation";

interface NavbarProps {}

const NavbarItem: React.FC<NavigationMenuItemType> = ({
  icon,
  title,
  href,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
      )}
    >
      {icon && icon}
      {title}
    </Link>
  );
};

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <nav className="flex h-14 w-full items-center border py-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href={getFullPath("")} className="flex items-center space-x-2">
          <div className=" font-bold">Next-Starter-Kit</div>
        </Link>

        {/* NAVBAR ITEMS */}
        <div className="flex items-center space-x-4">
          {routes?.map((item, index) => (
            <NavbarItem key={index} {...item} />
          ))}

          <UserNavigation />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
