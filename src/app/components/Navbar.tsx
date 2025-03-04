"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed w-full flex flex-row justify-between items-center py-8 px-10 backdrop-blur-sm shadow-sm z-10">
      <Link href="/">
        <h1 className="font-bold text-3xl">Storyboard</h1>
      </Link>
      {!user ? (
        <div className="flex flex-row mr-12">
          <Link href="/login" className="mr-4">
            Login
          </Link>
        </div>
      ) : (
        <div className="flex flex-row mr-12 gap-8 items-center">
          <p>Welcome back, {user.user_metadata.displayName}</p>
          <Button
            onClick={signOut}
            variant="destructive"
            size={"lg"}
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
