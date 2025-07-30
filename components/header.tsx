"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Briefcase, FileText, FileSignature, Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      <Link
        href="/jobs"
        className="flex items-center space-x-2 text-sm font-medium text-white hover:text-[#008CA1]"
        onClick={onClick}
      >
        <Briefcase className="w-4 h-4" />
        <span>Jobs</span>
      </Link>
      <Link
        href="/resumebuilder"
        className="flex items-center space-x-2 text-sm font-medium text-white hover:text-[#008CA1]"
        onClick={onClick}
      >
        <FileText className="w-4 h-4" />
        <span>Resume Builder</span>
      </Link>
      <Link
        href="/coverletter"
        className="flex items-center space-x-2 text-sm font-medium text-white hover:text-[#008CA1]"
        onClick={onClick}
      >
        <FileSignature className="w-4 h-4" />
        <span>Cover Letters</span>
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Job Genie Logo"
            width={140}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 items-center">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Auth Buttons (Always visible) */}
        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button variant="blue">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transform transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 scale-100 max-h-96 py-4"
            : "opacity-0 scale-95 max-h-0 overflow-hidden py-0"
        } bg-[#0e100f] px-4 space-y-4`}
      >
        <NavLinks onClick={closeMenu} />
        <div className="pt-2">
          <SignedOut>
            <SignInButton>
              <Button variant="blue" className="w-full">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{elements:{avatarBox:"w-10 h-10", userButtonPopoverCard: "shadow-xl", userPreviewMainIdentifier: "font-semibold"}}}  afterSignOutUrl="/"/>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
