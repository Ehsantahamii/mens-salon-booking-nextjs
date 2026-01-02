"use client"

import ReservedContext from "@/context/ReservedContext";
import { useContext } from "react";
import Lottie from 'react-lottie-player';
import runFile from "../../lottie/Animation - 1741003650231.json";
import Link from "next/link";
import { BiCalendar, BiTime, BiUser, BiArrowBack } from "react-icons/bi";
import { MdOutlineDesignServices } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const ResultPage = () => {
    const { reservedData } = useContext(ReservedContext);

    return (
        <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-liteGold/5 relative flex items-center justify-center p-4">
            {reservedData ? (
                <div className="w-full max-w-[900px] bg-white shadow-2xl rounded-2xl overflow-hidden animate-slideUp">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                <IoCheckmarkCircleOutline className="text-white" size={48} />
                            </div>
                            <div className="text-center md:text-right">
                                <h2 className="text-white font-bold text-2xl md:text-3xl">
                                    رزرو با موفقیت انجام شد
                                </h2>
                                <p className="text-white/90 text-sm mt-1">
                                    نوبت شما با موفقیت در سیستم ثبت شد
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content - Two Column Layout for Desktop */}
                    <div className="p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">

                            {/* Right Column - Animation & Info Box */}
                            <div className="flex flex-col gap-6">
                                <div className="flex justify-center">
                                    <Lottie
                                        animationData={runFile}
                                        play
                                        loop={false}
                                        className='w-32 h-32 md:w-40 md:h-40'
                                    />
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                                    <p className="text-center text-green-700 font-medium text-sm leading-relaxed">
                                        نوبت شما با موفقیت ثبت شد. جزئیات رزرو در کنار نمایش داده شده است.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                                    <p className="text-center text-xs text-gray-600 leading-relaxed">
                                        کد رزرو شما پس از تأیید نهایی از طریق پیامک ارسال خواهد شد
                                    </p>
                                </div>
                            </div>

                            {/* Left Column - Reservation Details */}
                            <div className="flex flex-col gap-4">

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="p-2 bg-liteGold/10 rounded-lg">
                                        <MdOutlineDesignServices className="text-liteGold" size={22} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 mb-1">خدمت</p>
                                        <p className="font-semibold text-gray-800">
                                            {reservedData?.service}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="p-2 bg-liteGold/10 rounded-lg">
                                        <BiUser className="text-liteGold" size={22} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 mb-1">خدمات‌دهنده</p>
                                        <p className="font-semibold text-gray-800">
                                            {reservedData?.provider}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="p-2 bg-liteGold/10 rounded-lg">
                                        <BiCalendar className="text-liteGold" size={22} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 mb-1">تاریخ</p>
                                        <p className="font-semibold text-gray-800">
                                            {reservedData?.date}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="p-2 bg-liteGold/10 rounded-lg">
                                        <BiTime className="text-liteGold" size={22} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 mb-1">ساعت</p>
                                        <p className="font-semibold text-gray-800">
                                            {reservedData?.time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row gap-3 mt-6 md:mt-8">
                            <Link
                                href="/reserved-list"
                                className="flex items-center justify-center gap-2 flex-1 py-3.5 bg-gradient-to-r from-liteGold to-semiLiteGold hover:from-semiLiteGold hover:to-liteGold text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                مشاهده لیست رزروها
                                <BiArrowBack size={20} />
                            </Link>

                            <Link
                                href="/"
                                className="flex items-center justify-center gap-2 flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all"
                            >
                                بازگشت به صفحه اصلی
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-[420px] bg-white shadow-xl rounded-2xl p-8 text-center">
                    <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <IoCheckmarkCircleOutline className="text-red-500" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        اطلاعات رزرو یافت نشد
                    </h3>
                    <Link
                        href="/reserved-list"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-liteGold to-semiLiteGold text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                        بازگشت به صفحه اصلی
                    </Link>
                </div>
            )}
        </section>
    );
};

export default ResultPage;
