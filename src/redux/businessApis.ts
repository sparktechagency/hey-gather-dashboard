import { baseApis } from './main/baseApis'

const businessApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getBusinessData: builder.query<any, void>({
      query: (data) => {
        return {
          url: '/business-service/get-all',
          method: 'GET',
          body: data,
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const { useGetBusinessDataQuery } = businessApis

export default businessApis
