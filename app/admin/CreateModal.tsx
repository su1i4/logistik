"use client";

import { useGetCarsQuery, useGetPointsQuery } from "@/services/cargo.service";
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

interface Point {
  label: string;
}

interface Car {
  label: string;
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
  carId,
  setCarId,
}) => {
  const { data: Cars = [] } = useGetCarsQuery();
  const { data: Points = [] } = useGetPointsQuery();

  const changeValue = (value: any, name: string) => {
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: number) => {
    let ids = [...carId];
    if (ids.includes(value)) {
      ids = ids.filter((id) => id !== value);
    } else {
      ids.push(value);
    }
    setCarId(ids);
  };

  const [viewport, setViewport] = useState({
    longitude: 74.7661,
    latitude: 41.2044,
    zoom: 5,
  });
  const [pointA, setPointA] = useState<Coordinates | null>(null);
  const [pointB, setPointB] = useState<Coordinates | null>(null);
  const [showDirections, setShowDirections] = useState(false);

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
        setPointA({ longitude, latitude });
        setPointB(null);
        setShowDirections(false);
      }
    },
    [pointA, pointB]
  );

  const mapRef = useRef<MapboxMap | null>(null);

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
      setShowDirections(true);
    }
  }, [pointA, pointB]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="w-[400px] max-w-[400px] overflow-scroll max-h-[500px] mb-[200px]">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Добавить груз
            </ModalHeader>
            <ModalBody>
              <DateRangePicker label="Дата поставки" />
              <div className="flex items-center gap-2">
                <Select
                  className="w-full"
                  labelPlacement="outside"
                  placeholder="Откуда"
                >
                  {Points.map((item: Point, index: number) => (
                    <SelectItem key={index}>{item.label}</SelectItem>
                  ))}
                </Select>
                <Select
                  className="w-full"
                  labelPlacement="outside"
                  placeholder="Куда"
                >
                  {Points.map((item: Point, index: number) => (
                    <SelectItem key={index}>{item.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <Input type="text" placeholder="Название груза" />
              <div className="flex items-center justify-between gap-5">
                <Input type="number" placeholder="Вес,т" />
                <Input type="number" placeholder="Объём,м³" />
              </div>
              <Select
                placeholder="Тип кузова"
                selectionMode="multiple"
                fullWidth
                renderValue={() => {
                  return (
                    <div>
                      {carId.map((id: number) => (
                        <span key={id} className="text-white mr-1">
                          {Cars.find((car: Car) => car.label === id)?.label},
                        </span>
                      ))}
                    </div>
                  );
                }}
              >
                {Object.entries(Cars).map(([key, items]: [string, Car[]]) => (
                  <SelectSection key={key} showDivider title={TYPES_CARS[key]}>
                    {items.map((item: Car, itemIndex: number) => (
                      <SelectItem
                        onClick={() => handleSelectChange(item.label)}
                        key={`${key}-${itemIndex}`}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectSection>
                ))}
              </Select>
              <Textarea placeholder="Коментарии" />
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
              <Button color="primary" onPress={onClose}>
                Сохранить
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
