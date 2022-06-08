import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { selectChain } from '../chain/chainSlice'
import { getNetworkHost } from '../../constants'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `//`,
})

const dynamicBaseQuery = async (args, api, extraOptions) => {
  const chainName = selectChain(api.getState())
  // gracefully handle scenarios where data to generate the URL is missing
  if (!chainName) {
    return {
      error: {
        status: 400,
        statusText: 'Bad Request',
        data: 'No chain selected',
      },
    }
  }

  // construct a dynamically generated portion of the url
  const adjustedUrl = `${getNetworkHost(chainName)}/api/v1`
  const adjustedArgs =
    typeof args === 'string' ? `${adjustedUrl}${args}` : { ...args, url: adjustedUrl }

  // provide the amended url and other params to the raw base query
  return rawBaseQuery(adjustedArgs, api, extraOptions)
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: dynamicBaseQuery,
  tagTypes: ['Pool'],
  endpoints: (builder) => ({
    getApiInfo: builder.query({
      query: () => '',
    }),
    getPool: builder.query({
      query: (poolId) => `/pool/${poolId}`,
      providesTags: (result, error, arg) => [{ type: 'Pool', id: arg }],
    }),
    getPoolNominees: builder.query({
      query: (poolId) => `/pool/${poolId}/nominees`,
      providesTags: (result, error, arg) => [{ type: 'Pool', id: arg }],
    }),
    getPoolNomination: builder.query({
      query: (poolId) => `/pool/${poolId}/nomination`,
      providesTags: (result, error, arg) => [{ type: 'Pool', id: arg }],
    }),
  }),
})

export const {
  useGetApiInfoQuery,
  useGetPoolQuery,
  useGetPoolNomineesQuery,
  useGetPoolNominationQuery,
} = apiSlice
