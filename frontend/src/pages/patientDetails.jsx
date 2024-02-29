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
function PatientDetails() {
    const location = useLocation()
    const { details } = location.state

    const [chartData, setChartData] = useState({

    });

    const { data: userTriage, refetch, isFetching } = useGetTriageByPatientQuery(details._id)
    const { data: patientTries } = useGetAllTriageByPatientQuery(details._id)
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

    const MetaDatacontainer = (props) => (
        <h1 className='font-bold text-sm  p-2 text-slate-600'>{props.title}:<span className='font-semibold  px-2'>{props.value}</span></h1>
    )

    const Titlecontainer = (props) => (
        <div className='w-full flex  items-center justify-center py-2 flex-col'>
            <h2 className='text-center text-slate-500 font-bold'>{props.title}</h2>
            <img src={underline} className='py-1' alt='' />
        </div>)

    const TriageItem = (props) => {

        return (
            <div className='w-1/4 px-1 flex-col flex h-full '>
                <div className={`w-full h-[100px] flex items-center justify-center  flex-col 
            ${props.symbol === 'mm Hg' && props.lowerValue < 80 && props.upperValue < 120 && "bg-[#a6ce39]"}
            ${props.symbol === 'mm Hg' && props.lowerValue < 80 && props.upperValue > 120 && props.upperValue < 129 && "bg-[#ffec00]"}
            ${props.symbol === 'mm Hg' && props.lowerValue < 89 && props.lowerValue > 80 && props.upperValue > 130 && props.upperValue < 199 && "bg-[#ffb600]"}
            ${props.symbol === 'mm Hg' && props.lowerValue > 90 && props.upperValue > 140 && "bg-[#ba3a02] ,animate-blinkingBg"}
            ${props.symbol === 'mm Hg' && props.lowerValue > 120 && props.upperValue > 190 && "bg-[#990711] animate-blinkingBg"}
             bg-white inner-shadow shadow-sm rounded-md`}>
                    <p className='font-bold text-sm '>{props.symbol === 'mm Hg' ? <>{props.lowerValue}/{props.upperValue}</> : props.value} {props.symbol}</p>
                    <h2 className='text-center text-slate-500 capitalize text-sm  font-bold'>{props.title}</h2>
                </div>
            </div >)
    }

    return (
        <Layout>
            <div className=' flex w-full h-[200px]'>
                <div className='w-1/3 h-[200px] flex items-center justify-center '>
                    <div className='w-[200px] h-[200px] bg-blue-100 rounded-full '>
                        <img src="https://bit.ly/33HnjK0" className='w-[200px] h-[200px] rounded-lg ' alt="" />
                    </div>

                </div>

                <div className='w-2/3 h-[200px] bg-slate-100 inner-shadow shadow-xl rounded-md'>
                    <MetaDatacontainer title="Name" value={`${details.firstName} ${details.lastName}`} />
                    <MetaDatacontainer title="Age" value={_calculateAge(details.dob)} />
                    <MetaDatacontainer title="Gender" value={details.gender} />
                    <MetaDatacontainer title="Phone" value={details.phone} />
                    <MetaDatacontainer title="Email" value={details.email} />
                    {/* <h1 className='font-bold  p-2 text-slate-600'>Name:<span className='font-semibold  px-2'>Kennedy Makokha</span></h1> */}
                </div>
                {/* <div className='w-[600px] h-[20px] bg-blue-100 rounded-full '>
                        <LineChart />
                    </div> */}

            </div>
            <div className='w-full flex-col flex h-[200px] '>
                <Titlecontainer title="Triage Info" />
                <div className='flex  w-full '>
                    <TriageItem title="temerature" value={userTriage?.temp} symbol='&#x2103;' />
                    <TriageItem title="Blood Pressure" lowerValue={userTriage?.bloodPressure?.lowerValue} upperValue={userTriage?.bloodPressure?.upperValue} symbol='mm Hg' />
                    <TriageItem title="Weight" value={userTriage?.weight} symbol='Kgs' />
                    <TriageItem title="Height" value={userTriage?.height} symbol='ft' />
                    <TriageItem title="Blood Sugar" value={userTriage?.bloodSugar} symbol='mg/dL (3.9 mmol/L) ' />
                </div>

            </div>
            <div className='w-full flex h-[400px]  '>
                <div className='h-1/3 w-1/3 p-1'>
                    <LineChart Data1={DiastolicData} type="line" Data2={systolicData} double title="Blood Pressure" />
                </div>
                <div className='h-1/3 p-1 w-1/3'>
                    <LineChart Data1={tempData} type="spline" double title="Temprature" />
                </div>
                <div className='h-1/3 p-1 w-1/3'>
                    <LineChart Data1={tempData} type="stepLine" double title="Blood Sugar" />
                </div>

                {/* <TableContainer>

                    <Table>
                        <TableHead>
                            {PatientHistoryTableHead.map((head, i) => (<TH key={i} title={head} />))}
                        </TableHead>
                        <TBody>
                            {[]?.map(person => (
                                <tr key={person.email}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {moment().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{!person.referal && "N/A"}</div>

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className="px-2 inline-flex text-xs leading-5
      font-semibold rounded-full bg-green-100 text-green-800"
                                        >
                                            {person.firstName}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className="px-2 inline-flex text-xs leading-5
      font-semibold rounded-full bg-green-100 text-green-800"
                                        >
                                            {person.dob}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </TBody>
                    </Table>
                </TableContainer> */}

            </div>
        </Layout>
    )
}

export default PatientDetails