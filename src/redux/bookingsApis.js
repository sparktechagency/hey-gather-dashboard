import { baseApis } from './main/baseApis'

const bookingsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: () => ({
        url: '/booking/get-all',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllBookingsQuery } = bookingsApis
export default bookingsApis
