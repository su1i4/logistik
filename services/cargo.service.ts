import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/api.base-query";
import { CargoCardType, CargoQueryParams } from "@/types";
import {
  clearEmptyProps,
  arrayToCommaSeparatedString,
} from "@/utils/helpers/general";

const CargoService = createApi({
  reducerPath: "cargoApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCargo: builder.query<any, any>({
      query: ({ params, page, size, carId }) => {
        return {
          url: `cargo?page=${page}&size=${size}${carId.length ? `&carId=${arrayToCommaSeparatedString(carId)}`: ""}`,
          params: { ...clearEmptyProps(params) },
        };
      },
    }),
    getPoints: builder.query<any, void>({
      query: () => "common/COUNTRY",
    }),
    getCars: builder.query<any, void>({
      query: () => "common/CAR_BODY",
    }),
    login: builder.query<any, any>({
      query: ({body}) => {
        return {
          url: 'login',
          // method: 'GET',
          body: body
        }
      }
    }),
  }),
});

export default CargoService;

export const {
  useGetCargoQuery,
  useGetPointsQuery,
  useGetCarsQuery,
  useLazyLoginQuery
} = CargoService;
