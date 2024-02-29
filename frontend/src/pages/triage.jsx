import React, { useState } from 'react'
import Layout from '../container/layout'
import Table, { TBody, TH, TableContainer, TableHead, TableTitle } from '../container/table';
import moment from 'moment';
import Button, { ButtonSM } from '../container/Button';
import Modal from '../container/modal';
import InputContainer, { SelectInput } from '../container/input';
import { Link } from 'react-router-dom';
import Search from '../container/search';
import { TriageTableHead } from './../data.json'
import { useCreateTriageMutation, useDeleteTriageMutation, useFetchTriageQuery, useGetTriageByPatientQuery, useUpdateTriageMutation } from './../features/slices/triageSlice'
import { useFetchPatientsQuery } from '../features/slices/patientSlice';
import { SelectPatientsFromAPI, validPressureValue } from '../helpers';
import { toast } from 'react-toastify';
function Triage() {


    const [showModal, setShowModal] = useState(false);
    const [item, setitem] = useState({ weight: 0, height: 0, bp: "", bloodPressure: { upperValue: "", lowerValue: '' }, user_id: "", temp: 0 });
    const { data, refetch, isFetching } = useFetchTriageQuery({})
    const { data: patients } = useFetchPatientsQuery({})
    const [createTriage] = useCreateTriageMutation();
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
        await validPressureValue(item.bp)
        try {
            await createTriage(item)
            await refetch()
            closeModal()
            toast.success('Triage entered successfully ')

        } catch (error) {
            toast.error('Triage failed successfully ')
        }

    }

    return (
        <Layout>
            <TableContainer isFetching={isFetching}>
                <TableTitle tableTitle="patients " />
                <div className='flex h-14 align-start float-left p-2 '>
                    <Search placeholder="Search for patient by name" />
                </div>
                <div className='flex align-end float-right m-2 '> <Button
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                    </svg>}
                    primary title="New" onClick={() => { setShowModal(true) }} /></div>
                <Table>
                    <TableHead>
                        {TriageTableHead.map((head, i) => (<TH key={i} title={head} />))}
                    </TableHead>

                    <TBody>
                        {data?.map(triage => (
                            <tr key={triage._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center" onClick={() => { setitem(triage); setShowModal(true); }}>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{triage?.user_id?.firstName} {triage?.user_id?.lastName}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{triage?.bloodPressure?.lowerValue}/{triage?.bloodPressure?.upperValue}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {triage.weight}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {triage.temp}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {triage.height}
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
                buttontitle={item.id !== undefined && item.id !== null && item.id !== "" ? `Update` : "Save"}
                title={item.id !== undefined && item.id !== null && item.id !== "" ? `Update ${item.firstName} ${item.lastName} Triage Data` : "Patients General Data"}
                body={
                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                        <div className='flex w-full  space-between'>
                            <div className='w-full'>

                                <SelectInput
                                    label="user_id"

                                    placeholder="Start typing Dept Name"
                                    options={SelectPatientsFromAPI({ array: patients ? patients : [], name: "user_id" })}
                                    // value={item.userId}
                                    onChange={(e) => {
                                        setitem((prevState) => ({
                                            ...prevState,
                                            user_id: e.target.value,
                                        }));

                                    }}
                                />
                            </div>

                        </div>
                        <div className='flex w-full  space-between'>
                            <div className='w-1/2'>
                                <InputContainer value={item?.bp} required name="bp" label="Blood Pressure"
                                    placeholder="Blood Pressure" onChange={(e) => { changeInput(e) }}


                                />
                            </div>
                            <div className='w-1/2'>
                                <InputContainer required value={item?.weight} type="numeric" name="weight" label="Weight" placeholder="Weight" onChange={(e) => changeInput(e)} />
                            </div>
                        </div>
                        <div className='flex w-full  space-between'>
                            <div className='w-1/2'>
                                <InputContainer name="height" value={item?.height} type="numeric" label="Height" placeholder="Height" onChange={(e) => changeInput(e)} />
                            </div>
                            <div className='w-1/2'>
                                <InputContainer name="temp" type="numeric" value={item?.temp} required label="temperature" placeholder="temperature" onChange={(e) => changeInput(e)} />
                            </div>
                        </div>


                    </form>
                }
            />
        </Layout>
    )
}

export default Triage