import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from '../api/api.base-query'
import { CargoCardType, CargoQueryParams } from "@/types";

const CargoService = createApi({
  reducerPath: "cargoApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCargo : builder.query<any, CargoQueryParams>({
      query: ({page, size}) => `cargo?page=${page}&size=${size}`,
    }),
    getPoints: builder.query<any, void>({
      query: () => 'common/COUNTRY'
    })
  }),
});

export default CargoService;

export const { useGetCargoQuery, useGetPointsQuery } =
  CargoService;