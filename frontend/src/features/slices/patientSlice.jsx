import { apiSlice } from "./apiSlice";
const USER_URL = "/api/patients";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPatient: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),
        updatePatient: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        fetchPatients: builder.query({
            query: (e) => `${USER_URL}?${e}`
        }),
        fetchPatientsByID: builder.query({
            query: (id) => `${USER_URL}/${id}`
        }),
        deletePatient: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })
    })
})

export const { useCreatePatientMutation, useDeletePatientMutation, useFetchPatientsByIDQuery, useFetchPatientsQuery, useUpdatePatientMutation } = usersApiSlice