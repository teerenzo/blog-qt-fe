import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../../utils/handlers";

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/v1`;

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  //   credentials: "include",
});

export const Api = createApi({
  reducerPath: "loginApi",
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
  baseQuery,
  endpoints: (builder) => ({}),
});
