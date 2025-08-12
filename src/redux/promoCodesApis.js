import { baseApis } from './main/baseApis'

const promoCodesApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPromoCodes: builder.query({
      query: ({ page }) => ({
        url: '/promo/get-all',
        method: 'GET',
        page,
      }),
      providesTags: ['promoCodes'],
    }),
    postPromoCodes: builder.mutation({
      query: (data) => {
        return {
          url: '/promo/create',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['promoCodes'],
    }),
    updatePromoCodes: builder.mutation({
      query: (data) => {
        const { id, ...formattedData } = data
        return {
          url: `/promo/update/${id}`,
          method: 'PATCH',
          body: formattedData,
        }
      },
      invalidatesTags: ['promoCodes'],
    }),
    deletePromoCodes: builder.mutation({
      query: (data) => {
        const { id } = data
        return {
          url: `/promo/delete/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['promoCodes'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPromoCodesQuery,
  usePostPromoCodesMutation,
  useUpdatePromoCodesMutation,
  useDeletePromoCodesMutation,
} = promoCodesApis
export default promoCodesApis
