'use client'

import { useState } from "react"
import { CargoList } from "@/components/CargoList"
import { CargoFilter } from "@/components/CargoFilter/Index"
import { useGetCargoQuery, useGetPointsQuery } from "@/services/cargo.service"

export const Filter = () => {
    const [pagination, setPagination] = useState<any>({
        page: 1,
        size: 10
    })
    const [filter, setFilter] = useState<any>({
        ByFrom: '',
        ByTo: '',
        ByWeightFrom: '',
        ByWeightTo: '',
        BySizeFrom: '',
        BySizeTo: '',
        startPeriod: new Date(),
        endPeriod: new Date(),
    })

    const { data = {content: []}, isLoading } = useGetCargoQuery({...pagination})
    const { data: Points = [], isLoading: PointLoading} = useGetPointsQuery()

    return (
        <section className="w-full min-h-screen bg-blackRoot relative z-50">
            <div className="absolute top-[-80px] w-full p-8 h-fit z-[9999]">
               <CargoFilter filter={filter} setFilter={setFilter} Points={Points} />
            </div>
            <CargoList data={data?.content} />
        </section>
    )
}