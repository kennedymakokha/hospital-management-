import React, { useState } from 'react'
import Layout from '../container/layout'
import Table, { TBody, TH, TableContainer, TableHead, TableTitle } from '../container/table';
import moment from 'moment';
import Button, { ButtonSM } from '../container/Button';
import Modal from '../container/modal';
import InputContainer, { SelectInput } from '../container/input';
import { Link } from 'react-router-dom';
import { DrugTableHead } from '../data.json'
import { useFetchPatientsQuery, useCreatePatientMutation, useDeletePatientMutation, useUpdatePatientMutation } from '../features/slices/patientSlice';
import { toast } from 'react-toastify';
import { _calculateAge } from '../helpers';
import { debounce } from '../helpers/debounce';
import { useSelector } from 'react-redux';
import { useFetchMedsQuery } from '../features/slices/drugsSlice';

function Pharmacy() {


    const [showModal, setShowModal] = useState(false);
    const [searchKey, setsearchKey] = useState("");
    const [item, setitem] = useState({ firstName: "", dob: "", gender: "", lastName: "", ID_no: "", phone: '', email: "" });
    const { userInfo } = useSelector((state) => state.auth)
    const { data, refetch, isFetching } = useFetchMedsQuery(searchKey)
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
    const search = async (e) => {
        setsearchKey(e.target.value)
        refetch()
        // debounce(() => refetch(), 5000);


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
                <TableTitle tableTitle="Drugs " />
                <div className='flex justify-between items-center m-2 '>
                    <InputContainer value={searchKey} name="name" placeholder="Search "
                        onChange={(e) => debounce(search(e), 1000)}
                    />

                    {userInfo.role === "Admin" && <Button
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>}
                        primary title="New Drug" onClick={() => { setShowModal(true) }} />}
                </div>
                <Table>
                    <TableHead>
                        { DrugTableHead.map((head, i) => (<TH key={i} title={head} />))}
                    </TableHead>
                    <TBody>
                        {data?.map((drug, i) => (
                            <tr key={drug?._id}>
                                <td className='w-[5px]'> <div className="text-sm  items-center justify-center flex font-medium text-gray-900 ">{i + 1}</div></td>
                                <td className=" py-2 whitespace-nowrap">


                                    <div className="text-sm font-medium text-gray-900">{drug?.name}</div>

                                </td>
                                {userInfo.role === "Admin" ? <td className="px-6 py-2 whitespace-nowrap  flex  gap-x-1 text-sm font-medium">
                                    <div className="text-indigo-600 hover:text-indigo-900">
                                        <ButtonSM primary title="Edit" onClick={() => { setitem(drug); setShowModal(true); }} height={2} width={8} />
                                    </div>
                                    <div className="text-indigo-600 hover:text-indigo-900">
                                        <ButtonSM danger title="Delete" onClick={() => { deleteHandler(drug?._id); }} height={2} width={8} />
                                    </div>
                                </td> : <td></td>}
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
                title={item?._id !== undefined && item?._id !== null && item?._id !== "" ? `Edit ${item.name} ` : "New Drug"}
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
                                        { label: '', value: 'Select gender' },
                                        { label: 'Male', value: 'male' },
                                        { label: 'Female', value: 'female' },
                                        { label: 'Unwilling to disclose', value: 'Unwilling to disclose' },
                                    ]}

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

export default Pharmacy