import { apiSlice } from "./apiSlice";
const USER_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/auth`,
                method: "POST",
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),
        fetchuser: builder.query({
            query: ({id}) => ({
                url: `${USER_URL}/profile/${id}`
            })
        }),
        getuser: builder.query({
            query: () => `${USER_URL}/profile`
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: "POST",
            })
        })
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useGetuserQuery, useFetchuserQuery } = usersApiSlice