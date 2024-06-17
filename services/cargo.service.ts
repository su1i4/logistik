import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/api.base-query";
import {
  clearEmptyProps,
  arrayToCommaSeparatedString,
} from "@/utils/helpers/general";

const CargoService = createApi({
  reducerPath: "cargoApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['cargo'],
  endpoints: (builder) => ({
    getCargo: builder.query<any, any>({
      query: ({ params, page, size, carId }) => {
        return {
          url: `cargo?page=${page}&size=${size}${
            carId.length ? `&carId=${arrayToCommaSeparatedString(carId)}` : ""
          }`,
          params: { ...clearEmptyProps(params) },
        };
      },
      providesTags: ['cargo']
    }),
    getOneCargo: builder.query<any, any>({
      query: (cargoId) => `cargo/${cargoId}`,
    }),
    getPoints: builder.query<any, void>({
      query: () => "common/COUNTRY",
    }),
    getCars: builder.query<any, void>({
      query: () => "common/CAR_BODY",
    }),
    deleteCargo: builder.mutation<any, any>({
      query: (cargoId) => {
        return {
          url: `cargo/${cargoId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ['cargo']
    }),
    putCargo: builder.mutation<any, any>({
      query: ({ cargoId, body }) => {
        return {
          url: `cargo/${cargoId}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ['cargo']
    }),
    postCargo: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "cargo",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ['cargo']
    }),
    login: builder.query<any, any>({
      query: ({ body }) => {
        return {
          url: "login",
          method: "POST",
          body: body,
        };
      },
    }),
  }),
});

export default CargoService;

export const {
  useGetCargoQuery,
  useGetPointsQuery,
  useGetCarsQuery,
  useLazyLoginQuery,
  useGetOneCargoQuery,
  useDeleteCargoMutation,
  usePutCargoMutation,
  usePostCargoMutation
} = CargoService;
