import { CargoCardType } from "@/types";

export const CargoCard = (props: CargoCardType) => {
  return (
    <div className="bg-milk w-full h-[150px] rounded-md p-2 font-mono">
      <p>{props.productName}</p>
    </div>
  );
};
