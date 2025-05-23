"use client"
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { PiArrowCircleLeftFill, PiArrowCircleRightFill } from "react-icons/pi";

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


const ReservationPage = (salonData) => {
    const [serviceId, setServiceId] = useState();
    const [providerId, setProviderId] = useState();
    const [providers, setProviders] = useState();
    const [day, setDay] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [time, setTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState();
    const [firstFreeDate, setFirstFreeDate] = useState({});
    const [empty, isEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [doReserveData, setDoReserveData] = useState();
    const [modal, setOpenModal] = useState(false);



    const handleServiceChange = async (event) => {
        const value = event.target.value;
        setServiceId(value);
        setDay(null);
        setFirstFreeDate({})
        setIsLoading(true);
        if (value === "" || value === "0") {
            setProviders(null);
            setIsLoading(false);

            return;
        }

        try {
            const response = await api.post("/reservation/services/users", {
                id: value,
            });

            setProviders(response.data.data);
        } catch (error) {
            toast.error(error.message);
            setProviders(null);

        } finally {
            setIsLoading(false);
        }
    };
    const handleSearchBtn = async (event) => {
        event.preventDefault()
        setDay(null);
        setFirstFreeDate("")
        setTime(null)
        setSearchLoading(true);

        // Validate serviceId and providerId
        if (!serviceId || serviceId <= 0) {
            toast.dismiss();
            toast.error("لطفا یکی از خدمات ارائه  شده را انتخاب کنید.");
            setSearchLoading(false);
            return;
        }

        if (!providerId || providerId <= 0) {
            toast.dismiss();
            toast.error("لطفا یکی از خدمات دهندگان ارائه  شده را انتخاب کنید.");
            setSearchLoading(false);
            return;
        }


        try {
            const response = await api.post("/reservation/days", {
                service_id: serviceId,
                provider_id: providerId,

            });

            setDay(response.data.data.days);
            setFirstFreeDate(response.data.data.first_free_time);
        } catch (error) {
            if (error.message === "Request failed with status code 400") {
                toast.error("نوبتی جهت رزرو توسط خدمات دهنده ثبت نشده است.")
            } else {
                toast.error(error.message)
            }
            setDay(null);
            setTime(null)

        } finally {
            setSearchLoading(false);
        }
    };

    const handleGetHours = async (event) => {
        event.preventDefault()
        setTime([]);
        setIsLoading(true);

        try {
            const response = await api.post("/reservation/times", {
                day_id: selectedDate,
                service_id: serviceId,
                provider_id: providerId,

            });

            setTime(response.data.data.times);
        } catch (error) {

            toast.error(error.message);
            setTime(null);
            setIsLoading(false);


        } finally {
            setIsLoading(false);
        }
    };
    const handleDayClick = (data) => {
        setSelectedDate(data)
    };


    const openModal = (data) => {
        setDoReserveData(data);
        setOpenModal(true);
    };


    return (
        <section className="md:pt-[10%] relative pt-[25%] w-[98%] mx-auto max-w-[1440px] text-textColor">
            <form onSubmit={handleSearchBtn} className="flex max-w-[640px] flex-col gap-8  mx-auto py-8" encType="multipart/form-data">
                <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-12">
                    <div className="flex flex-col w-[85%] md:w-[48%] mx-auto">
                        <label htmlFor="service_id">
                            خدمات مورد نظر خود را انتخاب کنید
                            <span className="text-liteGold">
                                *
                            </span>

                        </label>

                        <select name="service_id" id="service_id" className="rounded shadow cursor-pointer transition-all focus:transition-all p-2 border-b-[1px]"
                            onChange={handleServiceChange}
                        >
                            <option value="">انتخاب کنید ...</option>
                            {
                                salonData.salonData.services && salonData.salonData.services.map((item) => {
                                    return <option key={item.id} value={Number(item.id)}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="flex flex-col w-[85%] md:w-[48%] mx-auto">
                        <label htmlFor="provider_id">
                            اجرا کننده خدمات را انتخاب کنید
                            <span className="text-liteGold">
                                *
                            </span>
                        </label>
                        <select name="provider_id" id="provider_id" disabled={!providers} className="rounded shadow cursor-pointer transition-all focus:transition-all p-2 border-b-[1px]"
                            onChange={(e) => setProviderId(e.target.value)}
                        >
                            <option value="">انتخاب کنید ...</option>
                            {
                                providers?.map((item) => {
                                    return <option className=" rounded shadow cursor-pointer px-2" key={item.id} value={+item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                {
                    searchLoading ?
                        <div className="text-center">
                            <div
                                className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-liteGold mx-auto"
                            ></div>
                        </div>

                        :
                        <button type="submit" className="max-w-[150px] mx-auto px-4 py-2 hover:bg-liteGold  bg-semiLiteGold transition-colors rounded-lg"  >
                            جستجوی
                        </button>
                }

            </form>

            <div className="max-w-[640px] mx-auto">
                {
                    empty == false && day.length == 0 && <p>نوبتی جهت انتخاب یافت نشد.</p>
                }
                {
                    firstFreeDate?.day &&
                    <div className=" flex flex-col md:flex-row justify-between rounded-lg shadow items-center text-center md:text-right  my-2 py-2 w-[95vw] max-w-[340px] md:max-w-full mx-auto px-2 text-[14px]">
                        <div className="pb-2 sm:pb-0">
                            اولین نوبت خالی برای شما برابربا
                            {firstFreeDate?.day}
                            ساعت
                            {firstFreeDate?.time}
                            می باشد.
                        </div>
                        <div className="flex justify-end items-center">
                            <input type="hidden" name="time_id" id="time_id" defaultValue="1" value={selectedTime} />
                            <button
                                className="hover:bg-liteGold  bg-semiLiteGold transition-colors  px-4 flex items-center justify-center py-1 shadow rounded-lg text-[14px] cursor-pointer"
                                onClick={() => {
                                    openModal(firstFreeDate)
                                }}
                                type="submit"
                                disabled={isLoading}>
                                رزرو کنید
                            </button>
                        </div>
                    </div>
                }

                {

                    day?.length > 0 && <div className="swiper-container flex gap-6 justify-between items-center">
                        <div className="icon-arrow-long-right review-swiper-button-next cursor-pointer transition-all">
                            <PiArrowCircleRightFill className="fill-liteGold" width="100%" height="100%" size={38} />
                        </div>

                        <Swiper
                            className="day-swiper w-[90%] cursor-grab"
                            modules={[Navigation]}
                            navigation={{
                                nextEl: '.review-swiper-button-next',
                                prevEl: '.review-swiper-button-prev',
                            }}
                            slidesPerView={5}
                            spaceBetween={20}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 40,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 50,
                                },
                            }}
                        >

                            {
                                day?.map((item => (
                                    <SwiperSlide className={`day-slide relative w-[200px] text-[#000] h-[100px] p-2 my-4 shadow rounded-lg cursor-pointer ${selectedDate == item.id ? "transition-all border-[2px] border-liteGold border-dashed" : "opacity-70"} `} title={item.date} key={item.id}
                                        onClick={() => handleDayClick(item.id)} >
                                        <form onSubmit={handleGetHours} >
                                            <button type="submit" disabled={isLoading} className={`w-full h-full `} onClick={() => handleDayClick(item.id)}>
                                                <h3 className="font-medium">
                                                    {item.label}
                                                </h3>
                                                <h4 className="mb-1" >
                                                    {item.day}
                                                </h4>

                                            </button>
                                        </form>

                                    </SwiperSlide>

                                )))
                            }
                        </Swiper>


                        <div className="icon-arrow-long-left review-swiper-button-prev cursor-pointer transition-opacity" >
                            <PiArrowCircleLeftFill width="100%" height="100%" size={38} className="fill-liteGold" />
                        </div>
                    </div>
                }

            </div>
            {
                isLoading &&
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-liteGold mx-auto"
                    ></div>
                </div>

            }

            <div className="flex flex-wrap justify-center gap-2 pt-6 pb-12 max-w-[640px] mx-auto ">
                {
                    time?.map((data, index) => (
                        <div key={index}>
                            <button disabled={data.reserved == true ? true : false || isLoading == true} title={data.time} key={data.id} className={`px-2 py-1 rounded-lg transition-transform ${data.reserved == true ? "bg-neutral-400 cursor-not-allowed" : "bg-neutral-100 hover:translate-y-[-5px]  cursor-pointer"}`}
                                onClick={() => {
                                    openModal(data)
                                }}
                            >
                                {data.time}
                            </button>
                        </div>
                    ))
                }
                {
                    modal && <SetReserveModal doReserveData={doReserveData} setOpenModal={setOpenModal} />

                }

            </div>
            <GuidBox />
            <Developmart />
        </section >
    );
};

export default ReservationPage;