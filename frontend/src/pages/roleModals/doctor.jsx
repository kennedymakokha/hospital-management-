import React, { useState } from 'react'
import Modal from '../../container/modal';
import InputContainer, { SelectInput, TextArea } from '../../container/input';
import { useFetchTestQuery, useCreatesymptomsMutation, usePostPrescriptionMutation } from '../../features/slices/symptomsSlice';
import { ButtonSM } from '../../container/Button';
import { toast } from 'react-toastify';
import Search from '../../container/search';
import { personsData } from '../../assets/data/data';
import { SelectOptions } from '../../helpers';
import { useFetchQuery } from '../../features/slices/medicationsSlice';

function DoctorModal(props) {
    const { data } = useFetchTestQuery()
    const [createsymptoms] = useCreatesymptomsMutation();

    let newData = []

    const [tests, setTests] = useState(data)
    const [TestToDo, setTestToDo] = useState([])

    const { item, setItem } = props
    const changeInput = (e) => {
        setItem(prevState => ({
            ...prevState,
            symptoms: e.target.value
        }))
    }

    const _pickTest = (test) => {
        const { _id } = test

        let to = tests.filter(element => element._id !== _id);
        setTests(to);

        const newTests = [...item.tests]
        newTests.push(_id)
        setItem(prevState => ({
            ...prevState, tests: newTests
        }))
        let newTods = [...TestToDo]
        newTods.push(test)
        setTestToDo(newTods)


    }
    const submit = async () => {
        try {
            await createsymptoms(item).unwrap();
            props.closeModal()
            setTestToDo([])
            props.refetch()
            toast('Created Succesfully')
        } catch (error) {
            
            toast(error)
        }
    }
    return (
        <Modal
            showModal={props?.showModal}
            closeModal={props.closeModal}
            item={props.item}
            submit={submit}
            buttontitle={item?._id !== undefined && item?._id !== null && item?._id !== "" ? `Update` : "Save"}
            title={item?._id !== undefined && item?._id !== null && item?._id !== "" ? `Edit ${item.firstName} ${item.lastName}` : "DR consultation Report "}
            body={
                <form className="  rounded px-8 pt-2 pb-8 w-full">
                    <div className='w-[100%] mb-5'>
                        <TextArea className="bg-red-200"
                            required value={item.descriptions} type="text"
                            name="result" label="observations" placeholder="Enter observations" onChange={e => changeInput(e)} />
                        {tests?.length !== 0 && <div className='float-right w-[100px] my-2'>  <ButtonSM outline title="Lab tests " onClick={() => setTests(data)} /></div>}
                        <ul>
                            {TestToDo.map((sym, i) => (
                                <li key={i} className='flex flex-row items-center gap-x-3'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 h-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg><span className='text-[10px] text-slate-400'>{sym.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex w-full '>
                        <div className='flex flex-wrap gap-x-1'>
                            {tests?.map((test, index) => (
                                <div key={test._id} onClick={() => _pickTest(test)}
                                    className={`px-4 py-1 flex items-center justify-center border border-1 border-primary-600 h-[20px] rounded-full text-[10px] 
                                     border-slate-600`}>{test.name}</div>
                            ))}
                        </div>
                    </div>
                </ form>
            }
        />
    )
}

export function PrescriptionModal(props) {

    const [postPrescription] = usePostPrescriptionMutation();
    const { data, isFetching } = useFetchQuery()
    const { item, setItem } = props
    const [drugs, setdrugs] = useState([])
    const [prescriptions, setprescriptions] = useState([])



    const changeNow = (index) => (e) => {
        const newArray = drugs.map((item, i) => {
            if (index === i) {
                return { ...item, dosage: e.target.value };
            } else {
                return item;
            }
        });
        setdrugs(newArray);

    };
    const onblure = (index) => (e) => {

        const newpres = prescriptions.map((item, i) => {
            if (index === i) {

                return { ...item, filled: true, dosage: e.target.value };
            } else {
                return item;
            }
        });

        setprescriptions(newpres);
    };
    const submit = async () => {
        try {
            item.drugs = drugs
            await postPrescription(props.item).unwrap();
            props.closeModal()
            setprescriptions([])
            setdrugs([])
            props.refetch()
            toast('Created Succesfully')
        } catch (error) {
            console.log(error)
            toast(error)
        }
    }

    return (
        <Modal
            showModal={props?.showModal}
            closeModal={props.closeModal}
            item={props.item}
            submit={submit}
            buttontitle={item?._id !== undefined && item?._id !== null && item?._id !== "" ? `Update` : "Save"}
            title="prescription"
            body={
                <form className="  rounded px-8 pt-2 pb-8 w-full">
                    <div className='w-[100%] mb-2'>
                        <TextArea
                            required value={item.descriptions} cols="2" type="text"
                            name="details" label="Doctors General note" placeholder="Doctors General comments" onChange={e =>
                                setItem(prevState => ({
                                    ...prevState,
                                    details: e.target.value
                                }))
                            } />

                    </div>
                    <SelectInput
                        label="Drugs"
                        placeholder={isFetching ? "Loading Data" : "Start typing "}
                        options={SelectOptions({ array: data, })}
                        // search
                        onChange={(e) => {
                            let newdrugs = [...drugs]
                            let newPrescriptions = [...prescriptions]
                            let v = SelectOptions({ array: data, }).find(t => t.value === e.target.value)
                            newdrugs.push({ drug_id: e.target.value, dosage: "", name: v.label })
                            v.filled = false
                            let n = newPrescriptions.push(v)
                            setprescriptions(newPrescriptions)
                            setdrugs(newdrugs)
                        }}
                    />
                    <table className='text-sm w-full my-2 border border-secondary-700 '>
                        <thead className='w-full bg-primary-800 border-b border-b-secondary-700 '>
                            <th className='w-[2%] border-r '></th>
                            <th className='w-[48%] text-start border-r border-r-secondary-700'>Drug</th>
                            <th className='w-[48%] text-start border-r border-r-secondary-700'>Dosage</th>
                        </thead>
                        <tbody className='w-full'>
                            {prescriptions.map((pres, i) => (<tr key={i} className={`w-full ${pres.filled && "border-b  border-b-primary-100"}`}>
                                <td className='w-[2%] text-center'>{i + 1}</td>
                                <td className='w-[48%] text-start border-r border-r-secondary-700'>{pres.label}</td>
                                <td className='w-[48%] text-start  border-r border-r-secondary-700'>
                                    {pres.filled ? pres.dosage : <InputContainer value={item?.bp} name="bp"
                                        placeholder={`${pres.label} dosage`} onBlur={onblure(i)} onChange={changeNow(i)}
                                    />}
                                </td>
                            </tr>))}
                        </tbody>
                    </table>


                </ form>
            }
        />
    )
}

export default DoctorModal