import { baseApis } from './main/baseApis'

const termsAndConditionApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: '/setting/terms-and-conditions',
        method: 'GET',
      }),
      providesTags: ['termsAndCondition'],
    }),
    postTermsAndConditions: builder.mutation({
      query: (data) => {
        return {
          url: '/setting/create',
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['termsAndCondition'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetTermsAndConditionsQuery,
  usePostTermsAndConditionsMutation,
} = termsAndConditionApis
export default termsAndConditionApis
