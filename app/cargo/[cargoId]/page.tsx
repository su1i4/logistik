"use client";

import { useGetOneCargoQuery } from "@/services/cargo.service";

export default function Cargo({ params }: { params: { cargoId: string } }) {
  const { data, isLoading } = useGetOneCargoQuery(params.cargoId, {
    skip: params.cargoId === undefined,
  });

  return (
    <main className="w-full h-[86vh] bg-blackRoot">
      <div></div>
    </main>
  );
}
