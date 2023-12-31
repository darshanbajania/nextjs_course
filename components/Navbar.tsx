import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

const Navbar = async () => {
  // const session = await getCurrentUser();
  const session = null;
  console.log("🚀 ~ file: Navbar.tsx:9 ~ Navbar ~ session:", session);
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={115} height={43} alt="" />
          <ul className="xl:flex hidden text-small gap-7">
            {NavLinks.map((link) => (
              <Link href={link.href} key={link.key}>
                {link.text}
              </Link>
            ))}
          </ul>
        </Link>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {session?.user?.image && (
              <Image
                src={session?.user?.image}
                height={40}
                width={40}
                className="rounded-full"
                alt={session?.user?.name}
              />
            )}
            <Link href={"/create-project"}>Share Your Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
