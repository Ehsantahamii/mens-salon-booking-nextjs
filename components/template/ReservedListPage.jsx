"use client"


const ReservedListPage = (data) => {
    console.log(data)
    return (
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-center  gap-4 py-4">
            {
                data.data ?
                    data?.data?.data?.times?.map((data, index) => (
                        <div className="w-[95%] mx-auto md:max-w-full flex-wrap justify-between text-black shadow bg-white py-8 px-6 rounded-xl flex  text-[1em]" key={index}>
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