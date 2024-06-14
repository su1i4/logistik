import { FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://backend.logistickg.com',
    prepareHeaders(headers) {
        if (!headers.has("Content-Type")) {
            headers.set("Content-Type", "application/json");
        }
        return headers;
    },
});

export const baseQueryWithReauth = async (
    args: FetchArgs | string,
    api: any,
    extraOptions: any
) => {
    const result: any = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403 || result?.response?.status === 403) {
        // Handle 403 Forbidden errors
    } else if (result?.error?.status === 401 || result?.response?.status === 401) {
        // Handle 401 Unauthorized errors
    }
    return result;
};
