"use client"

import ReservedContext from "@/context/ReservedContext";
import { useContext } from "react";
import Lottie from 'react-lottie-player';
import runFile from "../../lottie/Animation - 1741003650231.json";
import Link from "next/link";


const ResultPage = () => {
    const { reservedData } = useContext(ReservedContext);
    return (
        <section className="w-[100vw] h-screen  relative flex items-center justify-center">
            {
                reservedData ?
                    <div className="w-[85%] bg-white max-w-[320px] shadow-md rounded-lg px-6 py-8">
                        <div className="flex flex-col justify-center items-center gap-4 font-semibold">
                            <Lottie animationData={runFile} play loop={false} className='w-28 h-28 mx-auto' />
                            <h2>
                                نوبت شما با موفقیت ثبت شد.
                            </h2>
                        </div>
                        <div className="my-8">
                            <div className="flex justify-between">
                                <div>
                                    خدمات:
                                </div>
                                <div>
                                    {
                                        reservedData?.service
                                    }
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    خدمات دهنده:
                                </div>
                                <div>
                                    {
                                        reservedData?.provider
                                    }
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    تاریخ:
                                </div>
                                <div>
                                    {
                                        reservedData?.date
                                    }
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div>
                                    ساعت:
                                </div>
                                <div>
                                    {
                                        reservedData?.time
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-end">
                            <Link className="font-light underline" href="/reserved-list">مشاهده</Link>
                        </div>
                    </div>
                    : ""

            }
        </section>
    );
};

export default ResultPage;