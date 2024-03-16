import React, { useState } from 'react'
import Layout from '../container/layout'
import Table, { TBody, TH, TableContainer, TableHead, TableTitle } from '../container/table';
import moment from 'moment';
import Button, { ButtonSM } from '../container/Button';
import Modal from '../container/modal';
import InputContainer, { SelectInput } from '../container/input';
import { Link } from 'react-router-dom';
import { RolesTableHead } from '../data.json'

import { useDeleteRoleMutation, useFetchRolesQuery, useUpdateRoleMutation, useCreateRoleMutation } from '../features/slices/rolesSlice';
import { toast } from 'react-toastify';
import { _calculateAge } from '../helpers';
import { debounce } from '../helpers/debounce';
function Roles() {
    const [showModal, setShowModal] = useState(false);
    const [item, setitem] = useState({ name: "", dispay_name: "", });
    const { data, refetch, isFetching } = useFetchRolesQuery()
    const [createRole] = useCreateRoleMutation();
    const [updateRole] = useUpdateRoleMutation();
    const [deleteRole] = useDeleteRoleMutation();
    const changeInput = (e) => {
        const { name, value } = e.target;
        setitem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const closeModal = () => {
        setitem({})
        setShowModal(false)
    }
    const submit = async () => {
        try {
            if (item._id) {
                await updateRole(item).unwrap();
                refetch()
                closeModal()
                toast('Updated Succesfully')
            } else {
                await createRole(item).unwrap();
                refetch()
                closeModal()
                toast('Created Succesfully')
            }

        } catch (error) {
            toast("error creating I=User ")
            console.log(error)
        }
    }

    const deleteHandler = async (id) => {
        try {
            await deleteRole(id).unwrap();
            refetch()
            toast(`${item.name} Deleted Succesfully`)
        } catch (error) {
            console.log("first", error)
        }
    }

    return (
        <Layout>
            <TableContainer isFetching={isFetching}>
                <TableTitle tableTitle="Roles" />
                <div className='flex justify-end  float-right  m-2 '>
                    <Button
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>}
                        primary title="New" onClick={() => { setShowModal(true) }} /></div>
                <Table>
                    <TableHead>
                        {RolesTableHead.map((head, i) => (<TH key={i} title={head} />))}
                    </TableHead>
                    <TBody>
                        {data?.map(rol => (
                            <tr key={rol?._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{rol?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{rol?.display_name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  flex  gap-x-1 text-sm font-medium">
                                    <div className="text-indigo-600 hover:text-indigo-900">
                                        <ButtonSM primary title="Edit" onClick={() => { setitem(rol); setShowModal(true); }} height={2} width={8} />
                                    </div>
                                    <div className="text-indigo-600 hover:text-indigo-900">
                                        <ButtonSM danger title="Delete" onClick={() => { deleteHandler(rol?._id); }} height={2} width={8} />
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </TBody>
                </Table>
            </TableContainer>
            <Modal
                showModal={showModal}
                closeModal={closeModal}
                item={item}
                submit={submit}
                buttontitle={item?._id !== undefined && item?._id !== null && item?._id !== "" ? `Update` : "Save"}
                title={item?._id !== undefined && item?._id !== null && item?._id !== "" ? `Edit ${item.name} ` : "Add new Role "}
                body={
                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                        <div className='flex w-full flex-col  space-between'>
                            <div className='w-full '>
                                <InputContainer name="name" value={item?.name} type="text" required label="Name" placeholder="Name" onChange={(e) => changeInput(e)} />
                            </div>
                            <div className='w-full'>
                                <InputContainer value={item?.dispay_name} name="dispay_name" type="text" label="Display Name" placeholder="dispay name" onChange={(e) => changeInput(e)} />
                            </div>
                        </div>
                    </form>
                }
            />
        </Layout>
    )
}

export default Roles