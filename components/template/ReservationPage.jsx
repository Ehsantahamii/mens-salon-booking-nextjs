"use client"
import { Suspense, useState } from "react";
import { toast } from "react-toastify";
import { PiArrowCircleLeftFill, PiArrowCircleRightFill } from "react-icons/pi";
import { BiCalendar, BiTime, BiUser, BiChevronDown } from "react-icons/bi";
import { MdOutlineDesignServices } from "react-icons/md";

import { Swiper, SwiperSlide } from 'swiper/react';
import dynamic from "next/dynamic";

import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import "./ReservationPage.css"
import SetReserveModal from "../module/ReserveModal";
import Developmart from "../module/Developmart";
import api from "@/utils/axios";

const GuidBox = dynamic(() => import('../module/GuidBox'), { ssr: false })

const ReservationPage = ({ salonData }) => {
    const [serviceId, setServiceId] = useState("");
    const [providerId, setProviderId] = useState("");
    const [providers, setProviders] = useState(null);
    const [day, setDay] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [time, setTime] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [firstFreeDate, setFirstFreeDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [doReserveData, setDoReserveData] = useState(null);
    const [modal, setOpenModal] = useState(false);

    const handleServiceChange = async (event) => {
        const value = event.target.value;
        setServiceId(value);
        setDay(null);
        setFirstFreeDate(null);
        setProviderId("");
        setTime(null);

        if (!value || value === "0") {
            setProviders(null);
            return;
        }

        setIsLoading(true);
        try {
            const response = await api.post("/reservation/services/users", { id: value });
            setProviders(response.data.data);
        } catch (error) {
            toast.error(error.message || "خطا در دریافت اطلاعات خدمات‌دهندگان");
            setProviders(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchBtn = async (event) => {
        event.preventDefault();

        if (!serviceId || serviceId <= 0) {
            toast.error("لطفا یکی از خدمات ارائه شده را انتخاب کنید.");
            return;
        }

        if (!providerId || providerId <= 0) {
            toast.error("لطفا یکی از خدمات دهندگان ارائه شده را انتخاب کنید.");
            return;
        }

        setDay(null);
        setFirstFreeDate(null);
        setTime(null);
        setSearchLoading(true);

        try {
            const response = await api.post("/reservation/days", {
                service_id: serviceId,
                provider_id: providerId,
            });

            setDay(response.data.data.days);
            setFirstFreeDate(response.data.data.first_free_time);
        } catch (error) {
            const errorMsg = error.response?.status === 400
                ? "نوبتی جهت رزرو توسط خدمات دهنده ثبت نشده است."
                : error.message || "خطا در دریافت اطلاعات";
            toast.error(errorMsg);
            setDay(null);
            setTime(null);
        } finally {
            setSearchLoading(false);
        }
    };

    const handleGetHours = async (event) => {
        event.preventDefault();
        setTime(null);
        setIsLoading(true);

        try {
            const response = await api.post("/reservation/times", {
                day_id: selectedDate,
                service_id: serviceId,
                provider_id: providerId,
            });

            setTime(response.data.data.times);
        } catch (error) {
            toast.error(error.message || "خطا در دریافت ساعات");
            setTime(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDayClick = (dayId) => {
        setSelectedDate(dayId);
    };

    const openModal = (data) => {
        setDoReserveData(data);
        setOpenModal(true);
    };

    return (
        <section className="md:pt-[10%] pt-[25%] w-full min-h-[95svh] bg-gradient-to-b from-gray-50 to-white">
            <div className="w-[98%] mx-auto max-w-[1440px] text-textColor px-4">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        رزرو نوبت
                    </h1>
                    <p className="text-gray-600">
                        خدمات و زمان مورد نظر خود را انتخاب کنید
                    </p>
                </div>

                {/* Selection Form */}
                <form
                    onSubmit={handleSearchBtn}
                    className="max-w-[800px] mx-auto mb-12 bg-white rounded-2xl shadow-lg p-6 md:p-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                        {/* Service Selection */}
                        <div className="space-y-3">
                            <label
                                htmlFor="service_id"
                                className="flex items-center gap-2 text-gray-700 font-medium text-sm"
                            >
                                <MdOutlineDesignServices className="text-liteGold" size={20} />
                                انتخاب خدمات
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="service_id"
                                    id="service_id"
                                    value={serviceId}
                                    onChange={handleServiceChange}
                                    className="w-full appearance-none rounded-xl border-2 border-gray-200 focus:border-liteGold focus:ring-4 focus:ring-liteGold/10 transition-all p-4 pr-12 outline-none cursor-pointer hover:border-liteGold/50 bg-white text-gray-800 font-medium"
                                >
                                    <option value="" className="text-gray-500 w-full">
                                        انتخاب کنید...
                                    </option>
                                    {salonData?.services?.map((item) => (
                                        <option
                                            key={item.id}
                                            value={Number(item.id)}
                                            className="py-3 text-gray-800 hover:bg-liteGold/10"
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <BiChevronDown
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-transform"
                                    size={24}
                                />
                            </div>
                        </div>

                        {/* Provider Selection */}
                        <div className="space-y-3">
                            <label
                                htmlFor="provider_id"
                                className="flex items-center gap-2 text-gray-700 font-medium text-sm"
                            >
                                <BiUser className="text-liteGold" size={20} />
                                انتخاب خدمات‌دهنده
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="provider_id"
                                    id="provider_id"
                                    value={providerId}
                                    disabled={!providers}
                                    onChange={(e) => setProviderId(e.target.value)}
                                    className="w-full appearance-none rounded-xl border-2 border-gray-200 focus:border-liteGold focus:ring-4 focus:ring-liteGold/10 transition-all p-4 pr-12 outline-none cursor-pointer hover:border-liteGold/50 bg-white text-gray-800 font-medium disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
                                >
                                    <option value="" className="text-gray-500">
                                        انتخاب کنید...
                                    </option>
                                    {providers?.map((item) => (
                                        <option
                                            key={item.id}
                                            value={Number(item.id)}
                                            className="py-3 text-gray-800"
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <BiChevronDown
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all ${providers ? 'text-gray-400' : 'text-gray-300'
                                        }`}
                                    size={24}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Search Button */}
                    <div className="flex justify-center">
                        {searchLoading ? (
                            <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-liteGold" />
                        ) : (
                            <button
                                type="submit"
                                className="px-8 py-3  bg-semiLiteGold text-textColor font-bold rounded-xl transition-all transform  shadow hover:shadow-md"
                            >
                                جستجوی نوبت‌ها
                            </button>
                        )}
                    </div>
                </form>

                {/* First Available Time Card */}
                {firstFreeDate?.day && (
                    <div className="max-w-[800px] mx-auto mb-8">
                        <div className="bg-gradient-to-r from-liteGold/10 to-semiLiteGold/10 border-2 border-liteGold/30 rounded-xl p-6 shadow-md">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <BiCalendar className="text-liteGold" size={24} />
                                    <div>
                                        <p className="font-medium">اولین نوبت خالی</p>
                                        <p className="text-sm">
                                            {firstFreeDate.day} - ساعت {firstFreeDate.time}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => openModal(firstFreeDate)}
                                    type="button"
                                    className="px-6 py-2.5 bg-liteGold hover:bg-semiLiteGold text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-md"
                                >
                                    رزرو سریع
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Days Slider */}
                {day?.length > 0 && (
                    <div className="max-w-[900px] mx-auto mb-12">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 px-2">
                            <BiCalendar className="text-liteGold" size={24} />
                            انتخاب روز
                        </h2>
                        <div className="flex gap-3 items-center px-2">
                            <button
                                className="review-swiper-button-next cursor-pointer transition-transform hover:scale-110 flex-shrink-0 z-10"
                                type="button"
                            >
                                <PiArrowCircleRightFill className="fill-liteGold" size={44} />
                            </button>

                            <div className="flex-1 overflow-hidden">
                                <Swiper
                                    className="day-swiper !p-6"
                                    modules={[Navigation]}
                                    navigation={{
                                        nextEl: '.review-swiper-button-next',
                                        prevEl: '.review-swiper-button-prev',
                                    }}
                                    slidesPerView={4}
                                    spaceBetween={16}
                                    breakpoints={{
                                        320: { slidesPerView: 1, spaceBetween: 12 },
                                        640: { slidesPerView: 1, spaceBetween: 16 },
                                        768: { slidesPerView: 4, spaceBetween: 16 },
                                        1024: { slidesPerView: 4, spaceBetween: 20 },
                                    }}
                                >
                                    {day.map((item) => (
                                        <SwiperSlide key={item.id} className="h-auto">
                                            <form onSubmit={handleGetHours} className="h-full">
                                                <button
                                                    type="submit"
                                                    onClick={() => handleDayClick(item.id)}
                                                    disabled={isLoading}
                                                    className={`w-full h-full p-5 rounded-xl transition-all transform hover:scale-105 ${selectedDate === item.id
                                                        ? 'bg-gradient-to-br from-liteGold to-semiLiteGold text-white shadow-xl scale-105'
                                                        : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg'
                                                        }`}
                                                >
                                                    <h3 className=" text-md font-bold md:text-lg mb-2">
                                                        {item.label}
                                                    </h3>
                                                    <p className="text-sm opacity-90">
                                                        {item.day}
                                                    </p>
                                                </button>
                                            </form>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>

                            <button
                                className="review-swiper-button-prev cursor-pointer transition-transform hover:scale-110 flex-shrink-0 z-10"
                                type="button"
                            >
                                <PiArrowCircleLeftFill className="fill-liteGold" size={44} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center my-8">
                        <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-liteGold" />
                    </div>
                )}

                {/* Time Slots */}
                {time?.length > 0 && (
                    <div className="max-w-[900px] mx-auto mb-12 px-2">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <BiTime className="text-liteGold" size={24} />
                            انتخاب ساعت
                        </h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                            {time.map((data) => (
                                <button
                                    key={data.id}
                                    disabled={data.reserved || isLoading}
                                    onClick={() => openModal(data)}
                                    className={`p-3 rounded-lg font-medium transition-all transform ${data.reserved
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        : 'bg-white hover:bg-liteGold hover:text-white hover:scale-105 hover:shadow-lg text-gray-700 shadow-md'
                                        }`}
                                >
                                    {data.time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {day?.length === 0 && !searchLoading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            نوبتی جهت انتخاب یافت نشد.
                        </p>
                    </div>
                )}

                {/* Modal */}
                {modal && (
                    <Suspense fallback={
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                            <div className="bg-white rounded-2xl p-8 shadow-xl">
                                <div className="animate-spin w-8 h-8 border-4 border-liteGold border-t-transparent rounded-full mx-auto"></div>
                                <p className="text-gray-600 text-sm mt-4">در حال بارگذاری...</p>
                            </div>
                        </div>
                    }>
                        <SetReserveModal
                            doReserveData={doReserveData}
                            setOpenModal={setOpenModal}
                        />
                    </Suspense>

                )}

                <GuidBox />
                <Developmart />
            </div>
        </section>
    );
};

export default ReservationPage;
