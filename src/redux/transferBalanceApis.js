import { baseApis } from './main/baseApis'

const transferBalanceApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    postTransferBalance: builder.mutation({
      query: (data) => {
        return {
          url: '/payment/transfer-balance',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['payVendor'],
    }),
  }),
  overrideExisting: false,
})

export const { usePostTransferBalanceMutation } = transferBalanceApis
export default transferBalanceApis
