import React, { useState } from 'react'
import Layout from '../container/layout.jsx'
import { Link, useLocation } from 'react-router-dom'
import underline from './../assets/underline.png'

import LineChart from '../container/charts/bloodpressure.jsx';
import Table, { TBody, TH, TableContainer, TableHead, TableTitle } from '../container/table.jsx';
import moment from 'moment';
import Button, { ButtonSM } from '../container/Button.jsx';
import Modal from '../container/modal.jsx';
import InputContainer, { SelectInput } from '../container/input.jsx';
import { useGetAllTriageByPatientQuery, useGetTriageByPatientQuery } from '../features/slices/triageSlice.jsx';
import { PatientHistoryTableHead } from '../data.json'
import { SelectOptions, _calculateAge } from '../helpers/index.jsx';
import LabTable from './Tables/labTable.jsx';
import TitleContainer, { MetaDatacontainer, TriageItem, UserItem } from '../container/titleContainer.jsx';
import { useGetsymptomsByPatientQuery } from '../features/slices/symptomsSlice.jsx';
import { useFetchuserQuery, useEditUserDetailsMutation } from '../features/slices/usersApiSlice.js'
import { useFetchQuery } from './../features/slices/stationSlice.jsx'
import DoctorModal from './roleModals/doctor.jsx';
import { useSelector } from 'react-redux';
import Tab, { TabContainer } from '../container/tabs.jsx';
import Loader from '../container/loader.jsx';




function UserDetails() {
    const location = useLocation()
    const { details } = location.state
    const [item, setItem] = useState({ day: "", station: '', off_day: '' })
    const [showModal, setShowModal] = useState(false);
    const { data: user, isFetching, refetch } = useFetchuserQuery(details._id)
    const { data: stations } = useFetchQuery()

    const [editUserDetails] = useEditUserDetailsMutation()

    const { userInfo } = useSelector((state) => state.auth)
   
    const submit = () => {
        try {
            console.log(item)
            item.id = details._id
            editUserDetails(item)
            refetch()
            setShowModal(false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className=' flex w-full h-[200px] '>
                <div className='w-1/3 h-[200px] flex items-center justify-center '>
                    <div className='w-[200px] h-[200px] bg-blue-100 rounded-full '>
                        <img src="https://bit.ly/33HnjK0" className='w-[200px] h-[200px] rounded-lg ' alt="" />
                    </div>
                </div>

                {isFetching ? <div className='flex h-[300px] w-full items-center justify-center'>
                    <Loader />
                </div> : <div className='w-2/3 h-[200px] pr-2 flex items-between justify-between bg-slate-100 inner-shadow shadow-xl rounded-md'>
                    <div>
                        <MetaDatacontainer title="Name" value={`${user?.name}`} />
                        {/* <MetaDatacontainer title="Age" value={_calculateAge(details.dob)} /> */}

                        <MetaDatacontainer title="Phone" value={user?.phone} />
                        <MetaDatacontainer title="Email" value={user?.email} />
                        <MetaDatacontainer title="Off Day" value={user?.off_day} />
                        {user?.role?.name === "Nurse" || user?.role?.name === "Dr" && <MetaDatacontainer title="Station" value={user?.station?.name} />}
                    </div>
                    <div className='float-bottom flex  flex-col items-center  justify-end p-5'>
                        <Button primary title="Update" onClick={() => { setShowModal(true) }} />
                    </div>
                </div>}

            </div>




            <Modal
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                item={item}
                // width="3/4"
                submit={submit}
                buttontitle={"Save"}
                title={"Update "}
                body={
                    <form className=" bg-slate-100  rounded px-8 pt-2 pb-8 w-full">
                        <div className=' flex w-full  space-between'>
                            <div className='w-full'>
                                <SelectInput
                                    label="Station"
                                    placeholder="Start typing Dept Name"
                                    options={SelectOptions({ array: stations, name: '' })}
                                    // value={item.userId}
                                    onChange={(e) => {
                                        setItem((prevState) => ({
                                            ...prevState,
                                            station: e.target.value,
                                        }));

                                    }}
                                />
                            </div>
                            <div className='w-full'>
                                <SelectInput
                                    label="Off Duty"
                                    placeholder="Start typing Dept Name"
                                    options={[
                                        { label: "Sunday", value: "Sunday" },
                                        { label: "Monday", value: "Monday" },
                                        { value: "Tuesday", label: 'Tuesday' },
                                        { label: "Wednesday", value: 'Wednesday' },
                                        { value: "Thursday", label: "Thursday" },
                                        { value: "Friday", label: 'Friday' },
                                        { label: "Saturday", value: "Suturday" }]}

                                    // value={item.userId}
                                    onChange={(e) => {
                                        setItem((prevState) => ({
                                            ...prevState,
                                            off_day: e.target.value,
                                        }));

                                    }}
                                />
                            </div>
                        </div>

                    </form>
                }
            />
            {/* <DoctorModal item={{}} closeModal={() => { setShow(false) }} showModal={show} /> */}
        </Layout>
    )
}

export default UserDetails