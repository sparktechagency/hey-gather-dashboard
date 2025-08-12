import { baseApis } from './main/baseApis'

const vendorApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendors: builder.query({
      query: () => ({
        url: '/business-service/get-all',
        method: 'GET',
      }),
      providesTags: ['vendors'],
    }),
    updateVendorBlockType: builder.mutation({
      query: (data) => {
        const { id } = data
        return {
          url: `/auth/block/${id}`,
          method: 'PATCH',
        }
      },
      invalidatesTags: ['vendors'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllVendorsQuery, useUpdateVendorBlockTypeMutation } =
  vendorApis
export default vendorApis
