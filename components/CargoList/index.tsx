import { CargoCard } from "../Cards/CargoCard";
import { CargoCardType } from "@/types";

export const CargoList = ({ data }: any) => {
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
      </div>
    </div>
  );
};
