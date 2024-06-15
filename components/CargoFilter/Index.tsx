import {
  Input,
  Select,
  SelectItem,
  SelectSection,
  Button,
} from "@nextui-org/react";
import { Switch } from "../SwitchPlace";
import { TYPES_CARS } from "@/utils/helpers/general";
import { DatePicker } from "../DatePicker";

export const CargoFilter = ({
  filter,
  setFilter,
  Points,
  Cars,
  CarsLoading,
  handleClear,
  carId,
  setCarId,
}: any) => {
  const changeValue = (value: any, name: string) => {
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: any) => {
    let ids = [...carId];
    if (ids.includes(value)) {
      ids = ids.filter((id: number) => id !== value);
    } else {
      ids.push(value);
    }
    setCarId(ids);
  };

  return (
    <div className="w-full h-full bg-grayRoot rounded-md p-4">
      <div className="flex justify-between items-center gap-4 md:flex-col md:w-full">
        <div className="w-full flex items-end gap-2 md:flex-col md:items-center md:gap-0">
          <Select
            className="w-full"
            label={<span className="text-white">Откуда</span>}
            labelPlacement="outside"
            placeholder="Например, Бишкек"
            radius="none"
            renderValue={() => {
              if (filter.ByFrom) {
                return (
                  <div>
                    <span className="text-black">{filter.ByFrom.label}</span>
                  </div>
                );
              }
              return (
                <div>
                  <span className="text-grayRoot/70">Например, Бишкек</span>
                </div>
              );
            }}
          >
            <SelectItem key={10} onClick={() => changeValue("", "ByFrom")}>
              {"--------"}
            </SelectItem>
            {Points.map((item: any, index: number) => (
              <SelectItem
                onClick={() => changeValue(item, "ByFrom")}
                key={index}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
          <Switch setFilter={setFilter} filter={filter} />
          <div className="w-full md:mt-[-20px]">
            <Select
              labelPlacement="outside"
              className="w-full rounded-[2px] md:mt-[-20px]"
              label={<span className="text-white">Куда</span>}
              placeholder="Например, Каракол"
              radius="none"
              renderValue={() => {
                if (filter.ByTo) {
                  return (
                    <div>
                      <span className="text-black">{filter.ByTo.label}</span>
                    </div>
                  );
                }
                return (
                  <div>
                    <span className="text-grayRoot/70">Например, Каракол</span>
                  </div>
                );
              }}
            >
              <SelectItem key={10} onClick={() => changeValue("", "ByTo")}>
                {"--------"}
              </SelectItem>
              {Points.map((item: any, index: number) => (
                <SelectItem
                  onClick={() => changeValue(item, "ByTo")}
                  key={index}
                >
                  {item.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="md:w-full flex justify-between gap-4 items-center sm:flex-col">
          <div className="md:w-full flex items-center gap-[1px]">
            <Input
              type="number"
              label={<span className="text-white">Вес, кг</span>}
              fullWidth={true}
              placeholder="От"
              className="font-mono max-w-32 min-w-32 md:max-w-full"
              radius="none"
              labelPlacement="outside"
              value={filter.ByWeightFrom}
              onChange={(e) => changeValue(e.target.value, "ByWeightFrom")}
              isClearable
              onClear={() => changeValue("", "ByWeightFrom")}
            />
            <Input
              type="number"
              label={<span className="text-white"></span>}
              fullWidth={true}
              placeholder="До"
              className="font-mono max-w-32 min-w-32 md:max-w-full"
              radius="none"
              labelPlacement="outside"
              value={filter.ByWeightTo}
              onChange={(e) => changeValue(e.target.value, "ByWeightTo")}
              isClearable
              onClear={() => changeValue("", "ByWeightTo")}
            />
          </div>
          <div className="md:w-full flex items-center gap-[1px] ">
            <Input
              type="number"
              label={<span className="text-white">Обьем, м³</span>}
              fullWidth={true}
              placeholder="От"
              className="font-mono max-w-32 min-w-32 md:max-w-full"
              radius="none"
              labelPlacement="outside"
              value={filter.BySizeFrom}
              onChange={(e) => changeValue(e.target.value, "BySizeFrom")}
              isClearable
              onClear={() => changeValue("", "BySizeFrom")}
            />
            <Input
              type="number"
              label={<span className="text-white"> </span>}
              fullWidth={true}
              placeholder="До"
              className="font-mono max-w-32 min-w-32 md:max-w-full"
              radius="none"
              labelPlacement="outside"
              value={filter.BySizeTo}
              onChange={(e) => changeValue(e.target.value, "BySizeTo")}
              isClearable
              onClear={() => changeValue("", "BySizeTo")}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-end mt-3 justify-between md:flex-col md:items-end">
        <div className="flex items-end justify-start gap-4 md:flex-col md:items-center md:w-full">
          <div className="w-full flex items-center gap-[1px]">
            <DatePicker
              value={filter.startPeriod}
              changeValue={changeValue}
              name="startPeriod"
              show={true}
              placeholder="От"
            />
            <DatePicker
              value={filter.endPeriod}
              changeValue={changeValue}
              placeholder="До"
              name="endPeriod"
              show={false}
            />
          </div>
          <div className="w-full">
            <Select
              labelPlacement="outside"
              className="w-[350px] md:w-full"
              label={<span className="text-white">Тип кузова</span>}
              placeholder="Например, Крытый"
              radius="none"
              selectionMode="multiple"
              fullWidth={true}
              renderValue={() => {
                if (carId.length) {
                  return (
                    <div>
                      {carId.map((item: any, index: number) => (
                        <span key={index} className="text-black mr-1">
                          {item.label},
                        </span>
                      ))}
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <span className="text-grayRoot/70">Например, Крытый</span>
                    </div>
                  );
                }
              }}
            >
              {Object.entries(Cars).map(([key, items]: any) => (
                <SelectSection key={key} showDivider title={TYPES_CARS[key]}>
                  {items.map((item: any, itemIndex: any) => (
                    <SelectItem
                      onClick={() => handleSelectChange(item)}
                      key={`${key}-${itemIndex}`}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectSection>
              ))}
            </Select>
          </div>
        </div>
        <Button
          onClick={handleClear}
          className="font-mono md:mt-3"
          radius="none"
          variant="bordered"
        >
          <p className="text-white">Очистить</p>
        </Button>
      </div>
    </div>
  );
};
