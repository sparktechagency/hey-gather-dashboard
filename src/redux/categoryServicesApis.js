import { baseApis } from './main/baseApis'

const categoryServicesApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    updateService: builder.mutation({
      query: (data) => {
        const { id, name } = data
        return {
          url: `/service/update/${id}`,
          method: 'PATCH',
          body: { name },
        }
      },
      invalidatesTags: ['service', 'category'],
    }),
    createService: builder.mutation({
      query: (data) => {
        return {
          url: `/service/create`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['service', 'category'],
    }),
    deleteService: builder.mutation({
      query: (data) => {
        const { id } = data

        return {
          url: `/service/delete/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: ['service', 'category'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useUpdateServiceMutation,
  useCreateServiceMutation,
  useDeleteServiceMutation,
} = categoryServicesApis
export default categoryServicesApis
