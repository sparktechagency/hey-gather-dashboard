import { baseApis } from './main/baseApis'

const privacyApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getProfileData: builder.query({
      query: () => ({
        url: '/auth/profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),

    postProfileData: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/update-profile',
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['Profile'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetProfileDataQuery, usePostProfileDataMutation } =
  privacyApis
export default privacyApis
