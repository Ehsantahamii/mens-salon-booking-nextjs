"use client"

import { useState } from "react";
import DeleteReserveModal from "../module/DeleteReserveModal";


const ReservedListPage = (data) => {
    const [modal, setOpenModal] = useState(false);
    const [selectedTimeId, setSelectedTimeId] = useState(null);
    const openModal = (timeId) => {
        setSelectedTimeId(timeId);
        setOpenModal(true);
    };
    return (
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-center  gap-4 py-4">

            {
                data.data ?
                    data?.data?.data?.times?.map((data, index) => (
                        <div className={`${data?.cancel === 0 ? "cursor-not-allowed grayscale bg-gray-200" : "bg-white"} w-[95%] mx-auto md:max-w-full relative flex-wrap justify-between text-black shadow bg-white py-8 px-6 rounded-xl flex  text-[1em] `} key={index}>
                            {
                                data?.cancel === 0 && <img className="absolute inset-0 m-auto  max-w-[100px] sm:max-w-[150px]" src="/images/monghazii.svg" alt="منقضی شده" />
                            }
                            <div>
                                <p >
                                    <span className="opacity-60">
                                        سرویس:
                                    </span>
                                    <span >
                                        {data.services}
                                    </span>
                                </p>
                                <p >
                                    <span className="opacity-60">
                                        روز:
                                    </span>
                                    <span >
                                        {data.day}
                                    </span>
                                </p>
                                <p >
                                    <span className="opacity-60">
                                        ساعت:
                                    </span>
                                    <span >
                                        {data.time}
                                    </span>
                                </p>
                                <p >
                                    <span className="opacity-60">
                                        خدمات دهنده:
                                    </span>
                                    <span >
                                        {data.provider}
                                    </span>
                                </p>

                            </div>
                            <div >
                                <div>
                                    <button type="submit" disabled={data?.cancel === 0} className={`${data?.cancel === 0 ? "cursor-not-allowed" : "cursor-pointer"} transition-colors hover:transition-colors text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  dark:shadow-red-800/80 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center`}
                                        onClick={() => openModal(data)}
                                    >حذف نوبت</button>
                                </div>
                            </div>
                        </div>

                    ))
                    :
                    (<p>
                        هیچ نوبت ثبت شده ای جهت نمایش وجود ندارد.
                    </p>)

            }
            {
                modal && <DeleteReserveModal selectedTimeId={selectedTimeId} setOpenModal={setOpenModal} />
            }

        </ div>
    );
};

export default ReservedListPage;