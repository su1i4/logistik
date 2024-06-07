import { CargoCard } from "../Cards/CargoCard"
import { CargoCardType } from "@/types"

export const CargoList = ({data}: any) => {

    return (
        <div className="p-8 pt-[200px]">
            <p className="font-mono text-white text-lg mb-2">Найдено: {data?.length} грузов</p>
            <div className="w-full h-fit grid grid-cols-1 gap-4">
                {data?.map((item: CargoCardType, index: number) => (
                    <CargoCard
                        key={index}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}
