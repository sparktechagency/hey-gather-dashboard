import { baseApis } from './main/baseApis'

const usersApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: '/auth/get-all',
        method: 'GET',
        params,
      }),
      providesTags: ['users'],
    }),
    updateUserBlockType: builder.mutation({
      query: (data) => {
        const { id } = data
        return {
          url: `/auth/block/${id}`,
          method: 'PATCH',
        }
      },
      invalidatesTags: ['users'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllUsersQuery, useUpdateUserBlockTypeMutation } = usersApis
export default usersApis
