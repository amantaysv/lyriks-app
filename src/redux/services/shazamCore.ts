import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface CustomError {
  status: number
  data: {
    message: string
  }
}

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '!f14aba9c57msh3f2be5027e9273ep116f33jsn54a3146508c0')

      return headers
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, CustomError>,
  endpoints: (builder) => ({
    getTopCharts: builder.query<any, void>({
      query: () => `charts/world`,
    }),
  }),
})

export const { useGetTopChartsQuery } = shazamCoreApi
