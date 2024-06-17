"use client";

import { Button } from "@nextui-org/react";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import Map, {
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
  Marker,
} from "react-map-gl";

export default function Contacts() {
  return (
    <section className="w-full h-[90vh] flex items-center justify-between p-4 gap-4 bg-gray-100 lg:flex-col lg:items-start lg:justify-start lg:gap-0 lg:h-fit text-black">
      <div className="w-full pr-10 h-[70vh] grid grid-rows-6 font-mono lg-[30vh] lg:pr-0">
        <p className="text-3xl font-[700]">Как нас найти</p>
        <p className="text-xl font-[400]">
          Офис работает с 9 утра до 4 вечера.
          <br />
          <br />
          Звонить можно круглосуточно
        </p>
        <p className="w-full border-t-[1px] border-solid flex items-center text-[20px] border-gray-400 mt-2">
          <span className="font-[700]">Адрес: </span> Исы Ахунбаева, 131 адрес
        </p>
        <div className="w-full border-t-[1px] border-solid border-gray-400 flex flex-col justify-around gap-5 h-[150px] border-b">
          <div className="flex items-center gap-3 md:flex-col">
            <span className="font-[700]">Телефон: +996 (770) 555-349</span>{" "}
            <a href="whatsapp://send?abid=+996770555349">
              <Button
                className="border-[2px] border-solid border-[#28D146]"
                radius="full"
                variant="ghost"
                startContent={
                  <IoLogoWhatsapp className="text-[#28D146] text-lg border-black" />
                }
              >
                <p className="text-[#28D146]">Написать</p>
              </Button>
            </a>
            <a href="tel:+996770555349">
              <Button
                className="border-[2px] border-solid border-gray-700"
                radius="full"
                variant="bordered"
                startContent={
                  <MdLocalPhone className="text-blackRoot text-lg" />
                }
              >
                <p className="text-blackRoot">Позвонить</p>
              </Button>
            </a>
          </div>
          <div className="flex items-center gap-3 md:flex-col">
            <span className="font-[700]">Телефон: +996 (707) 602-639</span>{" "}
            <a href="whatsapp://send?abid=+996707602639">
              <Button
                className="border-[2px] border-solid border-[#28D146]"
                radius="full"
                variant="ghost"
                startContent={
                  <IoLogoWhatsapp className="text-[#28D146] text-lg border-black" />
                }
              >
                <p className="text-[#28D146]">Написать</p>
              </Button>
            </a>
            <a href="tel:+996707602639">
              <Button
                className="border-[2px] border-solid border-gray-700"
                radius="full"
                variant="bordered"
                startContent={
                  <MdLocalPhone className="text-blackRoot text-lg" />
                }
              >
                <p className="text-blackRoot">Позвонить</p>
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[50%] lg:max-w-[100%] h-[70vh] shadow-lg lg:h-[50vh] md:mt-10">
        <Map
          key={JSON.stringify({
            longitude: 74.596263,
            latitude: 42.843534,
            zoom: 6,
          })}
          mapboxAccessToken="pk.eyJ1IjoiYTZ1eGE0IiwiYSI6ImNscGhibWM5aTA1c28ycm1oNGdjYTYybnQifQ.JFaTlYbkSMf395KgTMMkSQ"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "15px",
          }}
          initialViewState={{
            longitude: 74.596263,
            latitude: 42.843534,
            zoom: 15,
          }}
          mapStyle="mapbox://styles/a6uxa4/clpish7f200ng01pjdlv8fkcs"
        >
          <Marker longitude={74.596263} latitude={42.843534} />
          <div className="absolute top-6 right-6">
            <NavigationControl />
            <GeolocateControl />
          </div>
        </Map>
      </div>
    </section>
  );
}
