"use client";

import React, { useState } from "react";

import {
  Button,
  Select,
  SelectItem,
  SelectSection,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "@/public/icons/PlusIcon";
import {
  useGetCargoQuery,
  useGetCarsQuery,
  useGetPointsQuery,
} from "@/services/cargo.service";
import { FormatDateToRussian, TYPES_CARS } from "@/utils/helpers/general";
import { Switch } from "@/components/SwitchPlace";
import Table from "@/components/Table";
import { DeleteIcon } from "@/public/icons/DeleteIcon";
import { EyeIcon } from "@/public/icons/EyeIcon";
import { EditIcon } from "@/public/icons/EditIcon";
import { CreateModal } from "./CreateModal";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { onOpenChange, isOpen } = useDisclosure();

  const { push } = useRouter();

  const [page, setPage] = useState<number>(1);

  const [cargoData, setCargoData] = useState({
    startPeriod: "",
    endPeriod: "",
  });
  const [filter, setFilter] = useState<any>({
    ByFrom: "",
    ByTo: "",
  });
  const [carId, setCarId] = useState<any>([]);

  const { data = { content: [], totalPages: 0 }, isLoading } = useGetCargoQuery(
    {
      page: page,
      size: 7,
      carId,
      params: {
        ByFrom: filter.ByFrom.value,
        ByTo: filter.ByTo.value,
      },
    }
  );

  const { data: Points = [] } = useGetPointsQuery();
  const { data: Cars = [] } = useGetCarsQuery();

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

  const handleNavigate = (id: any) => {
    Cookies.set("user_token", "AUTHORIZED");
    push(`/cargo/${id}`);
  };

  const COLUMNS_CUSTOMER = [
    {
      label: "Откуда Куда",
      action: (data: any) => {
        const ByFrom = data?.ByFrom?.label;
        const ByTo = data?.ByTo?.label;
        return (
          <div className="text-xs">
            {ByFrom} - {ByTo}
          </div>
        );
      },
    },
    {
      label: "Вес,т / объём,м³",
      action: (data: any) => {
        const ByWeight = data?.ByWeight;
        const BySize = data?.BySize;
        return (
          <div className="text-xs">
            {ByWeight},т / {BySize},м³
          </div>
        );
      },
    },
    {
      label: "Дата, От / До",
      action: (data: any) => {
        const startPeriod = data?.startDate;
        const endPeriod = data?.endDate;
        return (
          <div className="text-xs flex flex-col items-center">
            <span>{FormatDateToRussian(startPeriod)}</span>
            <span>-</span>
            <span>{FormatDateToRussian(endPeriod)}</span>
          </div>
        );
      },
    },
    {
      label: "Комментарий",
      action: (data: any) => {
        const ByComment = data?.ByComment;
        return (
          <Tooltip className="w-[150px]" content={ByComment}>
            <div className="text-xs max-w-[150px] truncate cursor-pointer">
              {ByComment}
            </div>
          </Tooltip>
        );
      },
    },
    {
      label: "Действия",
      action: (data: any) => {
        return (
          <div className="flex gap-1">
            <Tooltip content="Подробнее">
              <Button
                onClick={() => handleNavigate(data.cargoId)}
                size="sm"
                isIconOnly
                color="warning"
                aria-label="Like"
              >
                <EyeIcon width={15} height={15} />
              </Button>
            </Tooltip>
            <Tooltip content="Удалить">
              <Button size="sm" isIconOnly color="danger" aria-label="Like">
                <DeleteIcon width={15} height={15} />
              </Button>
            </Tooltip>
            <Tooltip content="Редактировать">
              <Button size="sm" isIconOnly color="success" aria-label="Like">
                <EditIcon width={15} height={15} />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <CreateModal
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        filter={cargoData}
        setFilter={setCargoData}
        carId={carId}
        setCarId={setCarId}
      />
      <div className="m-auto w-[80%] h-screen mt-10">
        <div className="flex justify-between">
          <div className="w-fit flex items-end gap-2">
            <Select
              className="w-[300px]"
              labelPlacement="outside"
              placeholder="Например, Бишкек"
              radius="none"
              renderValue={() => {
                if (filter.ByFrom) {
                  return (
                    <div>
                      <span className="text-white">{filter.ByFrom.label}</span>
                    </div>
                  );
                }
                return (
                  <div>
                    <span className="text-white">Например, Бишкек</span>
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
            <Select
              labelPlacement="outside"
              className="w-[300px]"
              placeholder="Например, Каракол"
              radius="none"
              renderValue={() => {
                if (filter.ByTo) {
                  return (
                    <div>
                      <span className="text-white">{filter.ByTo.label}</span>
                    </div>
                  );
                }
                return (
                  <div>
                    <span className="text-white">Например, Каракол</span>
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
          <Select
            labelPlacement="outside"
            className="w-[250px]"
            placeholder="Например, Крытый"
            radius="none"
            selectionMode="multiple"
            fullWidth={true}
            renderValue={() => {
              if (carId.length) {
                return (
                  <div>
                    {carId.map((item: any, index: number) => (
                      <span key={index} className="text-white mr-1">
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
          <Button
            onClick={onOpenChange}
            className="bg-[#27272a]"
            endContent={<PlusIcon />}
            size="md"
          >
            Добавить груз
          </Button>
        </div>
        <div>
          <Table
            columns={COLUMNS_CUSTOMER}
            data={data.content}
            isLoading={isLoading}
            onPageChange={(e) => setPage(+e)}
            currentPage={page}
            totalPages={data.totalPages}
          />
        </div>
      </div>
    </>
  );
}
