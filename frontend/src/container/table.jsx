
import React from 'react'
import Loader from './loader'

export function TableContainer(props) {
    return (

        <div className="flex flex-col">
            {props.isFetching ? <div className='flex h-[300px] w-full items-center justify-center'>
                <Loader />
            </div> : <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">

                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">

                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <h2>{props.tableTitle}</h2>
                        {props.children}
                    </div>
                </div>
            </div>}
        </div>
    )
}
export function TableTitle(props) {
    return (
        <h2 className="text-slate-500 font-semibold capitalize m-2">
            {props.tableTitle}
        </h2>
    )
}


export default function Table(props) {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            {props.children}
        </table>
    )
}
export function TableHead(props) {
    return (
        <thead className="bg-gray-50">
            {props.children}
        </thead>
    )
}
export function TH(props) {
    return (

        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            {props.title}
        </th>

    )
}
export function TBody(props) {
    return (

        <tbody className="bg-white divide-y divide-gray-200">
            {props.children}
        </tbody>

    )
}


{/* <table className="min-w-full divide-y divide-gray-200">
                
                <tbody className="bg-white divide-y divide-gray-200">
                    {people.map(person => (
                        <tr key={person.email}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                        <div className="text-sm text-gray-500">{person.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{person.title}</div>
                                <div className="text-sm text-gray-500">{person.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className="px-2 inline-flex text-xs leading-5
      font-semibold rounded-full bg-green-100 text-green-800"
                                >
                                    Active
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {person.role}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
