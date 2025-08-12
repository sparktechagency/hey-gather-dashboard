import { baseApis } from './main/baseApis'

const earningsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: () => {
        return {
          url: '/payment/get-all',
          method: 'GET',
        }
      },
    }),
    getEarningsChart: builder.query({
      query: (params) => {
        return {
          url: '/dashboard/get-overview',
          method: 'GET',
          params,
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useGetEarningsQuery, useGetEarningsChartQuery } = earningsApis

export default earningsApis
