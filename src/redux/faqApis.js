import { baseApis } from './main/baseApis'

const faqApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaq: builder.query({
      query: () => ({
        url: '/faq/get-all',
        method: 'GET',
      }),
      providesTags: ['faq'],
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: '/faq/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['faq'],
    }),
    updateFaq: builder.mutation({
      query: (data) => {
        const { id, ...body } = data
        return {
          url: `/faq/update/${id}`,
          method: 'PATCH',
          body,
        }
      },
      invalidatesTags: ['faq'],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['faq'],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApis

export default faqApis
