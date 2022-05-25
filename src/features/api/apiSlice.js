import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {getNetworkHost} from '../../constants'

// TODO get chain dynamically -> westend/kusama/polkadot

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `//${getNetworkHost("westend")}/api/v1` }),
  tagTypes: ['Pool'],
  endpoints: (builder) => ({
    getPool: builder.query({
      query: (poolId) => `/pool/${poolId}`,
      providesTags: (result, error, arg) => [{ type: 'Pool', id: arg }],
    }),
    getPoolNominees: builder.query({
      query: (poolId) => `/pool/${poolId}/nominees`,
      providesTags: (result, error, arg) => [{ type: 'Pool', id: arg }],
    }),
  }),
})

export const {
  useGetPoolQuery,
  useGetPoolNomineesQuery,
} = apiSlice
