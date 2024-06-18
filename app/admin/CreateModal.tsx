"use client";

import {
  useGetCarsQuery,
  useGetPointsQuery,
  usePostCargoMutation,
} from "@/services/cargo.service";
import { TYPES_CARS } from "@/utils/helpers/general";
import {
  Button,
  DateRangePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  SelectSection,
  Textarea,
} from "@nextui-org/react";
import { useCallback, useEffect, useRef, useState } from "react";

import Map, { Marker, Popup, ViewStateChangeEvent } from "react-map-gl";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYTZ1eGE0IiwiYSI6ImNscGhibWM5aTA1c28ycm1oNGdjYTYybnQifQ.JFaTlYbkSMf395KgTMMkSQ";

interface CreateModalProps {
  isOpen: boolean;
  filter: any;
  setFilter: React.Dispatch<React.SetStateAction<any>>;
  onOpenChange: (isOpen: boolean) => void;
  carId: number[];
  setCarId: React.Dispatch<React.SetStateAction<number[]>>;
}

interface Coordinates {
  longitude: number;
  latitude: number;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  filter,
  setFilter,
  onOpenChange,
}) => {
  const { data: Cars = [] } = useGetCarsQuery();
  const { data: Points = [] } = useGetPointsQuery();

  const [postCargo] = usePostCargoMutation();

  const changeValue = (value: any, name: string) => {
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: number) => {
    let ids = [...filter.carId];
    if (ids.includes(value)) {
      ids = ids.filter((id) => id !== value);
    } else {
      ids.push(value);
    }
    setFilter({ ...filter, carId: ids });
  };

  const [viewport, setViewport] = useState({
    longitude: 74.7661,
    latitude: 41.2044,
    zoom: 5,
  });
  const [pointA, setPointA] = useState<Coordinates | null>(null);
  const [pointB, setPointB] = useState<Coordinates | null>(null);

  const handleViewportChange = useCallback((event: ViewStateChangeEvent) => {
    const { longitude, latitude, zoom } = event.viewState;
    setViewport({
      longitude,
      latitude,
      zoom,
    });
  }, []);

  const handleMapClick = useCallback(
    (event: mapboxgl.MapLayerMouseEvent) => {
      const [longitude, latitude] = event.lngLat.toArray();
      if (!pointA) {
        setPointA({ longitude, latitude });
      } else if (!pointB) {
        setPointB({ longitude, latitude });
      } else {
        setPointA((prevState) => ({ longitude, latitude }));
        setPointB((prevState) => null);
      }
    },
    [pointA, pointB]
  );

  const mapRef = useRef<MapboxMap | null | any>(null);

  useEffect(() => {
    if (mapRef.current && pointA && pointB) {
      const map = mapRef.current;
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
      });
      map.addControl(directions, "top-left");
      directions.setOrigin([pointA.longitude, pointA.latitude]);
      directions.setDestination([pointB.longitude, pointB.latitude]);
    }
  }, [pointA, pointB]);

  const handlePost = async () => {
    try {
      await postCargo({});
    } catch (error) {}
  };

  return (
    <Modal placement="center" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="w-[400px] max-w-[400px] overflow-scroll max-h-[500px] z-[99999]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Добавить груз
            </ModalHeader>
            <ModalBody>
              <DateRangePicker />
              <div className="flex items-center gap-2">
                <Select
                  className="w-full"
                  labelPlacement="outside"
                  placeholder="Откуда"
                >
                  {Points.map((item: any, index: number) => (
                    <SelectItem
                      onClick={() =>
                        changeValue(
                          item.value === filter.ByFrom.value ? "" : item,
                          "ByFrom"
                        )
                      }
                      key={index}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  className="w-full"
                  labelPlacement="outside"
                  placeholder="Куда"
                >
                  {Points.map((item: any, index: number) => (
                    <SelectItem
                      onClick={() =>
                        changeValue(
                          item.value === filter.ByTo.value ? "" : item,
                          "ByTo"
                        )
                      }
                      key={index}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <Input
                value={filter.productName}
                onChange={(e) => changeValue(e.target.value, "productName")}
                type="text"
                placeholder="Название груза"
              />
              <div className="flex items-center justify-between gap-5">
                <Input
                  value={filter.ByWeight}
                  onChange={(e) => changeValue(e.target.value, "ByWeight")}
                  type="number"
                  placeholder="Вес,т"
                />
                <Input
                  value={filter.BySize}
                  onChange={(e) => changeValue(e.target.value, "BySize")}
                  type="number"
                  placeholder="Объём,м³"
                />
              </div>
              <Select
                placeholder="Тип кузова"
                selectionMode="multiple"
                fullWidth
                renderValue={() => {
                  return (
                    <div>
                      {filter.carId.map((item: any, index: number) => (
                        <span key={index} className="mr-1">
                          {item.label},
                        </span>
                      ))}
                    </div>
                  );
                }}
              >
                {Object.entries(Cars).map(([key, items]: [any, any]) => (
                  <SelectSection key={key} showDivider title={TYPES_CARS[key]}>
                    {items.map((item: any, itemIndex: number) => (
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
              <Textarea
                value={filter.ByComment}
                onChange={(e) => changeValue(e.target.value, "ByComment")}
                placeholder="Коментарии"
              />
              <div className="max-w-[400px] max-h-[300px] h-[300px] rounded-md overflow-hidden">
                <Map
                  ref={mapRef}
                  style={{
                    maxWidth: "400px",
                    maxHeight: "400px",
                    width: "100%",
                    height: "100%",
                    borderRadius: "6px",
                  }}
                  initialViewState={viewport}
                  mapStyle="mapbox://styles/a6uxa4/clpish7f200ng01pjdlv8fkcs"
                  onMove={handleViewportChange}
                  onClick={handleMapClick}
                >
                  {pointA && (
                    <Marker
                      longitude={pointA.longitude}
                      latitude={pointA.latitude}
                    >
                      <div
                        style={{
                          backgroundColor: "red",
                          borderRadius: "50%",
                          width: "10px",
                          height: "10px",
                        }}
                      />
                      <Popup
                        longitude={pointA.longitude}
                        latitude={pointA.latitude}
                        closeButton={false}
                      >
                        Point A
                      </Popup>
                    </Marker>
                  )}
                  {pointB && (
                    <Marker
                      longitude={pointB.longitude}
                      latitude={pointB.latitude}
                    >
                      <div
                        style={{
                          backgroundColor: "blue",
                          borderRadius: "50%",
                          width: "10px",
                          height: "10px",
                        }}
                      />
                      <Popup
                        longitude={pointB.longitude}
                        latitude={pointB.latitude}
                        closeButton={false}
                      >
                        Point B
                      </Popup>
                    </Marker>
                  )}
                </Map>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Закрыть
              </Button>
              <Button color="primary" onPress={handlePost}>
                Сохранить
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
