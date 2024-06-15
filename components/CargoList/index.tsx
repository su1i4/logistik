import { CargoCard } from "../Cards/CargoCard";
import { CargoCardType } from "@/types";
import { Pagination } from "@nextui-org/react";
import { PAGE_SIZES } from "@/utils/helpers/general";
import { Select, SelectItem } from "@nextui-org/react";

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

  return (
    <div className="p-8 md:p-4 xs:p-2 pt-[145px] md:pt-[470px] sm:pt-[550px]">
      <div className="flex justify-between items-end">
        <p className="font-mono text-white text-md bg-grayRoot rounded-t-md p-2">
          Найдено: {data?.length} грузов
        </p>
        <Select
          className="max-w-32 mb-2"
          label={<span className="text-white" >Кол - страниц</span>}
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
      <div className="font-mono text-white w-full grid grid-cols-5 bg-grayRoot rounded-b-md p-2 mb-3">
        <p>Направление</p>
        <p>Груз</p>
        <p>Вес,кг / объём,м³</p>
        <p>Дата, От / До</p>
        <p>Подробнее</p>
      </div>
      <div className="w-full h-fit grid grid-cols-1 gap-3">
        {data?.map((item: CargoCardType, index: number) => (
          <CargoCard key={index} {...item} />
        ))}
        {totalPages > 1 && (
          <div className="w-full flex justify-center">
            <Pagination
              color="primary"
              onChange={handlePaginationChange}
              total={totalPages}
              initialPage={page}
            />
          </div>
        )}
      </div>
    </div>
  );
};
