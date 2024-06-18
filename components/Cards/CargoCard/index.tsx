"use client";

import { IoArrowUpSharp } from "react-icons/io5";
import { FormatDateToRussian } from "@/utils/helpers/general";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/react";

export const CargoCard = ({
  props,
  index,
  setShowIndex,
  showIndex,
  Cars,
}: any) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/cargo/${props.cargoId}`);
  };

  return (
    <div className="bg-grayRoot w-full grid grid-cols-6 md:grid-cols-none md:flex md:flex-col h-[120px] md:h-fit rounded-md p-2 font-sans font-[400] text-white transition-all duration-300 md:gap-1 relative">
      <div
        className={`absolute cursor-pointer right-2 bottom-[-5px] w-full bg-gradient-to-r from-gray-500 py-[2px] to-gray-700 rounded-md max-w-28 text-sm flex justify-center items-center text-white md:hidden z-[90]`}
        onClick={handleNavigation}
      >
        Подробнее
      </div>
      <div className="flex flex-col gap-1 md:flex-row md:gap-4 xs:text-sm text-white">
        {props.ByFrom.label}
        <IoArrowUpSharp className="text-xl text-green-700 rotate-180 md:rotate-90" />
        {props.ByTo.label}
      </div>
      <div className="xs:text-sm md:hidden">{props.productName}</div>
      <div className="xs:text-sm">
        <p className="md:flex justify-start gap-1">
          <span>
            {props.ByWeight} т / {props.BySize} м³
          </span>{" "}
          <span className="hidden md:block"> / {props.productName}</span>
        </p>
      </div>
      <div className="flex flex-col gap-1 md:flex-row md:gap-4 xs:text-sm">
        {FormatDateToRussian(props.startDate)}
        <IoArrowUpSharp className="text-xl text-green-700 rotate-180 md:rotate-90 ml-10 md:ml-0" />
        {FormatDateToRussian(props.endDate)}
      </div>
      <Tooltip
        content={
          <div className="flex max-w-44 flex-wrap cursor-pointer">
            {Cars?.filter((car: any) => props.carId.includes(car.value)).map(
              (item: any, index: number) => (
                <span
                  key={index}
                  className="text-blackRoot mr-1 text-sm line-clamp-4"
                >
                  {item.label},
                </span>
              )
            )}
          </div>
        }
      >
        <div className="flex max-w-24 xs:max-w-full flex-wrap cursor-pointer">
          {Cars?.filter((car: any) => props.carId.includes(car.value)).map(
            (item: any, index: number) => (
              <span
                key={index}
                className="text-white mr-1 text-sm line-clamp-4"
              >
                {item.label},
              </span>
            )
          )}
        </div>
      </Tooltip>
      <div className="md:hidden">{props.ByComment}</div>
      <div
        className={`hidden md:block border-t-[1px] border-solid border-gray-200 transition-all duration-300 mt-1`}
      >
        <p className={`${showIndex === index ? "" : "hidden"} xs:text-sm`}>
          {props.ByComment}
        </p>
        <div className="w-full flex justify-end mt-1">
          <div
            className={`${showIndex === index ? "" : "hidden"} cursor-pointer w-full bg-gradient-to-r from-gray-500 py-[2px] to-gray-700 rounded-md max-w-28 text-sm flex justify-center items-center text-white`}
            onClick={handleNavigation}
          >
            Подробнее
          </div>
        </div>
        <div
          onClick={() => setShowIndex(index === showIndex ? -1 : index)}
          className="text-gray-300 text-xs flex justify-end items-center gap-1 underline cursor-pointer mt-1"
        >
          <p>{showIndex !== index ? "Открыть" : "Свернуть"}</p>
          <IoIosArrowDown
            className={`mt-1 transition-all duration-300 ${showIndex === index ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>
    </div>
  );
};
