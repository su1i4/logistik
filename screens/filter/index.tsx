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
  const [pagination, setPagination] = useState<any>({
    page: 1,
    size: 10,
  });
  const [filter, setFilter] = useState<any>({
    ByFrom: "",
    ByTo: "",
    ByWeightFrom: "",
    ByWeightTo: "",
    BySizeFrom: "",
    BySizeTo: "",
    startPeriod: null,
    endPeriod: null,
  });

  const { data = { content: [] }, isLoading } = useGetCargoQuery({
    page: pagination.page,
    size: pagination.size,
    params: filter,
  });
  const { data: Points = [], isLoading: PointLoading } = useGetPointsQuery();
  const { data: Cars = [], isLoading: CarsLoading } = useGetCarsQuery();

  return (
    <section className="w-full min-h-screen bg-blackRoot relative z-50 border-b-[1px] border-solid border-gray-400">
      <div className="absolute top-[-80px] w-full p-8 h-fit z-[9999]">
        <CargoFilter filter={filter} setFilter={setFilter} Points={Points} Cars={Object(Cars[0])} CarsLoading={CarsLoading} />
      </div>
      <CargoList data={data?.content} />
    </section>
  );
};
