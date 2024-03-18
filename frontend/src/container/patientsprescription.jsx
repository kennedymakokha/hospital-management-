import React, { useEffect, useState } from 'react'
import Table, { TBody, TH, TableContainer, TableHead, TableTitle } from './table';
import { PrescriptionsTableHead } from '../data.json'
import { useFetchUserPrescriptionsQuery, usePostSalesMutation } from '../features/slices/symptomsSlice';
import { Link } from 'react-router-dom';
import Button, { ButtonSM } from './Button';
import InputContainer from './input';
import { toast } from 'react-toastify';
function Patientsprescription(props) {
    const { data: prescriptions, isFetching, refetch } = useFetchUserPrescriptionsQuery(props._id)

    const [data, setData] = useState(prescriptions)
    const [postSales] = usePostSalesMutation();

    const [total, setTotal] = useState(0)

    const onValueChange = (index) => (e) => {
        var theRandomNumber = Math.floor(Math.random() * 1000) + 1;
        const newArray = data.map((item, i) => {
            if (index === i) {
                setTotal(total + theRandomNumber)
                console.log(theRandomNumber)
                return { ...item, dispenced: true, price: theRandomNumber };
            } else {
                return item;
            }
        });
        setData(newArray);

    };

    useEffect(() => {
        setData(prescriptions)
    }, [prescriptions])
    const submit = async () => {
        try {
            await postSales(data)
            refetch()
            toast("Sales Posted Successfully")
        } catch (error) {

        }
        // console.log(data)
    }
    return (
        <TableContainer isFetching={isFetching}>
            <div className='flex items-center justify-center'>
                <TableTitle tableTitle={" All system users"} />
            </div>

            <div className='px-3 w-[200px] float-right mb-2 flex justify-center items-center py-2 rounded-md shadow-xl bg-secondary-100 text-slate-100'>Ksh {total}.00</div>
            <Table>

                <TableHead>
                    {PrescriptionsTableHead.map((head, i) => (<TH key={i} title={head} />))}
                </TableHead>

                <TBody>
                    {data?.map((person, i) => (
                        <tr key={person?._id} onClick={onValueChange(i)}>
                            <td className={`px-6 py-4 whitespace-nowrap ${person?.dispenced && "line-through"}`}>
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{person?.drug_id?.name} <span className='text-xs text-slate-400'>{person.dosage}</span></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{person?.price}</div>
                            </td>
                        </tr>
                    ))}
                </TBody>
            </Table>

            <Button onClick={submit} primary right title="submit" />
        </TableContainer>
    )
}

export default Patientsprescription