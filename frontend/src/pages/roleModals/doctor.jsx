import React, { useState } from 'react'
import Modal from '../../container/modal';
import InputContainer, { SelectInput, TextArea } from '../../container/input';
import { useFetchTestQuery } from '../../features/slices/symptomsSlice';

function DoctorModal(props) {
    const { data } = useFetchTestQuery()
    let newData = []
    const _settests = () => {
        for (let index = 0; index < data?.length; index++) {
            newData.push({ id: data[index]._id, name: data[index].name, state: true })
        }
    }
    _settests()

    const _pickTest = (id) => {
        var editedUser = newData[id];

        editedUser.state = !editedUser.state

        newData = newData.map(u => u.id !== editedUser.id ? u : editedUser);
    }
    console.log(newData)



    const [desc, setDecription] = useState("")
    const [tests, setTests] = useState(["malaria", "typhid"])

    const { item } = props
    const changeInput = (e) => {
        setDecription(e.target.value)
    }
    return (
        <Modal
            showModal={props?.showModal}
            closeModal={props.closeModal}
            item={props.item}
            submit={props.submit}
            buttontitle={item?._id !== undefined && item?._id !== null && item?._id !== "" ? `Update` : "Save"}
            title={item?._id !== undefined && item?._id !== null && item?._id !== "" ? `Edit ${item.firstName} ${item.lastName}` : "DR consultation Report "}
            body={
                <form className="  rounded px-8 pt-2 pb-8 w-full">
                    <div className='w-[70%] mb-5'>
                        <TextArea className="bg-red-200"
                            required value={desc} type="text"
                             name="result" label="results" placeholder="results" onChange={e=>changeInput(e)} />
                    </div>
                    <div className='flex w-full '>
                        <div className='flex flex-wrap gap-x-1'>
                            {newData?.map((test, index) => (
                                <div key={test.id} onClick={() => _pickTest(index)} className={`px-4  border border-2 rounded-full text-[10px]  ${test.state === true ? "text-slate-100" : "text-slate-600"}  ${test.state === true ? "bg-primary-100" : "bg-slate-100"} border-slate-600`}>{test.name}</div>
                            ))}
                        </div>
                    </div>


                </form>
            }
        />
    )
}

export default DoctorModal