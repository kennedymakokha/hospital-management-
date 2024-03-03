import React, { useState } from 'react'
import Layout from '../container/layout'
import { Link, useLocation } from 'react-router-dom'
import underline from './../assets/underline.png'

import LineChart from '../container/charts/bloodpressure.jsx';
import Table, { TBody, TH, TableContainer, TableHead, TableTitle } from '../container/table';
import moment from 'moment';
import Button, { ButtonSM } from '../container/Button';
import Modal from '../container/modal';
import InputContainer, { SelectInput } from '../container/input';
import { useGetAllTriageByPatientQuery, useGetTriageByPatientQuery } from '../features/slices/triageSlice.jsx';
import { PatientHistoryTableHead } from './../data.json'
import { _calculateAge } from '../helpers/index.jsx';
import LabTable from './Tables/labTable.jsx';
import TitleContainer, { MetaDatacontainer, TriageItem } from '../container/titleContainer.jsx';
import { useGetsymptomsByPatientQuery } from '../features/slices/symptomsSlice.jsx';
import DoctorModal from './roleModals/doctor.jsx';
import { useSelector } from 'react-redux';
import Tab, { TabContainer } from '../container/tabs.jsx';




function PatientDetails() {
    const location = useLocation()
    const { details } = location.state
    const [show, setShow] = useState(false)
    const [tabs, setTabs] = useState([
        { title: "all", state: true },
        { title: "lab", state: false },
        { title: "statistics", state: false },
        { title: "history", state: false },
        { title: "account", state: false }
        // "All", "Lab", "Statistics", "history", "Accounts",
    ])
    const { data: symptoms } = useGetsymptomsByPatientQuery(details._id)
    const { data: userTriage, refetch, isFetching } = useGetTriageByPatientQuery(details._id)
    const { data: patientTries } = useGetAllTriageByPatientQuery(details._id)
    const { userInfo } = useSelector((state) => state.auth)
    let systolicData = []
    let DiastolicData = []
    let tempData = []
    let BloodSugerData = []
    const bloodPressure = () => {

        patientTries?.forEach(element => {
            systolicData.push({ x: new Date(element.createdAt), y: parseInt(element?.bloodPressure?.upperValue) },)
            DiastolicData.push({ x: new Date(element.createdAt), y: parseInt(element?.bloodPressure?.lowerValue) },)
            tempData.push({ x: new Date(element.createdAt), y: parseInt(element?.temp) },)
            BloodSugerData.push({ x: new Date(element.createdAt), y: parseInt(element?.temp) },)

        });
    }
    bloodPressure()



    const handleTab = (title) => {
        let newTab = []
        tabs.forEach(tab => {

            if (tab.title === title) {
                let v = { ...tab, state: true }
                newTab.push(v)
                return v; //gets everything that was already in item, and updates "done"
            }
            else {
                let v = { ...tab, state: false }
                newTab.push(v)
                return v;
            }

        });

        setTabs(newTab)

    }
    return (
        <Layout>
            <div className=' flex w-full h-[200px] '>
                <div className='w-1/3 h-[200px] flex items-center justify-center '>
                    <div className='w-[200px] h-[200px] bg-blue-100 rounded-full '>
                        <img src="https://bit.ly/33HnjK0" className='w-[200px] h-[200px] rounded-lg ' alt="" />
                    </div>
                </div>

                <div className='w-2/3 h-[200px] pr-2 flex items-between justify-between bg-slate-100 inner-shadow shadow-xl rounded-md'>
                    <div>
                        <MetaDatacontainer title="Name" value={`${details.firstName} ${details.lastName}`} />
                        <MetaDatacontainer title="Age" value={_calculateAge(details.dob)} />
                        <MetaDatacontainer title="Gender" value={details.gender} />
                        <MetaDatacontainer title="Phone" value={details.phone} />
                        <MetaDatacontainer title="Email" value={details.email} />
                    </div>
                    <div className='float-bottom'>
                        {userInfo.role === "Dr" ? <Button secondary title="add" onClick={() => { setShow(true) }} /> : null}
                    </div>

                </div>

            </div>

            <div className='w-full flex-col flex h-[200px] '>
                <TitleContainer title="Triage Info" />
                <div className='flex  w-full '>
                    <TriageItem title="temerature" value={userTriage?.temp} symbol='&#x2103;' />
                    <TriageItem title="Blood Pressure" lowerValue={userTriage?.bloodPressure?.lowerValue} upperValue={userTriage?.bloodPressure?.upperValue} symbol='mm Hg' />
                    <TriageItem title="Weight" value={userTriage?.weight} symbol='Kgs' />
                    <TriageItem title="Height" value={userTriage?.height} symbol='ft' />
                    <TriageItem title="Blood Sugar" value={userTriage?.bloodSugar} symbol='mg/dL (3.9 mmol/L) ' />
                </div>

            </div>
            
            <Tab data={tabs} onChange={handleTab} />
            {tabs.map((tab, i) => (
                <div key={i}>
                    <TabContainer title="Statistics" tab={tab} tab1="statistics"
                        body={<div className='w-full flex h-[400px]  '>
                            <div className='h-1/3 w-1/3 p-1'>
                                <LineChart Data1={DiastolicData} type="line" Data2={systolicData} double title="Blood Pressure" />
                            </div>
                            <div className='h-1/3 p-1 w-1/3'>
                                <LineChart Data1={tempData} type="spline" double title="Temprature" />
                            </div>
                            <div className='h-1/3 p-1 w-1/3'>
                                <LineChart Data1={tempData} type="stepLine" double title="Blood Sugar" />
                            </div>
                        </div>} />
                    <TabContainer title="Lab Results" tab={tab} tab1="lab" body={<LabTable data={[]} />} />
                    <TabContainer title="Patient History" tab={tab} tab1="history" body={<LabTable data={[]} />} />
                    <TabContainer title="Patient Payment History " tab={tab} tab1="account" body={<LabTable data={[]} />} />


                </div>
            ))
            }
            <DoctorModal item={{}} closeModal={() => { setShow(false) }} showModal={show} />
        </Layout>
    )
}

export default PatientDetails