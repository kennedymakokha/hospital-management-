import React, { useState } from 'react'
import Layout from '../container/layout'
import Table, { TBody, TH, TableContainer, TableHead, TableTitle } from '../container/table';
import moment from 'moment';
import Button, { ButtonSM } from '../container/Button';
import Modal from '../container/modal';
import InputContainer, { SelectInput, TextArea } from '../container/input';
import { Link } from 'react-router-dom';
import Search from '../container/search';

function Lab() {

    const headers = [
        "name",
        "Test & Results",



    ]
    const [showModal, setShowModal] = useState(false);
    const [more, setmore] = useState(false);
    const [results, setResults] = useState([{
        test: "", result: ""
    }])
    const [item, setitem] = useState({ id: '', firstName: "", dob: "", gender: "", lastName: "", referal_hosp: "", address: '', phone: '', city: '', nextVisit: "", email: "" });
    const [people, setPeople] = useState([
        {
            firstName: 'Jane ',
            id: 1,
            lastName: ' Cooper',
            test: 'Malaria',
            results: [{ test: "malaria", result: "Malaria parasites can be identified" }
                , { test: "Typhoid", result: "Salmonela typhy absent" }],
            results_hosp: 'Optimization',
            phone: '0716017221',
            email: 'jane.cooper@example.com',
            image: 'https://bit.ly/33HnjK0',
        },
        {
            id: 2,
            firstName: 'John ',
            lastName: ' Doe',
            test: 'Regional Paradigm Technician',
            results: [{ test: "malaria", result: "Malaria parasites can be identified" }
                , { test: "Typhoid", result: "Salmonela typhy absent" }],
            results_hosp: 'Miji Clinics ',
            phone: '0722872414',
            email: 'john.doe@example.com',
            image: 'https://bit.ly/3I9nL2D',
        },
        {
            id: 3,
            firstName: 'Veronica ',
            lastName: 'Lodge',
            test: 'Regional Paradigm Technician',
            results: [{ test: "malaria", result: "Malaria parasites can be identified" }
                , { test: "Typhoid", result: "Salmonela typhy absent" }],
            results_hosp: 'Mt Emoru Hospital',
            phone: ' Software Engineer',
            email: 'veronica.lodge@example.com',
            image: 'https://bit.ly/3vaOTe1',
        },
        // More people...
    ]);
    const closeModal = () => {
        setResults([{
            test: "", result: ""
        }])
        setShowModal(false)
    }
    // const changeInput = (e) => {
    //     const { name, value } = e.target;
    //     setitem((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    // };
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
    const submit = () => {

        const newArray = people.map((item, i) => {
            if (item.id === i) {
                setPeople((prevState) => ( // Replace the state
                    [ // with a new array
                        ...people,
                        // { prevState.results: results }
                        // that contains all the old items
                        // and one new item at the end
                    ]
                ));
            } else {
                return item;
            }
        });
        setResults(newArray);
        closeModal()
    }
    const populateInput = () => {
        setResults( // Replace the state
            [ // with a new array
                ...results, // that contains all the old items
                { test: "", result: "" } // and one new item at the end
            ]
        );
    }

    return (
        <Layout>
            <TableContainer>
                <TableTitle tableTitle="patients " />
                <div className='flex h-14 align-start float-left p-2 '>
                    <Search placeholder="Search for patient by name" />
                </div>
                <Table>
                    <TableHead>
                        {headers.map((head, i) => (<TH key={i} title={head} />))}
                    </TableHead>
                    <TBody>
                        {people.map(person => (
                            <tr key={person.email}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center" onClick={() => { setitem(person); setShowModal(true); }}>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{person.firstName} {person.lastName}</div>
                                            <div className="text-sm text-gray-500">{person.email}</div>
                                        </div>

                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {person.results.map((res, i) => (
                                        <div className='flex py-2'>
                                            <div className='flex w-1/3 text-sm text-gray-900 capitalize'>{res.test}~
                                                <span className='flex w-2/3 px-2 inline-flex text-xs leading-5 font-semibold text-green-800'>{res.result}</span></div>
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
                submit={submit}
                buttontitle={item.id !== undefined && item.id !== null && item.id !== "" ? `Update` : "Save"}
                title={item.id !== undefined && item.id !== null && item.id !== "" ? ` Lab results` : "Patients General Data"}
                body={
                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                        {results.map((result, i) => (
                            <div className='flex w-full  space-between'>
                                <div className='w-[25%]'>
                                    <InputContainer value={item?.bp} required name="test" label="test" placeholder="test" onChange={changeInput(i)} />
                                </div>
                                <div className='w-[70%'>
                                    <TextArea
                                        required value={item?.weight} type="text" name="result" label="results" placeholder="results" onChange={changeInput(i)} />
                                </div>
                                <div className='w-[5%] flex items-center justify-center mx-2 '>

                                    {!more  && i === 0 ? <Button
                                        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                                        </svg>
                                        }
                                        width={10}
                                        primary title="" onClick={() => { populateInput() }} /> :
                                        <Button
                                            icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                            </svg>}
                                            width={10}
                                            danger title="" onClick={() => { setShowModal(true) }} />}
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