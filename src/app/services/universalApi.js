// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../constants/baseUrl";

// Define a service using a base URL and expected endpoints
export const universalApi = createApi({
  reducerPath: "universalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
  }),
  endpoints: (builder) => ({
    getCallWithoutAuth: builder.mutation({
      query: ({ url }) => {
        return {
          url: `${url}`,
          method: "GET",
        };
      },
    }),
    postCallWithoutAuth: builder.mutation({
      query: ({ url, body }) => {
        return {
          url: `${url}`,
          method: "POST",
          body: body,
        };
      },
    }),
    getCallWithAuth: builder.mutation({
      query: ({ url, accessToken }) => {
        return {
          url: `${url}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
    postCallWithAuth: builder.mutation({
      query: ({ url, body, accessToken }) => {
        return {
          url: `${url}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: body,
        };
      },
    }),
    putCallWithAuth: builder.mutation({
      query: ({ url, body, accessToken }) => {
        return {
          url: `${url}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: body,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCallWithoutAuthMutation,
  usePostCallWithoutAuthMutation,
  useGetCallWithAuthMutation,
  usePostCallWithAuthMutation,
  usePutCallWithAuthMutation,
} = universalApi;
