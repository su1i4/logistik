'use client'

import { Logo } from "@/components/icons";
import { Button } from "@nextui-org/react";
import { FaBoxOpen } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import Link from "next/link";

import { useDisclosure } from "@nextui-org/react"

import { Login } from "@/components/Modals/Login";

export const Navbar = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Login isOpen={isOpen} onOpenChange={onOpenChange} />
            <header className="w-full h-[60px] bg-grayRoot flex justify-between items-center px-12">
                <Link href='/'>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <Logo />
                        <h1 className="text-white font-mono text-lg">
                            KG - LOGISTIK
                        </h1>
                    </div>
                </Link>
                <div className="flex items-center gap-5">
                    <Link href='/contacts'>
                        <Button
                        className="font-mono"
                        radius="full" variant="bordered" startContent={<MdLocalPhone className="text-white text-lg" />}>
                            <p className="text-white">Контакты</p>
                        </Button>
                    </Link>
                    <Button
                        onPress={onOpen}
                        className="font-mono"
                        radius="full" variant="bordered" startContent={<FaBoxOpen className="text-white text-lg" />}>
                        <p className="text-white">Добавить груз</p>
                    </Button>
                </div>
            </header>
        </>
    );
};