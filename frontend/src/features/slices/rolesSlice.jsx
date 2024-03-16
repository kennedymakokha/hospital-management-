import { apiSlice } from "./apiSlice";
const USER_URL = "/api/roles";

export const rolesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRole: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),
        updateRole: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        fetchRoles: builder.query({
            query: () => `${USER_URL}`
        }),
      
        deleteRole: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const {  useDeleteRoleMutation, useFetchRolesQuery, useUpdateRoleMutation, useCreateRoleMutation } = rolesApiSlice