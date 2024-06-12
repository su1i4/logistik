import { CargoCardType } from "@/types";
import { IoArrowUpSharp } from "react-icons/io5";
import { FormatDateToRussian } from "@/utils/helpers/general";

export const CargoCard = (props: CargoCardType) => {
  return (
    <div className="bg-grayRoot w-full grid grid-cols-5 h-[120px] rounded-md p-2 font-mono text-white">
      <div className="flex flex-col gap-1">
        {props.ByFrom.label}
        <IoArrowUpSharp className="text-xl text-green-700 rotate-180" />
        {props.ByTo.label}
      </div>
      <div>{props.productName}</div>
      <div>
        <p>
          {props.ByWeight} / {props.BySize}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        {FormatDateToRussian(props.startDate)}
        <IoArrowUpSharp className="text-xl text-green-700 rotate-180" />
        {FormatDateToRussian(props.endDate)}
      </div>
      <div>{props.ByComment}</div>
    </div>
  );
};
