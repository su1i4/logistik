"use client";

import { useState } from "react";
import { CargoList } from "@/components/CargoList";
import { CargoFilter } from "@/components/CargoFilter/Index";
import {
  useGetCargoQuery,
  useGetPointsQuery,
  useGetCarsQuery,
} from "@/services/cargo.service";

export const Filter = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const [filter, setFilter] = useState<any>({
    ByFrom: "Sulaiman",
    ByTo: "",
    ByWeightFrom: "",
    ByWeightTo: "",
    BySizeFrom: "",
    BySizeTo: "",
    startPeriod: null,
    endPeriod: null,
  });

  const [carId, setCarId] = useState([]);

  const handleClear = () => {
    setFilter({
      ByFrom: "",
      ByTo: "",
      ByWeightFrom: "",
      ByWeightTo: "",
      BySizeFrom: "",
      BySizeTo: "",
      startPeriod: null,
      endPeriod: null,
    });
  };

  const { data = { content: [], totalPages: 0 }, isLoading } = useGetCargoQuery(
    {
      page: page,
      size: size,
      params: filter,
      carId: carId,
    }
  );
  const { data: Points = [], isLoading: PointLoading } = useGetPointsQuery();
  const { data: Cars = [], isLoading: CarsLoading } = useGetCarsQuery();

  return (
    <section className="w-full min-h-screen bg-blackRoot relative z-50 border-b-[1px] border-solid border-gray-400">
      <div className="absolute top-[-80px] w-full p-8 h-fit z-[9999]">
        <CargoFilter
          filter={filter}
          setFilter={setFilter}
          Points={Points}
          Cars={Cars}
          CarsLoading={CarsLoading}
          handleClear={handleClear}
          carId={carId}
          setCarId={setCarId}
        />
      </div>
      <CargoList
        data={data?.content}
        setPage={setPage}
        page={page}
        size={size}
        totalPages={data?.totalPages}
      />
    </section>
  );
};
