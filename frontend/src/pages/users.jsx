import React, { useState } from 'react'
import Layout from '../container/layout'
import Table, { TBody, TH, TableContainer, TableHead, TableTitle } from '../container/table';
import moment from 'moment';
import Button, { ButtonSM } from '../container/Button';
import Modal from '../container/modal';
import InputContainer, { SelectInput } from '../container/input';
import { Link } from 'react-router-dom';
import { UserTableHead } from '../data.json'
import { useGetusersQuery, useRegisterMutation } from './../features/slices/usersApiSlice'
import { useFetchPatientsQuery, useCreatePatientMutation, useDeletePatientMutation, useUpdatePatientMutation } from '../features/slices/patientSlice';
import { toast } from 'react-toastify';
import { SelectOptions, _calculateAge } from '../helpers';
import Tab from '../container/tabs';
import { useFetchRolesQuery } from '../features/slices/rolesSlice';
function Users() {
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState("");
    const [tabs, setTabs] = useState([
        { value: "", title: "all", label: "Select a role", state: true },
        { value: "Nurse", title: "Nurse", label: "Nurse", state: false },
        { value: "Lab_tech", title: "Lab Techs", label: "Lab Techs", state: false },
        { value: "Dr", title: "doctors", label: "Doctors", state: false },
        { value: "receptionist", title: "receptionist", label: "Receptionist", state: false }
    ])
    const [item, setitem] = useState({ name: "", ID_no: "", phone: '', email: "", role: "" });
    const { data, refetch, isFetching } = useGetusersQuery({})
    const { data: roles } = useFetchRolesQuery()
    let users = []
    if (filter !== "") {
        users = data?.filter(word => word?.role?.name === filter)
    } else { users = data }
    const [createUser] = useRegisterMutation();
    const [updatePatient] = useUpdatePatientMutation();
    const [deletePatient] = useDeletePatientMutation();
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
                await updatePatient(item).unwrap();
                refetch()
                closeModal()
                toast('Created Succesfully')
            } else {
                if (filter !== "") {
                    item.role = filter
                }
                item.password = item.ID_no
                await createUser(item).unwrap();
                refetch()
                closeModal()
                toast('Created Succesfully')
            }

        } catch (error) {
            toast(error?.data?.message || error.message)
        }
    }
    const handleTab = (title) => {
        let newTab = []
        tabs.forEach(tab => {
            if (tab.title === title) {
                let v = { ...tab, state: true }
                newTab.push(v)
                setFilter(tab.value)
                return v;
            }
            else {
                let v = { ...tab, state: false }
                newTab.push(v)
                return v;
            }

        });

        setTabs(newTab)

    }
    const deleteHandler = async (id) => {
        try {
            await deletePatient(id).unwrap();
            refetch()
            toast(`${item.lastName} Deleted Succesfully`)
        } catch (error) {
            console.log("first", error)
        }
    }

    return (
        <Layout>
            <TableContainer isFetching={isFetching}>
                <div className='flex items-center justify-center'>
                    <TableTitle tableTitle={filter === "" ? " All system users" : filter} />
                </div>

                <Tab data={tabs} onChange={handleTab} />
                <div className='flex align-end float-right m-2 '> <Button
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                    </svg>}
                    primary title="New" onClick={() => { setShowModal(true) }} /></div>

                <Table>

                    <TableHead>
                        {UserTableHead.map((head, i) => (<TH key={i} title={head} />))}
                    </TableHead>

                    <TBody>
                        {users?.map(person => (
                            <tr key={person._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">

                                        <Link
                                            to={`/users/${person.name.replace(/\s+/g, '')
                                                }`} state={{ details: person }}

                                        >
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                                <div className="text-sm text-gray-500">{person.email}</div>
                                            </div>
                                        </Link>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{person.ID_no}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full " >
                                        {person?.phone}
                                    </span>
                                </td>


                                <td className="px-6 py-4 whitespace-nowrap  flex:wrap flex   gap-x-1 text-sm font-medium">
                                    <div className="text-indigo-600 hover:text-indigo-900">
                                        <ButtonSM primary title="Edit" onClick={() => { setitem(person); setShowModal(true); }} height={2} width={8} />
                                    </div>
                                    {person?.role?.name === "Nurse" && <div className="text-indigo-600 hover:text-indigo-900 flex ">
                                        <ButtonSM secondary title="Assign station" onClick={() => { deleteHandler(person._id); }} height={2} width={8} />
                                    </div>}
                                    <div className="text-indigo-600 hover:text-indigo-900">
                                        <ButtonSM danger title="Delete" onClick={() => { deleteHandler(person._id); }} height={2} width={8} />
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
                title={item?._id !== undefined && item?._id !== null && item?._id !== "" ? `Edit ${item.name} ` : `Add New ${filter}`}
                body={
                    <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 w-full">
                        <div className='flex w-full  space-between'>
                            <div className='w-full'>
                                <InputContainer value={item?.name} required name="name" label="Name" placeholder="Full names " onChange={(e) => changeInput(e)} />
                            </div>
                        </div>

                        <div className='flex w-full  space-between'>
                            <div className='w-full'>
                                <InputContainer name="phone" value={item?.phone} type="numeric" required label="phone" placeholder="phone" onChange={(e) => changeInput(e)} />
                            </div>

                        </div>
                        <div className='flex w-full  space-between'>
                            <div className='w-full'>
                                <InputContainer name="email" value={item?.email} type="email" required label="email" placeholder="Email address" onChange={(e) => changeInput(e)} />
                            </div>
                        </div>
                        <div className='flex w-full  space-between'>
                            <div className='w-full'>
                                <InputContainer name="ID_no" value={item?._ID_no} type="text" required label="Identification Number" onChange={(e) => changeInput(e)} />
                            </div>

                        </div>
                        {filter === "" && <div className='flex w-full  space-between'>
                            <div className='w-full'>
                                <SelectInput
                                    label="Role"
                                    placeholder="Start typing Dept Name"
                                    // options={tabs}
                                    options={SelectOptions({ array: roles, name: "role" })}
                                    // value={item.userId}
                                    onChange={(e) => {
                                        setitem((prevState) => ({
                                            ...prevState,
                                            role: e.target.value,
                                        }));

                                    }}
                                />
                            </div>

                        </div>}


                    </form>
                }
            />
        </Layout>
    )
}

export default Users