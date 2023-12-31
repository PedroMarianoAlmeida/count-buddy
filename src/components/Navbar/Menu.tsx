"use client";

import { signIn, signOut } from "next-auth/react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserSanitizer } from "@/utils/user";

const Menu = ({
  userName,
  isValid,
  email,
}: Pick<UserSanitizer, "userName" | "isValid" | "email">) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <FontAwesomeIcon icon={faBars} size="2x" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {userName && (
          <DropdownMenuItem>
            <Link href={`/user/${userName}`}>
              <Button variant="link" className="w-full">
                Dashboard
              </Button>
            </Link>
          </DropdownMenuItem>
        )}
        {email ? (
          <DropdownMenuItem>
            <Button variant="link" className="w-full" onClick={() => signOut()}>
              Logout
            </Button>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Button variant="link" className="w-full" onClick={() => signIn()}>
              Login
            </Button>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
