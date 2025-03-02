"use client"

import ReservedContext from "@/context/ReservedContext";
import { useContext } from "react";

const page = () => {
    const { reservedData } = useContext(ReservedContext);
    // window.onbeforeunload = function () {
    //     return "you can not refresh the page";
    // }
    return (
        <section className="w-[100vw] h-screen flex items-center justify-center">
            {
                reservedData && <div className="w-[85%] max-w-[320px] shadow px-6 py-8">
                    <div className="flex flex-col justify-center items-center gap-4 font-semibold">
                        <img className="w-24 h-24 mx-auto" src="/images/ok-result.png" alt="ok-result" />
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
                </div>

            }
        </section>
    );
};

export default page;