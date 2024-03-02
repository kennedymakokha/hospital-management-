import React from 'react'
import { LabTableHead } from '../../data.json'
import Table, { TBody, TH, TableContainer, TableHead } from '../../container/table'
function LabTable(props) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    {LabTableHead.map((head, i) => (<TH key={i} title={head} />))}
                </TableHead>
                <TBody>
                    {props.data?.map(person => (
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
        </TableContainer>
    )
}

export default LabTable