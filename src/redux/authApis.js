import { baseApis } from './main/baseApis'

const authApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: data,
      }),
    }),

    verifyEmailOtp: builder.mutation({
      query: (data) => ({
        url: '/verification/verify',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/reset-password',
          method: 'POST',
          body: data,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('reset-token')}`,
          },
        }
      },
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: '/verification/create',
        method: 'POST',
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/change-password',
          method: 'POST',
          body: data,
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {
  useResendOtpMutation,
  useVerifyEmailOtpMutation,
  useSignInMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApis

export default authApis
