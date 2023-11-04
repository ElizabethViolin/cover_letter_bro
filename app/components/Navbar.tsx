import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/app/components/ui/navigation-menu"
import {Avatar} from "@nextui-org/react"
import {Button} from "./ui/button";
import Image from "next/image";

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <NavigationMenu className="flex">
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            <Image src="/icon.ico" alt="Favicon" width={30} height={30}/>
            </NavigationMenuLink>
          </Link>

          <Link href="/character-cover-letter" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <p className="font-extrabold">Character.CoverLetter</p>
            </NavigationMenuLink>
          </Link>

      </NavigationMenu>

      {loading ? null : !user ? (
        <ul className="flex">
          <Button onClick={handleSignIn} className="mx-5 cursor-pointer">
            Login
          </Button>
        </ul>
      ) : (
        <div className="flex">
          <Avatar isBordered color="primary" src={user.photoURL} />

          <Button className="mx-5" variant="secondary" onClick={handleSignOut}>
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
