import { CargoCard } from "../Cards/CargoCard";
import { CargoCardType } from "@/types";
import { Pagination } from "@nextui-org/react";

export const CargoList = ({ data, page, size, totalPages, setPage }: any) => {
  const handlePaginationChange = (event: any) => {
    setPage(event);
  };

  return (
    <div className="p-8 pt-[200px]">
      <p className="font-mono text-white text-lg mb-2">
        Найдено: {data?.length} грузов
      </p>
      <div className="font-mono text-white w-full grid grid-cols-5 bg-gray-600 rounded-md p-2 mb-3">
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
        {totalPages >
          1 && (
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
