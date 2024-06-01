'use client'

import { Logo } from "@/components/icons";
import { Button } from "@nextui-org/react";
import { FaBoxOpen } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";

export const Navbar = () => {
    return (
        <header className="w-full h-[60px] bg-gray flex justify-between items-center px-12">
            <div className="flex items-center gap-1">
                <Logo />
                <h1 className="text-white font-mono text-lg">
                    KG - LOGISTIK
                </h1>
            </div>
            <div className="flex items-center gap-4">
                <Button radius="full" variant="bordered" startContent={<MdLocalPhone className="text-white text-lg" />}>
                    <p className="text-white">Контакты</p>
                </Button>
                <Button radius="full" variant="bordered" startContent={<FaBoxOpen className="text-white text-lg" />}>
                    <p className="text-white">Добавить груз</p>
                </Button>
            </div>
        </header>
    );
};