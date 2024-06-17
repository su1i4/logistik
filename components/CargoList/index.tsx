"use client";

import { CargoCard } from "../Cards/CargoCard";
import { CargoCardType } from "@/types";
import { PAGE_SIZES } from "@/utils/helpers/general";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { FaWeightHanging } from "react-icons/fa6";
import { FaBoxOpen, FaCalendarDay, FaRoad } from "react-icons/fa";
import { BsChatRightDotsFill } from "react-icons/bs";
import CustomPagination from "../Pagination/index";

export const CargoList = ({
  data,
  page,
  size,
  totalPages,
  setPage,
  setSize,
}: any) => {
  const handlePaginationChange = (event: any) => {
    setPage(event);
  };

  const [showIndex, setShowIndex] = useState(-1);

  return (
    <div className="p-8 md:p-4 xs:p-2 pt-[145px] md:pt-[420px] sm:pt-[510px] xs:pt-[490px]">
      <div className="flex justify-between items-end">
        <p className=" text-milk text-md bg-grayRoot rounded-t-md p-2 xs:text-sm font-medium">
          Найдено: {data?.length} грузов
        </p>
        <Select
          className="max-w-32 mb-2 md:mb-0"
          label={<span className="text-white">Кол - страниц</span>}
          labelPlacement="outside"
          placeholder="Страница"
          renderValue={() => {
            return <span>{size}</span>;
          }}
        >
          {PAGE_SIZES.map((item: number) => (
            <SelectItem key={item} onClick={() => setSize(item)}>
              {item}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="sticky top-[70px] font-mono text-white w-full grid grid-cols-5 bg-lightGray rounded-b-md p-2 mb-3 md:hidden z-[100]">
        <div className="flex items-center gap-2">
          <FaRoad className="text-milk" />
          Направление
        </div>
        <div className="flex items-center gap-2">
          <FaBoxOpen className="text-milk" />
          Груз
        </div>
        <div className="flex items-center gap-2">
          <FaWeightHanging className="text-milk" />
          Вес,кг / объём,м³
        </div>
        <div className="flex items-center gap-2">
          <FaCalendarDay className="text-milk" />
          Дата, От / До
        </div>
        <div className="flex items-center gap-2">
          <BsChatRightDotsFill className="text-milk" />
          Комментарий
        </div>
      </div>
      <div className="w-full h-fit grid grid-cols-1 gap-3 md:mt-[6px]">
        {data?.map((item: CargoCardType, index: number) => (
          <CargoCard
            key={index}
            props={item}
            index={index}
            showIndex={showIndex}
            setShowIndex={setShowIndex}
          />
        ))}
        {totalPages > 1 && (
          <div className="w-full flex justify-center">
            <CustomPagination
              color="success"
              onChange={handlePaginationChange}
              totalPages={totalPages}
              initialPage={page}
              handlePaginationChange={handlePaginationChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
