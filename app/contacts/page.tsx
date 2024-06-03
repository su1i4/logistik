'use client'

import { YMaps, Map as YandexMap, Placemark } from "@pbe/react-yandex-maps";
import { Button } from "@nextui-org/react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";


export default function Contacts() {
    return (
        <section className="w-full h-[90vh] flex items-center justify-between p-4 gap-4 bg-gray-100 lg:flex-col lg:items-start lg:justify-start lg:gap-0 lg:h-fit">
            <div className="w-full pr-10 h-[70vh] grid grid-rows-6 font-mono lg-[30vh] lg:pr-0">
                <p className="text-3xl font-[700]">Как нас найти</p>
                <p className="text-xl font-[400] mt-">Офис работает с 9 утра до 6 вечера. <br /> Выходные - суббота, воскресенье</p>
                <p className="w-full border-t-[1px] border-solid border-gray-400"><span className="font-[700]">Адрес: </span> г Бишкек, ул Гражданская 53, 2 этаж, офис 4</p>
                <p className="w-full border-t-[1px] border-solid border-gray-400"><span className="font-[700]">Телефон:</span> +996 (312) 364-000</p>
                <div className="flex flex-col w-full border-t-[1px] border-solid border-gray-400 pt-4 gap-4 lg:flex-row">
                    <a href="tel:">
                        <Button
                            className="border-[2px] border-solid border-gray-700"
                            radius="full" variant="bordered" startContent={<MdLocalPhone className="text-blackRoot text-lg" />}>
                            <p className="text-blackRoot">Позвонить</p>
                        </Button>
                    </a>
                    <a href="tel:">
                        <Button 
                        className="border-[2px] border-solid border-[#28D146]"
                        radius="full" variant="ghost" startContent={<IoLogoWhatsapp className="text-[#28D146] text-lg border-black" />}>
                            <p className="text-[#28D146]">Написать</p>
                        </Button>
                    </a>
                </div>
            </div>
            <div className="w-full max-w-[50%] lg:max-w-[100%] h-[70vh] shadow-lg lg:h-[50vh]">
                <YMaps>
                    <YandexMap defaultState={{
                        center: [42.87, 74.59],
                        zoom: 16,
                    }} className="w-full h-full">
                        <Placemark geometry={[42.87, 74.59]} />
                    </YandexMap>
                </YMaps>
            </div>
        </section>
    )
}