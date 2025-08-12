import { baseApis } from './main/baseApis'

const subscriptionsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => {
        return {
          url: '/subscription/get-all',
          method: 'GET',
        }
      },
      providesTags: ['subscription'],
    }),

    postSubscription: builder.mutation({
      query: (data) => {
        return {
          url: '/subscription/create',
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['subscription'],
    }),
    updateSubscription: builder.mutation({
      query: (data) => {
        return {
          url: '/subscription/create',
          method: 'PATCH',
          body: data,
        }
      },
      invalidatesTags: ['subscription'],
    }),
  }),
})

export const {
  useGetSubscriptionQuery,
  usePostSubscriptionMutation,
  useUpdateSubscriptionMutation,
} = subscriptionsApis

export default subscriptionsApis
