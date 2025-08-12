import { baseApis } from './main/baseApis'

const privacyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => {
        return {
          url: '/setting/privacy-policy',
          method: 'GET',
        }
      },
      providesTags: ['privacyPolicy'],
    }),

    postPrivacy: builder.mutation({
      query: (data) => {
        return {
          url: '/setting/create',
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['privacyPolicy'],
    }),
  }),
})

export const { useGetPrivacyQuery, usePostPrivacyMutation } = privacyApis

export default privacyApis
