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
        editUserDetails: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.id}`,
                method: "PUT",
                body: data
            })
        }),
        fetchuser: builder.query({
            query: (id) => ({
                url: `${USER_URL}/${id}`
            })
        }),
        getuser: builder.query({
            query: () => `${USER_URL}/profile`
        }),
        getusers: builder.query({
            query: () => `${USER_URL}/role-users/all`
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: "POST",
            })
        })
    })
})

export const { useLoginMutation, useGetusersQuery, useEditUserDetailsMutation, useLogoutMutation, useRegisterMutation, useGetuserQuery, useFetchuserQuery } = usersApiSlice