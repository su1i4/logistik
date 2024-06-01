import { CargoList } from "@/components/CargoList"
import { CargoFilter } from "@/components/CargoFilter/Index"

export const Filter = () => {

    return (
        <section className="w-full min-h-screen bg-blackRoot relative z-50">
            <div className="absolute top-[-80px] w-full p-8 h-[300px] z-[9999]">
               <CargoFilter />
            </div>
            <CargoList />
        </section>
    )
}