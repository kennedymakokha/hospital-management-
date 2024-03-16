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
import LabTable, { ObservationTable } from './Tables/labTable.jsx';
import TitleContainer, { MetaDatacontainer, TriageItem } from '../container/titleContainer.jsx';
import { useFetchUserPrescriptionsQuery, useFetchUserResultsQuery, useGetsymptomsByPatientQuery } from '../features/slices/symptomsSlice.jsx';
import DoctorModal, { PrescriptionModal } from './roleModals/doctor.jsx';
import { useSelector } from 'react-redux';
import Tab, { TabContainer } from '../container/tabs.jsx';
import { useFetchPatientsByIDQuery } from '../features/slices/patientSlice.jsx';
import { DiastolicData, bloodPressure, systolicData, tempData } from '../helpers/dataGen.js';
import { useFetchQuery } from '../features/slices/medicationsSlice.jsx';
import Patientsprescription from '../container/patientsprescription.jsx';



function PatientDetails() {
    const location = useLocation()
    const { details } = location.state
    const [show, setShow] = useState(false)
    const [pres, setPres] = useState(false)
    const [item, setItem] = useState({ patient_id: details._id, symptoms: "", tests: [] })
    const [prescription, setPrescription] = useState({ patient_id: details._id, details: "", drugs: [], labTest_id: "" })
    const [tabs, setTabs] = useState([
        { title: "observations", state: true },
        { title: "lab", state: false },
        { title: "statistics", state: false },
        { title: "history", state: false },
        { title: "account", state: false }
        // "All", "Lab", "Statistics", "history", "Accounts",
    ])
    const { data: symptoms, refetch: refetchSymptoms, isFetching: loadingSymptoms } = useGetsymptomsByPatientQuery(details._id)
    const { data: userTriage, refetch, isFetching } = useGetTriageByPatientQuery(details?.user_id?._id)

    const { data: results, refetch: refetchresults, isFetching: loadingResults } = useFetchUserResultsQuery(details._id)
    const { data: detail, } = useFetchPatientsByIDQuery(details._id)
    const { data: patientTries } = useGetAllTriageByPatientQuery(details?.user_id?._id)

    const { userInfo } = useSelector((state) => state.auth)
    bloodPressure(patientTries)

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
                        <MetaDatacontainer title="Name" value={`${detail?.user_id?.name} `} />
                        <MetaDatacontainer title="Age" value={_calculateAge(details.dob)} />
                        <MetaDatacontainer title="Gender" value={details.gender} />
                        <MetaDatacontainer title="Phone" value={detail?.user_id.phone} />
                        <MetaDatacontainer title="Email" value={detail?.user_id.email} />
                    </div>
                    {/* <StateusContainer />
                    <StateusContainer /> */}
                    <div className='pb-2 items-end flex flex-col justify-end'>
                        {userInfo.role === "Dr" ?
                            <div className='flex flex-row gap-x-1'>
                                <Button secondary title="Sent to lab" onClick={() => { setShow(true) }} />
                                {/* <Button secondary title="prescribe" onClick={() => { setPres(true) }} /> */}
                            </div>
                            : null}
                    </div>
                </div>
            </div>
            <Patientsprescription _id={details._id} />
            {userInfo.role !== "pharmacist" && <div className='w-full flex-col flex h-[200px] '>
                <TitleContainer title="Triage Info" />
                <div className='flex  w-full '>
                    <TriageItem title="temerature" value={userTriage?.temp} symbol='&#x2103;' />
                    <TriageItem title="Blood Pressure" lowerValue={userTriage?.bloodPressure?.lowerValue} upperValue={userTriage?.bloodPressure?.upperValue} symbol='mm Hg' />
                    <TriageItem title="Weight" value={userTriage?.weight} symbol='Kgs' />
                    <TriageItem title="Height" value={userTriage?.height} symbol='ft' />
                    <TriageItem title="Blood Sugar" value={userTriage?.bloodSugar} symbol='mg/dL (3.9 mmol/L) ' />
                </div>

            </div>}

            {userInfo.role !== "pharmacist" && <Tab data={tabs} onChange={handleTab} />}
            {userInfo.role !== "pharmacist" && tabs.map((tab, i) => (
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
                    <TabContainer title="observations" tab={tab} tab1="observations" body={<ObservationTable data={symptoms} />} />
                    <TabContainer title="Lab Results" tab={tab} tab1="lab" body={<LabTable open={(lab) => { setPres(true); setPrescription(prevState => ({ ...prevState, labTest_id: lab })) }} data={results} />} />
                    <TabContainer title="Patient History" tab={tab} tab1="history" body={<LabTable data={[]} />} />
                    <TabContainer title="Patient Payment History " tab={tab} tab1="account" body={<LabTable data={[]} />} />


                </div>
            ))
            }
            <DoctorModal isFetching={loadingSymptoms} refetch={refetchSymptoms} item={item} setItem={setItem} closeModal={() => { setShow(false); setItem({ patient_id: details._id, symptoms: "", tests: [] }) }} showModal={show} />
            <PrescriptionModal isFetching={loadingSymptoms} refetch={refetchresults} item={prescription} setItem={setPrescription} closeModal={() => { setPres(false); setItem({ patient_id: details._id, symptoms: "", tests: [] }) }} showModal={pres} />
        </Layout>
    )
}

export default PatientDetails