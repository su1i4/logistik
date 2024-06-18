"use client";

import Map, {
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
} from "react-map-gl";
import { useState, useEffect } from "react";
import { useGetOneCargoQuery, useGetCarsQuery } from "@/services/cargo.service";
import { Button } from "@nextui-org/button";
import { MdLocalPhone } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoArrowUpSharp } from "react-icons/io5";
import { FaWeightHanging } from "react-icons/fa6";
import { FaBoxOpen, FaCalendarDay, FaRoad } from "react-icons/fa";
import { BsChatRightDotsFill } from "react-icons/bs";
import { FormatDateToRussian } from "@/utils/helpers/general";

export default function Cargo({ params }: { params: { cargoId: string } }) {
  const { data: Cars = [], isLoading: CarsLoading } = useGetCarsQuery();
  const [array, setArray] = useState<any>([]);

  const [directions, setDirections] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
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
    if (typeof Cars === 'object' && Cars !== null) {
      setArray([...(Cars.popularCar || []), ...(Cars.allCar || [])]);
    }
  }, [Cars]);

  useEffect(() => {
    if (data) {
      const accessToken =
        "pk.eyJ1IjoiYTZ1eGE0IiwiYSI6ImNscGhibWM5aTA1c28ycm1oNGdjYTYybnQifQ.JFaTlYbkSMf395KgTMMkSQ";
      const apiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${data.fromMap.longitude},${data.fromMap.lattitude};${data.toMap.longitude},${data.toMap.lattitude}?geometries=geojson&access_token=${accessToken}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.routes && data.routes.length > 0) {
            const route = data.routes[0].geometry;
            const distance = data.routes[0].distance / 1000;
            setDirections(route);
            setDistance(distance);
          }
        })
        .catch((error) => {
          console.error("Ошибка получения маршрута:", error);
        });
    }
  }, [data]);

  return (
    <main className="w-full h-full min-h-[86vh] bg-blackRoot p-8 flex justify-between lg:flex-col lg:items-start lg:justify-start lg:h-fit gap-10 lg:gap-0 xs:p-4">
      <div className="w-full pr-10 h-fit flex flex-col gap-5 xs:gap-3 items-start font-mono lg:pr-0">
        {isLoading ? (
          <>
            <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-full h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-full border-t-[1px] border-solid border-gray-400 flex flex-col justify-around gap-5 h-fit border-b py-3">
              <div className="flex items-center gap-3 md:flex-col">
                <div className="w-40 h-6 bg-gray-300 animate-pulse"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-full"></div>
              </div>
              <div className="flex items-center gap-3 md:flex-col">
                <div className="w-40 h-6 bg-gray-300 animate-pulse"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="w-32 h-10 bg-gray-300 animate-pulse rounded-full"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-3 text-white text-lg items-center xs:text-sm">
              <FaRoad className="text-milk" />
              {data?.ByFrom?.label}
              <IoArrowUpSharp className="text-xl text-green-700 rotate-90" />
              {data?.ByTo?.label} {distance?.toFixed(2)} км
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
            <div className="flex max-w-4/5 xs:max-w-full flex-wrap cursor-pointer">
              {array
                ?.filter((car: any) => data?.carId.includes(car.value))
                .map((item: any, index: number) => (
                  <span
                    key={index}
                    className="text-white mr-1 text-sm line-clamp-4"
                  >
                    {item.label},
                  </span>
                ))}
            </div>
            <div className="text-white flex items-start gap-2">
              <BsChatRightDotsFill className="text-milk mt-[6px]" />
              {data?.ByComment}
            </div>
            <div className="w-full border-t-[1px] border-solid border-gray-400 flex flex-col justify-around gap-5 h-fit border-b py-3">
              <div className="flex items-center gap-3 md:flex-col">
                <span className="text-white font-[700]">
                  Телефон: +996 (770) 555-349
                </span>{" "}
                <a href="whatsapp://send?abid=+996770555349">
                  <Button
                    className="border-[2px] border-solid border-[#28D146]"
                    radius="full"
                    variant="ghost"
                    startContent={
                      <IoLogoWhatsapp className="text-[#28D146] text-lg border-white" />
                    }
                  >
                    <p className="text-[#28D146]">Написать</p>
                  </Button>
                </a>
                <a href="tel:+996770555349">
                  <Button
                    className="border-[2px] border-solid border-white"
                    radius="full"
                    variant="bordered"
                    startContent={
                      <MdLocalPhone className="text-white text-lg" />
                    }
                  >
                    <p className="text-white">Позвонить</p>
                  </Button>
                </a>
              </div>
              <div className="flex items-center gap-3 md:flex-col">
                <span className="text-white font-[700]">
                  Телефон: +996 (707) 602-639
                </span>{" "}
                <a href="whatsapp://send?abid=+996707602639">
                  <Button
                    className="border-[2px] border-solid border-[#28D146]"
                    radius="full"
                    variant="ghost"
                    startContent={
                      <IoLogoWhatsapp className="text-[#28D146] text-lg border-white" />
                    }
                  >
                    <p className="text-[#28D146]">Написать</p>
                  </Button>
                </a>
                <a href="tel:+996707602639">
                  <Button
                    className="border-[2px] border-solid border-white"
                    radius="full"
                    variant="bordered"
                    startContent={
                      <MdLocalPhone className="text-white text-lg" />
                    }
                  >
                    <p className="text-white">Позвонить</p>
                  </Button>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-full max-w-[50%] lg:max-w-[100%] h-[70vh] shadow-lg lg:h-[50vh] lg:mt-3">
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
                  "line-color": "#4da435",
                  "line-width": 4,
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
