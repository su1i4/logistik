import {
  Input,
  Select,
  SelectItem,
  SelectSection,
  DatePicker,
} from "@nextui-org/react";
import { Switch } from "../SwitchPlace";
import { TYPES_CARS, FilterInputStyles } from "@/utils/helpers/general";

export const CargoFilter = ({
  filter,
  setFilter,
  Points,
  Cars,
  CarsLoading,
}: any) => {
  const changeValue = (value: any, name: string) => {
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  console.log(filter, 'this is filter')

  return (
    <div className="w-full h-full bg-grayRoot rounded-md p-4 flex flex-wrap gap-4">
      <div className="w-full max-w-xl flex items-end gap-2">
        <Select
          className="max-w-xs"
          label={<span className="text-white" >Откуда</span>}
          labelPlacement="outside"
          placeholder=" "
          name="ByFrom"
        >
          {Points.map((item: any, index: number) => (
            <SelectItem
              onClick={() => changeValue(item.value, "ByFrom")}
              key={index}
            >
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <Switch setFilter={setFilter} filter={filter} />
        <Select
          labelPlacement="outside"
          className="max-w-xs "
          label={<span className="text-white" >Куда</span>}
          placeholder=" "
        >
          {Points.map((item: any, index: number) => (
            <SelectItem
              onClick={() => changeValue(item.value, "ByTo")}
              key={index}
            >
              {item.label}
            </SelectItem>
          ))}
        </Select>
        {/* <Select
          labelPlacement="outside"
          className="max-w-xs "
          label="До"
          placeholder=" "
        >
          {Object.values(Cars).map((item: any, index: number) => (
            <SelectSection key={index} showDivider title={TYPES_CARS[item]}>
              {item.map((item: any, index: number) => (
                <SelectItem key={index}>{item.label}</SelectItem>
              ))}
            </SelectSection>
          ))}
        </Select> */}
      </div>
      <Input
        type="number"
        label={<span className="text-white">Вес/кг, От</span>}
        fullWidth={true}
        placeholder=" "
        className="font-mono max-w-28"
        radius="sm"
        classNames={FilterInputStyles}
        labelPlacement="outside"
        value={filter.ByWeightFrom}
        onChange={(e) => changeValue(e.target.value, "ByWeightFrom")}
      />
      <Input
        type="number"
        label={<span className="text-white">Вес/кг, До</span>}
        fullWidth={true}
        placeholder=" "
        className="font-mono max-w-28"
        radius="sm"
        labelPlacement="outside"
        value={filter.ByWeightTo}
        onChange={(e) => changeValue(e.target.value, "ByWeightTo")}
      />
      <Input
        type="number"
        label={<span className="text-white">От обьем, m3</span>}
        fullWidth={true}
        placeholder=" "
        className="font-mono max-w-28"
        radius="sm"
        labelPlacement="outside"
        value={filter.BySizeFrom}
        onChange={(e) => changeValue(e.target.value, "BySizeFrom")}
      />
      <Input
        type="number"
        label={<span className="text-white" >До обьем, m3</span>}
        fullWidth={true}
        placeholder=" "
        className="font-mono max-w-28"
        radius="sm"
        labelPlacement="outside"
        value={filter.BySizeTo}
        onChange={(e) => changeValue(e.target.value, "BySizeTo")}
      />
      <DatePicker
        label={<span className="text-white">Дата, От</span>}
        className="max-w-44"
        labelPlacement="outside"
        value={filter.startPeriod}
        onChange={(e) => changeValue(e, "startPeriod")}
      />
      <DatePicker
        label={<span className="text-white">Дата, До</span>}
        className="max-w-44"
        labelPlacement="outside"
        value={filter.endPeriod}
        onChange={(e) => changeValue(e, "startPeriod")}
      />
    </div>
  );
};
