import React, { useState } from 'react'
import Layout from '../container/layout'
import Table, { TBody, TH, TableContainer, TableHead, TableTitle } from '../container/table';
import moment from 'moment';
import Button, { ButtonSM } from '../container/Button';
import Modal from '../container/modal';
import InputContainer, { SelectInput } from '../container/input';
import { deptData, personsData } from '../assets/data/data';

function Appointment() {

    const headers = [
        "Patients name",
        "phone No",
        "Appointment Date ", "Time",
        "Department", "Doctor",
        ""


    ]
    let options = [
        { label: 'Fruit', value: 'fruit' },
        { label: 'Vegetable', value: 'vegetable' },
        { label: 'Meat', value: 'meat' },
    ]
    const SelectOptions = (data) => {
        const { array, name, } = data

        let t = data.array.map((person, i) => (
            {
                key: i,
                value: person.id,
                phone: person.phone,
                label: `${person.firstName} ${person.lastName}`,

            }
        ))

        return t
    }
    const [showModal, setShowModal] = useState(false);
    const [docs, setDocs] = useState([]);
    const [item, setitem] = useState({ firstName: "", doc: "", userId: "", dept: "", lastName: "", referal_hosp: "", address: '', phone: '', city: '', visitDate: "", email: "" });
    const [people, setPeople] = useState([
        {
            firstName: 'Jane ',
            id: 1,
            lastName: ' Cooper',
            title: 'Regional Paradigm Technician',
            referal: false,
            referal_hosp: 'Optimization',
            phone: '0716017221',
            email: 'jane.cooper@example.com',
            image: 'https://bit.ly/33HnjK0',
        },
        {
            id: 2,
            firstName: 'John ',
            lastName: ' Doe',
            title: 'Regional Paradigm Technician',
            referal: false,
            referal_hosp: 'Miji Clinics ',
            phone: '0722872414',
            email: 'john.doe@example.com',
            image: 'https://bit.ly/3I9nL2D',
        },
        {
            id: 3,
            firstName: 'Veronica ',
            lastName: 'Lodge',
            title: 'Regional Paradigm Technician',
            referal: true,
            referal_hosp: 'Mt Emoru Hospital',
            phone: ' Software Engineer',
            email: 'veronica.lodge@example.com',
            image: 'https://bit.ly/3vaOTe1',
        },
        // More people...
    ]);
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
    const submit = () => {
        setitem((prevState) => ({
            ...prevState,
            id: Math.floor((Math.random() * 100) + 1),
        }));
        setPeople( // Replace the state
            [ // with a new array
                ...people, // that contains all the old items
                item// and one new item at the end
            ]
        );
        closeModal()
        console.log(item)

    }
    let PeopleData = SelectOptions({ array: personsData, name: "userId" })
    return (

        < Layout >
            <TableContainer>
                <TableTitle tableTitle="patients Appointments " />
                <div className='flex align-end float-right m-2 '> <Button
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                        <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                    </svg>
                    }
                    primary title="Book" onClick={() => { setShowModal(true) }} /></div>
                <Table>
                    <TableHead>
                        {headers.map((head, i) => (<TH key={i} title={head} />))}
                    </TableHead>
                    <TBody>
                        {people.map(person => (
                            <tr key={person.email}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {/* <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                                        </div> */}
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{person.firstName} {person.lastName}</div>
                                            <div className="text-sm text-gray-500">{person.email}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className="px-2 inline-flex text-xs leading-5
      font-semibold rounded-full bg-green-100 text-green-800"
                                    >
                                        {person.phone}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {moment().format('YYYY-MM-DD')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {moment().format('h:m:ss')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {person.dept}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {person.doc}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  flex  gap-x-1 text-sm font-medium">
                                    <div className="text-indigo-600 hover:text-indigo-900">
                                        <ButtonSM primary title="Edit" onClick={() => { setitem(person); setShowModal(true); }} height={2} width={8} />
                                    </div>
                                    <div className="text-indigo-600 hover:text-indigo-900">
                                        <ButtonSM danger title="Delete" height={2} width={8} />
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
                buttontitle={item.id !== undefined && item.id !== null && item.id !== "" ? `Update` : "Save"}
                title={item.id !== undefined && item.id !== null && item.id !== "" ? `Edit ${item.firstName} ${item.lastName}appointment ` : " Book Appointment"}
                body={
                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                        <div className='flex w-full  space-between'>
                            <div className='w-1/2'>
                                <SelectInput
                                    label="Patient"
                                    placeholder="Start typing the Patients Name"
                                    options={SelectOptions({ array: personsData, name: "userId" })}
                                    search
                                    // value={item.userId}
                                    onChange={(e) => {

                                        setitem((prevState) => ({
                                            ...prevState,
                                            userId: e.target.value,

                                        }));
                                        PeopleData.filter((el) => {


                                            setitem((prevState) => ({
                                                ...prevState,
                                                userId: e.target.value,
                                                firstName: el.label,

                                            }));

                                        })

                                    }}
                                />
                            </div>
                            <div className='w-1/2'>
                                <SelectInput
                                    label="Department"
                                    placeholder="Start typing Dept Name"
                                    options={deptData}
                                    // value={item.userId}
                                    onChange={(e) => {
                                        setitem((prevState) => ({
                                            ...prevState,
                                            dept: e.target.value,
                                        }));
                                        deptData.filter((el) => {

                                            if (el.value === e.target.value) {
                                                let docs = []

                                                setDocs(el.doctors)
                                            }
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div className='flex w-full  space-between'>
                            <div className='w-1/2'>

                                <SelectInput
                                    label="Doctor "
                                    placeholder="Start typing Dept Name"
                                    options={docs}

                                    value={item.userId}
                                    onChange={(e) => {
                                        setitem((prevState) => ({
                                            ...prevState,
                                            doc: e.target.value,
                                        }));

                                    }}
                                />
                            </div>
                            <div className='w-1/2'>
                                <InputContainer name="visitDate" value={item.id !== "" ? (Date()) : item.date} type="date" required label="Visit Date" onChange={(e) => changeInput(e)} />
                            </div>
                            {/* <div className='w-1/2'>
                                <InputContainer value={item?.email} refered={refered} setRefered={setRefered} name="radio" type="radio" label="rafered" placeholder="email" onChange={(e) => console.log(e.target.value)} />
                            </div> */}
                        </div>
                    </form>
                }
            />
        </Layout >
    )
}

export default Appointment