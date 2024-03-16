import React, { useState } from 'react'
import Layout from '../container/layout'
import Table, { TBody, TH, TableContainer, TableHead, TableTitle } from '../container/table';
import moment from 'moment';
import Button, { ButtonSM } from '../container/Button';
import Modal from '../container/modal';
import InputContainer, { SelectInput, TextArea } from '../container/input';
import { Link } from 'react-router-dom';
import Search from '../container/search';
import { useGetsymptomsQuery, usePostresultsMutation } from '../features/slices/symptomsSlice';
import { toast } from 'react-toastify';

function Lab() {

    const headers = [
        "name",
        "Test & Results",
    ]

    const { data, refetch, isFetching } = useGetsymptomsQuery()
    const [postresults] = usePostresultsMutation();

    const [showModal, setShowModal] = useState(false);
    const [patient, setPatient] = useState("");
    const [observation, setObservation] = useState("");
    const [results, setResults] = useState([{
        test: "", result: ""
    }])
    const [item, setitem] = useState({ id: '', firstName: "", dob: "", gender: "", lastName: "", referal_hosp: "", address: '', phone: '', city: '', nextVisit: "", email: "" });

    const closeModal = () => {
        setResults([{
            test: "", result: ""
        }])
        setShowModal(false)
    }
    const openModal = (tests, patient, obervation) => {
        setObservation(obervation)
        setPatient(patient)
        let item = []
        for (let index = 0; index < tests.length; index++) {
            item.push({
                test_id: tests[index]._id, results: ''
            })

        }
        setResults(item)

    }

    const changeInput = (index) => (e) => {
        const newArray = results.map((item, i) => {
            if (index === i) {
                return { ...item, [e.target.name]: e.target.value };
            } else {
                return item;
            }
        });
        setResults(newArray);
    };
    const submit = async () => {
        try {
            let lab = { patient_id: patient, observation_id: observation, results: results }
            await postresults(lab)
            closeModal()
            toast("Results Posted successfully ")

        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <Layout>
            <TableContainer isFetching={isFetching}>
                <TableTitle tableTitle="patients " />
                <div className='flex h-14 align-start float-left p-2 '>
                    <Search placeholder="Search for patient by name" />
                </div>
                <Table>
                    <TableHead>
                        {headers.map((head, i) => (<TH key={i} title={head} />))}
                    </TableHead>
                    <TBody>
                        {data?.map(person => (
                            <tr key={person._id} >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center" onClick={() => { setitem(person); setShowModal(true); openModal(person.test_id, person.patient_id._id, person._id) }}>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{person?.patient_id?.user_id?.name}</div>
                                        </div>

                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {person.test_id?.map((res, i) => (
                                        <div className='flex py-2' key={i}>
                                            <div className='flex w-1/3 text-sm text-gray-900 capitalize'>{res?.name}~
                                                <span className='flex w-2/3 px-2 inline-flex text-xs leading-5 font-semibold text-green-800'>{res?.result}</span></div>
                                        </div>
                                    ))}

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
                // width="3/4"
                submit={submit}
                buttontitle={item?.id !== undefined && item?.id !== null && item?.id !== "" ? `Update` : "Save"}
                title={item?.id !== undefined && item?.id !== null && item?.id !== "" ? ` Lab results` : "Patients General Data"}
                body={
                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                        {item?.test_id?.map((result, i) => (
                            <div className='flex w-full  space-between'>
                                <div className='w-[25%]'>
                                    <div className='px-3 py-1 text-[16px] font-bold'>{result.name}</div>
                                </div>
                                <div className='w-[70%'>
                                    <span className='text-[16px] text-slate-600 px-4'>Present</span><input
                                        checked={result.results === "present"}
                                        value="present"
                                        type="radio" onChange={changeInput(i)}
                                        name="results" />
                                    <span className='text-[16px] text-slate-600 px-4'>Absent</span><input type="radio"
                                        checked={result.results === "absent"}
                                        value="absent"
                                        onChange={changeInput(i)}
                                        name="results" />
                                    {/* <TextArea className="bg-red-200"
                                        required value={item?.weight} type="radio" name="results" label="results" placeholder="results" onChange={changeInput(i)} /> */}
                                </div>

                            </div>
                        ))}


                    </form>
                }
            />
        </Layout >
    )
}

export default Lab