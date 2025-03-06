"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="top-0 left-0 sticky w-full flex flex-row justify-between items-center py-6 px-6 shadow-sm z-10 backdrop-blur-sm bg-white/80 md:px-10">
      <Link href="/">
        <h1 className="font-bold text-2xl md:text-3xl">Storyboard</h1>
      </Link>
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <div
        className={`absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 p-6 transition-all duration-300 ease-in-out md:static md:w-auto md:flex-row md:shadow-none md:p-0 ${
          isOpen ? "block" : "hidden md:flex"
        }`}
      >
        {user ? (
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <p className="flex gap-2 items-center text-sm md:text-base">
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
              size="sm"
              className="cursor-pointer w-full md:w-auto"
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Link href="/login" className="w-full md:w-auto">
            <Button size="sm" className="w-full md:w-auto">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
