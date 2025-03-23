"use client"

import { useState } from "react";
import DeleteReserveModal from "../module/DeleteReserveModal";


const ReservedListPage = (data) => {
    const [modal, setOpenModal] = useState(false);
    return (
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-center  gap-4 py-4">
            {
                data.data ?
                    data?.data?.data?.times?.map((data, index) => (
                        <div className="w-[95%] mx-auto md:max-w-full flex-wrap justify-between text-black shadow bg-white py-8 px-6 rounded-xl flex  text-[1em]" key={index}>
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
                                {
                                    modal && <DeleteReserveModal data={data} modal={modal} setOpenModal={setOpenModal} />

                                }
                                <button type="submit" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  dark:shadow-red-800/80 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center "
                                    onClick={() => setOpenModal(true)}
                                >حذف نوبت</button>
                            </div>
                        </div>

                    ))
                    :
                    (<p>
                        هیچ نوبت ثبت شده ای برای نمایش وجود ندارد.
                    </p>)

            }
        </ div>
    );
};

export default ReservedListPage;