import React, { useState } from 'react'
import Layout from '../container/layout'
import Table, { TBody, TH, TableContainer, TableHead, TableTitle } from '../container/table';
import moment from 'moment';
import Button, { ButtonSM } from '../container/Button';
import Modal from '../container/modal';
import InputContainer, { SelectInput } from '../container/input';
import { Link } from 'react-router-dom';
import { PatientsTableHead } from './../data.json'

import { useFetchPatientsQuery, useCreatePatientMutation, useDeletePatientMutation, useUpdatePatientMutation } from '../features/slices/patientSlice';
import { toast } from 'react-toastify';
import { _calculateAge } from '../helpers';
function Patients() {


    const [showModal, setShowModal] = useState(false);

    const [item, setitem] = useState({ firstName: "", dob: "", gender: "", lastName: "", ID_no: "", phone: '', email: "" });

    const { data, refetch, isFetching } = useFetchPatientsQuery({})

    const [createPatient] = useCreatePatientMutation();
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
                await createPatient(item).unwrap();
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
                <TableTitle tableTitle="patients " />
                <div className='flex align-end float-right m-2 '> <Button
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                    </svg>}
                    primary title="New" onClick={() => { setShowModal(true) }} /></div>
                <Table>
                    <TableHead>
                        {PatientsTableHead.map((head, i) => (<TH key={i} title={head} />))}
                    </TableHead>
                    <TBody>
                        {data?.map(person => (
                            <tr key={person?._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">

                                        <Link
                                            to={`/patients/${person?.name?.replace(/\s+/g, '')
                                                }`} state={{ details: person }}

                                        >
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{person?.user_id?.name}</div>
                                                <div className="text-xs text-gray-500">{person?.user_id?.email}</div>
                                            </div>
                                        </Link>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{person?.ID_no}</div>

                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className="px-2 inline-flex text-sm leading-5
      font-semibold rounded-full "
                                    >
                                        {person?.user_id?.phone}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className="px-2 inline-flex text-sm leading-5
      font-semibold rounded-full "
                                    >
                                        {person?.gender}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className="px-2 inline-flex text-sm leading-5
      font-semibold rounded-full "
                                    >
                                        {_calculateAge(person?.dob)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {moment().format('YYYY-MM-DD')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  flex  gap-x-1 text-sm font-medium">
                                    <div className="text-indigo-600 hover:text-indigo-900">
                                        <ButtonSM primary title="Edit" onClick={() => { setitem(person); setShowModal(true); }} height={2} width={8} />
                                    </div>
                                    <div className="text-indigo-600 hover:text-indigo-900">
                                        <ButtonSM danger title="Delete" onClick={() => { deleteHandler(person?._id); }} height={2} width={8} />
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
                title={item?._id !== undefined && item?._id !== null && item?._id !== "" ? `Edit ${item.firstName} ${item.lastName}` : "Patients General Data"}
                body={
                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                        <div className='flex w-full  space-between'>
                            <div className='w-1/2'>
                                <InputContainer value={item?.firstName} required name="firstName" label="First Name" placeholder="First Name" onChange={(e) => changeInput(e)} />
                            </div>
                            <div className='w-1/2'>
                                <InputContainer required value={item?.lastName} name="lastName" label="Last Name" placeholder="Last Name" onChange={(e) => changeInput(e)} />
                            </div>
                        </div>
                        {/* <div className='flex w-full  space-between'>
                            <div className='w-1/2'>
                                <InputContainer name="address" value={item?.address} label="Address" placeholder="Address" onChange={(e) => changeInput(e)} />
                            </div>
                            <div className='w-1/2'>
                                <InputContainer name="city" value={item?.city} required label="city" placeholder="city" onChange={(e) => changeInput(e)} />
                            </div>
                        </div> */}
                        <div className='flex w-full  space-between'>
                            <div className='w-1/2'>
                                <InputContainer name="phone" value={item?.phone} type="numeric" required label="phone" placeholder="phone" onChange={(e) => changeInput(e)} />
                            </div>
                            <div className='w-1/2'>
                                <InputContainer value={item?.email} name="email" type="email" label="email" placeholder="email" onChange={(e) => changeInput(e)} />
                            </div>
                        </div>

                        <div className='flex w-full  space-between'>
                            <div className='w-1/2'>
                                <SelectInput
                                    label="Gender"
                                    placeholder="Start typing Dept Name"
                                    options={[
                                        { label: 'Male', value: 'male' },
                                        { label: 'Female', value: 'female' },
                                        { label: 'Unwilling to disclose', value: 'Unwilling to disclose' },
                                    ]}
                                    // value={item.userId}
                                    onChange={(e) => {
                                        setitem((prevState) => ({
                                            ...prevState,
                                            gender: e.target.value,
                                        }));

                                    }}
                                />
                            </div>
                            <div className='w-1/2'>
                                <InputContainer value={item?.email} name="dob" type="date" label="Date of birth" placeholder="email" onChange={(e) => changeInput(e)} />
                            </div>
                        </div>
                        <div className='flex w-full  space-between'>
                            <div className='w-1/2'>
                                <InputContainer name="ID_no" value={item?._ID_no} type="text" required label="Identification Number" onChange={(e) => changeInput(e)} />
                            </div>

                        </div>

                    </form>
                }
            />
        </Layout>
    )
}

export default Patients