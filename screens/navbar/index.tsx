"use client";

import { useState } from "react";
import { Button } from "@nextui-org/react";
import { FaBoxOpen } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import Link from "next/link";
import DynamicLottieComponent from "@/components/car-animation/index";
import { useDisclosure } from "@nextui-org/react";
import { Navbar, NavbarMenuToggle, NavbarMenu } from "@nextui-org/react";

import { Login } from "@/components/Modals/Login";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const router = useRouter();
  const token = Cookies.get("user_token");
  const pathName = usePathname();

  const handleLogout = () => {
    Cookies.remove("user_token");
    router.push("/");
  };

  const getButtonContent = () => {
    if (token !== "AUTHORIZED") {
      return <p className="text-white">Добавить груз</p>;
    }

    if (token === "AUTHORIZED" && pathName === "/admin") {
      return <p className="text-white">Выйти</p>;
    }

    return <p className="text-white">К админу</p>;
  };

  const handleButtonClick = () => {
    if (token !== "AUTHORIZED") {
      onOpen();
    } else if (token === "AUTHORIZED" && pathName === "/admin") {
      handleLogout();
    } else {
      router.push("/admin");
    }
  };

  return (
    <>
      <Login isOpen={isOpen} onOpenChange={onOpenChange} />
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="max-w-[1540px] sticky top-0 w-full h-[60px] bg-grayRoot flex justify-between items-center px-8 md:px-6 xs:px-0 z-[99999]"
      >
        <Link href="/">
          <div className="flex items-center gap-1 cursor-pointer xs:ml-[-25px]">
            <DynamicLottieComponent />
            <h1 className="text-white font-mono text-lg ml-[-10px] xs:ml-[-15px]">
              LOGISTIK-KG
            </h1>
          </div>
        </Link>
        <div className="flex items-center gap-5 md:hidden">
          <Link href="/contacts">
            <Button
              className="font-mono"
              radius="full"
              variant="bordered"
              startContent={<MdLocalPhone className="text-white text-lg" />}
            >
              <p className="text-white">Контакты</p>
            </Button>
          </Link>
          <Button
            onPress={handleButtonClick}
            className="font-mono"
            radius="full"
            variant="bordered"
            startContent={
              token !== "AUTHORIZED" ? (
                <FaBoxOpen className="text-white text-lg" />
              ) : null
            }
          >
            {getButtonContent()}
          </Button>
        </div>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="hidden md:block text-white"
        />
        <NavbarMenu
          className={`backdrop-saturate-200 backdrop-blur-sm bg-opacity-80 bg-grayRoot/70 max-h-[30vh] mt-[-5px] ${
            isOpen ? "z-10" : "z-[99999]"
          }`}
        >
          <Button
            onPress={handleButtonClick}
            className="font-mono"
            radius="full"
            variant="bordered"
            startContent={
              token !== "AUTHORIZED" ? (
                <FaBoxOpen className="text-white text-lg" />
              ) : null
            }
          >
            {getButtonContent() || "hello"}
          </Button>
          <Link className="w-full" href="/contacts">
            <Button
              className="font-mono border-white"
              radius="full"
              fullWidth
              variant="bordered"
              startContent={<MdLocalPhone className="text-white text-lg" />}
            >
              <p className="text-white">Контакты</p>
            </Button>
          </Link>
        </NavbarMenu>
      </Navbar>
    </>
  );
};
