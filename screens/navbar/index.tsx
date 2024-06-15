"use client";

import { useState } from "react";
import { Logo } from "@/components/icons";
import { Button } from "@nextui-org/react";
import { FaBoxOpen } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { useWindowWidth } from "@/utils/helpers/clientFunctions";
import dynamic from "next/dynamic";
import Truck from '@/public/animations/Truck.json'
import Link from "next/link";

import { useDisclosure } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";

import { Login } from "@/components/Modals/Login";

export const Header = () => {
  const width = useWindowWidth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const DynamicLottieComponent = dynamic(() => import("lottie-react"), {
    ssr: false,
  });

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
            <DynamicLottieComponent
              animationData={Truck}
              loop={true}
              className="w-24 h-24 mb-2"
            />
            <h1 className="text-white font-mono text-lg ml-[-10px] xs:ml-[-15px]">LOGISTIK-KG</h1>
          </div>
        </Link>
        <div className="flex items-center gap-5 md:hidden ">
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
            onPress={onOpen}
            className="font-mono"
            radius="full"
            variant="bordered"
            startContent={<FaBoxOpen className="text-white text-lg" />}
          >
            <p className="text-white">Добавить груз</p>
          </Button>
        </div>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="hidden md:block text-white"
        />
        <NavbarMenu className="backdrop-saturate-200 backdrop-blur-sm bg-opacity-80 bg-grayRoot/70 max-h-[30vh] mt-[-5px] z-[999]">
          <Button
            onPress={() => {
              setIsMenuOpen(false);
              onOpen();
            }}
            className="font-mono border-[white]"
            radius="full"
            variant="bordered"
            startContent={<FaBoxOpen className="text-white text-lg" />}
          >
            <p className="text-white">Добавить груз</p>
          </Button>
          <Link className="w-full" href="/contacts">
            <Button
              className="font-mono border-white"
              radius="full"
              fullWidth={true}
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
