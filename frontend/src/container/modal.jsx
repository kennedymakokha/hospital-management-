
import React, { useEffect, useState } from "react";
import Button from "./Button";

const Modal = (props) => {
    const { showModal, item } = props

    useEffect(() => {
        // console.log("props.item")
    }, [])
    return (
        <>

            {showModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className={`relative ${props.width ? props.width : "w-3/4"} my-6 mx-auto max-w-3xl`}>
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-xl font-semibold capitalize  text-slate-600 ">{props.title}</h3>
                                    <button
                                        className="bg-primary-100 border-0 text-black rounded-full  float-right"
                                        onClick={() => props.closeModal()}
                                    >
                                        <span className="text-slate-100  h-6 w-6 text-xl block bg-primary-100  flex items-center justify-center rounded-full">
                                            x
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    {props.body}
                                </div>
                                <div className="flex gap-x-1 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">

                                    <Button

                                        secondary title="Close" onClick={() => { props.closeModal() }} />
                                    <Button

                                        primary title={props.buttontitle} onClick={() => { props.submit() }} />


                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null
            }
        </>
    );
};

export default Modal;

