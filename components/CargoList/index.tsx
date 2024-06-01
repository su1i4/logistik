'use client'

import { useState, useEffect } from "react"

import { useGetCargoQuery } from "@/services/cargo.service"
import { CargoCard } from "../Cards/CargoCard"
import { CargoCardType } from "@/types"

export const CargoList = () => {
    const [data, setData] = useState<any>([])

    const { data: CargoList, isLoading } = useGetCargoQuery({ page: 1, size: 10 })

    useEffect(() => {
        if (CargoList) {
            const arr = []
            for (let i = 0; i < 10; i++) {
                arr.push(CargoList.content[0])
            }
            setData(arr)
        }
    }, [CargoList])

    console.log(CargoList?.content, 'this is Content')

    return (
        <div className="p-8 pt-[200px]">
            <p className="font-mono text-white text-lg mb-2">Найдено: {data.length} грузов</p>
            <div className="w-full h-fit grid grid-cols-1 gap-4">
                {data.map((item: CargoCardType, index: number) => (
                    <CargoCard
                        key={index}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}
