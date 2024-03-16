import React from 'react'
import { LabTableHead, ObsTableHead } from '../../data.json'
import Table, { TBody, TH, TableContainer, TableHead } from '../../container/table'
import moment from 'moment'
function LabTable(props) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    {LabTableHead.map((head, i) => (<TH key={i} title={head} />))}
                </TableHead>
                <TBody>
                    {props.data?.map(person => (
                        <tr key={person.email} onClick={() => props.open(person._id)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {moment(person.createdAt).format('Do MMM YYYY')}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {person.observation_id.symptoms}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {person.results.map((res, i) => (
                                    <div key={i} className="text-sm text-gray-900">{res.test_id.name}~ <span
                                        className={` inline-flex text-xs leading-5
    font-semibold rounded-full ${res.results === "present" ? " text-red-400" : " text-green-800"} `}
                                    >
                                        {res.results}
                                    </span></div>
                                ))}

                            </td>


                            <td className="px-6 py-4 whitespace-nowrap">
                                {person?.prescription_id?.drugs?.map((drug, i) => (
                                    <div key={i} className="text-sm text-gray-900">{drug.name} <span
                                        className={` inline-flex text-xs leading-5
  font-semibold rounded-full text-red-800 `}
                                    >
                                        {drug.dosage}
                                    </span></div>
                                    //                                 <span
                                    //                                     className="px-2 inline-flex text-xs leading-5
                                    // font-semibold rounded-full bg-green-100 text-green-800"
                                    //                                 >
                                    //                                      {drug.name}
                                    //                                 </span>
                                ))}
                            </td>

                        </tr>
                    ))}
                </TBody>
            </Table>
        </TableContainer>
    )
}

export function ObservationTable(props) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    {ObsTableHead.map((head, i) => (<TH key={i} title={head} />))}
                </TableHead>
                <TBody>
                    {props.data?.map((person, i) => (
                        <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {moment(person.createdAt).format("Do MMM YYYY")}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap sentensecase text-sm text-gray-500">
                                {person.symptoms}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <ul>
                                    {person.test_id.map((sym, i) => (
                                        <li key={i} className='flex flex-row items-center gap-x-3'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 h-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg><span className=' '>{sym.name}</span>
                                        </li>
                                    ))}
                                </ul>


                            </td>

                        </tr>
                    ))}
                </TBody>
            </Table>
        </TableContainer>
    )
}

export default LabTable