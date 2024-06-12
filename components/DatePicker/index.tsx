"use client";

import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { MiniCalendar } from "../mini-calendar/index"
import { FormatDateToRussian } from "@/utils/helpers/general";

export const DatePicker = ({
  value,
  changeValue,
  name,
  show,
  placeholder,
}: any) => {
  return (
    <Popover placement="bottom" showArrow={true} radius="none">
      <PopoverTrigger>
        <Input
          type="text"
          label={<span className="text-white">{show && "Дата поставки"}</span>}
          fullWidth={true}
          className="font-mono w-48"
          radius="none"
          placeholder=" "
          labelPlacement="outside"
          value={value ? `${placeholder} ${FormatDateToRussian(value)}`: ''}
          onChange={(e) => changeValue(e.target.value, name)}
        //   endContent={
        //     <FaCalendarAlt className="text-gray-500 text-sm min-w-3 cursor-pointer" />
        //   }
          isClearable
          onClear={() => changeValue(null, name)}
        />
      </PopoverTrigger>
      <PopoverContent>
        <MiniCalendar newDate={value} setNewDate={(newDate) => changeValue(newDate, name)} />
      </PopoverContent>
    </Popover>
  );
};