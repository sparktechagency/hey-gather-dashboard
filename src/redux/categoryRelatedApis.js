import { baseApis } from './main/baseApis'

const categoryRelatedApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: (params) => ({
        url: '/category/get-all',
        method: 'GET',
        params,
      }),
      providesTags: ['category'],
    }),
    updateCategory: builder.mutation({
      query: (data) => {
        const { id, body } = data
        return {
          url: `/category/update/${id}`,
          method: 'PATCH',
          body,
          formData: true,
        }
      },
      invalidatesTags: ['category'],
    }),
    createCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/category/create`,
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['category'],
    }),
    deleteCategory: builder.mutation({
      query: (data) => {
        const { id, body } = data

        return {
          url: `/category/delete/${id}`,
          method: 'DELETE',
          body,
        }
      },
      invalidatesTags: ['category'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryRelatedApis
export default categoryRelatedApis
