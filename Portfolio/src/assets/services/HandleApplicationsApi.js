import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const HandleApplicationsApi = createApi({
    reducerPath: 'HandleApplicationsApi',
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5237/api/ApplicationsApi/",
    }),
    endpoints: (builder) => ({
        GetApplication: builder.query({query:() => "GetApplications"}),
        CreateApplication: builder.mutation({
            query:(NewApplication) => ({
                url: "InsertApplication",
                method: "POST",
                body: NewApplication,
            })
        }),
    })
})

export const {useGetApplicationQuery,useCreateApplicationMutation} = HandleApplicationsApi;