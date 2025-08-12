import { baseApis } from './main/baseApis'

const notificationsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: '/notification/get-all',
        method: 'GET',
      }),
      providesTags: ['notifications'],
    }),
    readNotifications: builder.mutation({
      query: (data) => {
        const { id } = data
        return {
          url: `/notification/read/${id}`,
          method: 'PATCH',
        }
      },
      invalidatesTags: ['notifications'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllNotificationsQuery, useReadNotificationsMutation } =
  notificationsApis
export default notificationsApis
