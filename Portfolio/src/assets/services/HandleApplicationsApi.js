import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const HandleApplicationsApi = createApi({
  reducerPath: "HandleApplicationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5237/api/ApplicationsApi/",
  }),
  endpoints: (builder) => ({
    GetApplication: builder.query({
      query: () => "GetApplications",
    }),
    CreateApplication: builder.mutation({
      query: (NewApplication) => ({
        url: "InsertApplication",
        method: "POST",
        body: NewApplication,
      }),
    }),
    UpdateApplicationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `UpdateApplicationStatus`,
        method: "PUT",
        params: { id, status }, // Sending as query parameters
      }),
    }),
  }),
});

export const {
  useGetApplicationQuery,
  useCreateApplicationMutation,
  useUpdateApplicationStatusMutation, // Add this
} = HandleApplicationsApi;
