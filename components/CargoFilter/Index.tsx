import { Input, Select, SelectItem, DatePicker } from "@nextui-org/react";
import { Switch } from "../SwitchPlace";

export const CargoFilter = ({ filter, setFilter, Points }: any) => {
  const changeValue = (value: any, name: string) => {
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  console.log(filter, "this is filter");

  return (
    <div className="w-full h-full bg-milk rounded-md p-4 flex flex-wrap gap-4">
      <div className="w-full max-w-xl flex items-end gap-2">
        <Select
          className="max-w-xs"
          label="От"
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
        <Switch />
        <Select
          labelPlacement="outside"
          className="max-w-xs "
          label="До"
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
      </div>
      <Input
        type="number"
        label="От вес/кг"
        fullWidth={true}
        placeholder=" "
        className="font-mono max-w-28"
        radius="sm"
        labelPlacement="outside"
        value={filter.ByWeightFrom}
        onChange={(e) => changeValue(e.target.value, "ByWeightFrom")}
      />
      <Input
        type="number"
        label="До вес/кг"
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
        label="От обьем, m3"
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
        label="До обьем, m3"
        fullWidth={true}
        placeholder=" "
        className="font-mono max-w-28"
        radius="sm"
        labelPlacement="outside"
        value={filter.BySizeTo}
        onChange={(e) => changeValue(e.target.value, "BySizeTo")}
      />
      {/* <DatePicker
                label="Дата - От"
                className="max-w-44"
                labelPlacement="outside"
                value={filter.startPeriod}
                onChange={(e) => changeValue(e, 'startPeriod')}
            />
            <DatePicker
                label="Дата - До"
                className="max-w-44"
                labelPlacement="outside"
                value={filter.endPeriod}
                onChange={(e) => changeValue(e, 'startPeriod')}
            /> */}
    </div>
  );
};
