"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="top-0 left-0 sticky w-full flex flex-row justify-between items-center py-8 px-10 shadow-sm z-10 backdrop-blur-sm">
      <Link href="/">
        <h1 className="font-bold text-3xl">Storyboard</h1>
      </Link>
      {!user ? (
        ""
      ) : (
        <div className="flex flex-row mr-12 gap-4 items-center">
          <p className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {user.user_metadata.displayName.trim().slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            {user.user_metadata.displayName}
          </p>
          <Button
            onClick={signOut}
            variant="destructive"
            size={"sm"}
            className="cursor-pointer"
          >
            Sign Out
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
