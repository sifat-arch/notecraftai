import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 border-b border-gray-300">
      <h2>NoteCraftAI</h2>

      <div className="flex gap-2">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/dashboard/">Dashboard</Link>
      </div>

      <div>
        <header className="flex justify-end items-center p-4 gap-4 h-16">
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton>
              <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;
