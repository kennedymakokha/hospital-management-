import React, { useState } from 'react'
import Layout from '../container/layout.jsx'
import { useLocation } from 'react-router-dom'

import Table, { TBody, TH, TableContainer, TableHead } from '../container/table.jsx';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useCreateMutation, useDeleteHistoryMutation, useFetchHistoryQuery, useUpdateMutation } from '../features/slices/docHistoryApiSlice.js';
import { DoctorHistoryTableHead } from './../data.json'
import Button, { ButtonSM } from '../container/Button.jsx';
import TitleContainer, { MetaDatacontainer } from '../container/titleContainer.jsx';
import Modal from '../container/modal.jsx';
import InputContainer from '../container/input.jsx';
import { toast } from 'react-toastify';
import Loader from '../container/loader.jsx';
function Profile() {
    const location = useLocation()
    const [showModal, setShowModal] = useState(false);
    const [item, setitem] = useState({ facility: "", start: "", end: "" });


    const { userInfo } = useSelector((state) => state.auth)
    // const { data, isError, isFetching, refetch, error } = useGetuserQuery({}, { skip: !userInfo });
    const { data, refetch, isFetching } = useFetchHistoryQuery({})
    // const { data, isError, isFetching, refetch, error } = useFetchuserQuery({id:1}, { skip: !userInfo });

    const [create] = useCreateMutation();
    const [update] = useUpdateMutation();
    const [deleteHistory] = useDeleteHistoryMutation();

    const closeModal = () => {
        setitem({})
        setShowModal(false)
    }
    const changeInput = (e) => {

        const { name, value } = e.target;
        setitem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const submit = async () => {
        try {
            if (item._id) {
                await update(item).unwrap();
                refetch()
                closeModal()
                toast('Created Succesfully')
            } else {
                await create(item).unwrap();
                refetch()
                closeModal()
                toast('Created Succesfully')
            }

        } catch (error) {
            console.log("first")
        }
    }
    const deleteHandler = async (id) => {
        try {

            await deleteHistory(id).unwrap();
            refetch()

            toast(`${item.facility} Deleted Succesfully`)


        } catch (error) {
            console.log("first", error)
        }
    }

    return (
        <Layout>
            <div className=' flex w-full h-[200px]'>
                <div className='w-1/3 h-[200px] flex items-center justify-center '>
                    <div class="bg-gray-400 w-[200px] h-[200px] relative z-0 rounded-sm">
                        <img src="https://bit.ly/33HnjK0" className='w-[200px] h-[200px] rounded-sm ' alt="" />
                        <div class="absolute -right-3 bg-slate-400 h-8 w-8 -bottom-3 rounded-full 
                          flex justify-center items-center z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='w-2/3 h-[200px] bg-slate-100 inner-shadow shadow-xl rounded-md'>
                    <MetaDatacontainer title="Name" value={`${userInfo?.name}`} />
                    <MetaDatacontainer title="Email" value={userInfo?.email} />
                    <MetaDatacontainer title="Phone" value={userInfo?.phone} />
                </div>

            </div>

            <div className='w-full flex-col flex h-[200px] '>
                <TitleContainer title="Doctor work  History " />
                <TableContainer isFetching={isFetching}>

                    <div className='flex align-end float-right m-2 '> <Button
                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>}
                        primary title="New" onClick={() => { setShowModal(true) }} /></div>
                    <Table>
                        <TableHead>
                            {DoctorHistoryTableHead.map((head, i) => (<TH key={i} className="text-red-200" title={head} />))}
                        </TableHead>
                        <TBody>
                            {data?.map(item => (
                                <tr key={item._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.facility}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {moment(item.start).format('YYYY-MM-DD')}

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {moment(item.end).format('YYYY-MM-DD')}

                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap  flex  gap-x-1 text-sm font-medium">
                                        <div className="text-indigo-600 hover:text-indigo-900">
                                            <ButtonSM primary title="Edit" onClick={() => { setitem(item); setShowModal(true); }} height={2} width={8} />
                                        </div>
                                        <div className="text-indigo-600 hover:text-indigo-900">
                                            <ButtonSM danger title="Delete" onClick={() => { setitem(item); deleteHandler(item._id); }} height={2} width={8} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </TBody>
                    </Table>
                </TableContainer>
                <Modal
                    showModal={showModal}
                    closeModal={() => closeModal({ showModal, setitem })}
                    item={item}
                    width="w-1/4"
                    submit={submit}
                    buttontitle={item._id !== undefined && item._id !== null && item._id !== "" ? `Update` : "Save"}
                    title={item._id !== undefined && item._id !== null && item._id !== "" ? `Edit ${item.facility}` : "Doctor Work History"}
                    body={
                        <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                            <div className='flex w-full  '>
                                <div className='w-full'>
                                    <InputContainer value={item?.facility} required name="facility" label="Facility" placeholder="Facility Name" onChange={(e) => changeInput(e)} />
                                </div>
                            </div>
                            <div className='flex w-full  '>
                                <div className='w-full'>
                                    <InputContainer type="date" required value={item?.start} name="start" label="Start Date" placeholder="Start Date" onChange={(e) => changeInput(e)} />
                                </div>
                            </div>
                            <div className='flex w-full  space-between'>
                                <div className='w-full'>
                                    <InputContainer type="date" required value={item?.end} name="end" label="End Date" placeholder="End Date" onChange={(e) => changeInput(e)} />
                                </div>
                            </div>
                        </form>
                    }
                />
            </div>
        </Layout>
    )
}

export default Profile