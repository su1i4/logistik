"use client";

import Map, {
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";
import { useGetOneCargoQuery } from "@/services/cargo.service";
import { Button } from "@nextui-org/button";
import { MdLocalPhone } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoArrowUpSharp } from "react-icons/io5";
import { FaWeightHanging } from "react-icons/fa6";
import { FaBoxOpen, FaCalendarDay, FaRoad } from "react-icons/fa";
import { BsChatRightDotsFill } from "react-icons/bs";
import { FormatDateToRussian } from "@/utils/helpers/general";

export default function Cargo({ params }: { params: { cargoId: string } }) {
  const [directions, setDirections] = useState(null);
  const [mapLocation, setMapLocation] = useState<any>({
    longitude: 74.609914,
    latitude: 42.859109,
    zoom: 6,
    transitionDuration: 500,
  });

  const { data, isLoading } = useGetOneCargoQuery(params.cargoId, {
    skip: params.cargoId === undefined,
  });

  useEffect(() => {
    if (data) {
      const accessToken =
        "pk.eyJ1IjoiYTZ1eGE0IiwiYSI6ImNscGhibWM5aTA1c28ycm1oNGdjYTYybnQifQ.JFaTlYbkSMf395KgTMMkSQ";
      const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${data.fromMap.longitude},${data.fromMap.lattitude};${data.toMap.longitude},${data.toMap.lattitude}?geometries=geojson&access_token=${accessToken}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setDirections(data.routes[0].geometry);
        })
        .catch((error) => {
          console.error("Ошибка получения маршрута:", error);
        });
    }
  }, [data]);

  return (
    <main className="w-full h-[86vh] bg-blackRoot p-8 flex justify-between lg:flex-col lg:items-start lg:justify-start lg:h-fit gap-10 xs:p-4">
      <div className="w-full pr-10 h-fit flex flex-col gap-5 xs:gap-3 items-start font-mono lg-[30vh] lg:pr-0">
        <div className="flex gap-3 text-white text-lg items-center">
          <FaRoad className="text-milk" />
          {data?.ByFrom?.label}
          <IoArrowUpSharp className="text-xl text-green-700 rotate-90" />
          {data?.ByTo?.label}
        </div>
        <div className="xs:text-sm flex gap-3 text-white items-center">
          <FaBoxOpen />
          {data?.productName}
        </div>
        <div className="xs:text-sm flex items-center gap-3 text-white">
          <FaWeightHanging />
          <p className="md:flex justify-start gap-1">
            <span>
              {data?.ByWeight} кг / {data?.BySize} м³
            </span>
          </p>
        </div>
        <div className="flex gap-3 xs:text-sm text-white">
          <FaCalendarDay />
          {FormatDateToRussian(data?.startDate)}
          <IoArrowUpSharp className="text-xl text-green-700 rotate-90" />
          {FormatDateToRussian(data?.endDate)}
        </div>
        <div className="text-white flex items-start gap-2">
          <BsChatRightDotsFill className="text-milk mt-[6px]" />
          {data?.ByComment}
        </div>
        <div className="flex flex-col w-full  pt-4 gap-4 lg:flex-row">
          <a href="tel:">
            <Button
              className="border-[2px] border-solid border-gray-200"
              radius="full"
              variant="bordered"
              startContent={<MdLocalPhone className="text-gray-200 text-lg" />}
            >
              <p className="text-gray-200">Позвонить</p>
            </Button>
          </a>
          <a href="tel:">
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
        </div>
      </div>
      <div className="w-full max-w-[50%] lg:max-w-[100%] h-[70vh] shadow-lg lg:h-[50vh]">
        <Map
          key={JSON.stringify(mapLocation)}
          mapboxAccessToken="pk.eyJ1IjoiYTZ1eGE0IiwiYSI6ImNscGhibWM5aTA1c28ycm1oNGdjYTYybnQifQ.JFaTlYbkSMf395KgTMMkSQ"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "15px",
          }}
          initialViewState={mapLocation}
          mapStyle="mapbox://styles/a6uxa4/clpish7f200ng01pjdlv8fkcs"
        >
          {directions && (
            <Source type="geojson" data={directions}>
              <Layer
                type="line"
                paint={{
                  "line-color": "#4da435", // Цвет линии
                  "line-width": 4, // Ширина линии
                }}
              />
            </Source>
          )}
          <div className="absolute top-6 right-6">
            <NavigationControl />
            <GeolocateControl />
          </div>
        </Map>
      </div>
    </main>
  );
}
