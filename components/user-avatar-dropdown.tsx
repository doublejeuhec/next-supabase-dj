"use client";

import { signOutAction } from "@/app/actions";
import { User } from "@/types/database";
import { LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface UserAvatarDropdownProps {
  user: User;
}

export default function UserAvatarDropdown({ user }: UserAvatarDropdownProps) {
  // Get initials from the user's first and last name
  const initials =
    `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="dark:border dark:border-brand-red">
          <AvatarImage
            src={user.avatar_url || ""}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <AvatarFallback className="bg-muted-foreground text-primary-foreground dark:bg-brand-red dark:text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href="/protected/profile"
            className="cursor-pointer flex items-center gap-2"
          >
            <UserIcon className="h-4 w-4" />
            <span>Mon profil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action={signOutAction}>
          <DropdownMenuItem asChild>
            <button
              type="submit"
              className="cursor-pointer w-full flex items-center gap-2 text-destructive"
            >
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
