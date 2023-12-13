import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '1f14aba9c57msh3f2be5027e9273ep116f33jsn54a3146508c0')

      return headers
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query<any, void>({
      query: () => `charts/world`,
    }),
  }),
})

export const { useGetTopChartsQuery } = shazamCoreApi
