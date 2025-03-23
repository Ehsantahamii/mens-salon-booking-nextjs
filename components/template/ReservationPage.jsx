"use client"
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { PiArrowCircleLeftFill, PiArrowCircleRightFill } from "react-icons/pi";

import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import "./ReservationPage.css"
import { useFormState } from "react-dom";
import { sendReserveTime } from "@/actions/ReserveActions";
import ReservedContext from "@/context/ReservedContext";
import Lottie from 'react-lottie-player';
import runFile from "../../lottie/Animation - 1741943887225.json";


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
    const router = useRouter();
    const { saveReservedData } = useContext(ReservedContext)
    const [stateSendTime, formActionSendTime] = useFormState(sendReserveTime, {});

    const handleServiceChange = async (event) => {
        const value = event.target.value;
        setServiceId(value);
        setIsLoading(true);
        if (value === "" || value === "0") {
            setProviders(null);
            setIsLoading(false);

            return;
        }

        try {
            const response = await axios.post("https://admin.developmart.ir/api/v1/reservation/services/users", {
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
            const response = await axios.post("https://admin.developmart.ir/api/v1/reservation/days", {
                service_id: serviceId,
                provider_id: providerId,

            });

            setDay(response.data.data.days);
            setFirstFreeDate(response.data.data.first_free_time);
        } catch (error) {
            toast.error(error.message);
            toast.error("خطایی در ارسال درخواست رخ داد");
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
            const response = await axios.post("https://admin.developmart.ir/api/v1/reservation/times", {
                day_id: selectedDate,
                service_id: serviceId,
                provider_id: providerId,

            });

            setTime(response.data.data.times);
            console.log(response)
        } catch (error) {
            console.log(error)

            toast.error(error.message);
            setTime(null);
            setIsLoading(false);


        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        toast.dismiss();
        toast(stateSendTime?.message, { type: `${stateSendTime.status}` });

        if (stateSendTime.loginStatus === "no-login") {
            setTimeout(() => {
                router.push("/")
            }, 3000)
        }
        if (stateSendTime.status === "success") {
            saveReservedData(stateSendTime.data);
            router.push("/result")
        }

    }, [stateSendTime]);

    return (
        <section className="md:pt-[10%] pt-[25%] w-[98%] mx-auto max-w-[1440px] text-textColor">
            <form onSubmit={handleSearchBtn} className="flex max-w-[640px] flex-col gap-8  mx-auto py-8" encType="multipart/form-data">
                <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-12">
                    <div className="flex flex-col w-[85%] md:w-[48%] mx-auto">
                        <label htmlFor="service_id">
                            خدمات مورد نظر خود را انتخاب کنید*
                        </label>

                        <select name="service_id" id="service_id" className="border-b-textColor cursor-pointer transition-all focus:transition-all p-2 border-b-[1px]"
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
                            اجرا کننده خدمات را انتخاب کنید*
                        </label>
                        <select name="provider_id" id="provider_id" disabled={!providers} className="border-b-textColor cursor-pointer transition-all focus:transition-all p-2 border-b-[1px]"
                            onChange={(e) => setProviderId(e.target.value)}
                        >
                            <option value="">انتخاب کنید ...</option>
                            {
                                providers?.map((item) => {
                                    return <option className="cursor-pointer px-2" key={item.id} value={+item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                {
                    searchLoading ?
                        <div class="text-center">
                            <div
                                class="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-liteGold mx-auto"
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
                    firstFreeDate.day &&
                    <form action={formActionSendTime} className=" flex justify-between rounded-lg shadow items-center  my-2 py-1 px-2 text-[14px]">
                        <div>
                            اولین نوبت خالی برای شما برابربا
                            {firstFreeDate?.day}
                            ساعت
                            {firstFreeDate?.time}
                            می باشد.
                        </div>
                        <div className="flex justify-end items-center">
                            <input type="hidden" name="time_id" id="time_id" value={selectedTime} />
                            <button
                                className="hover:bg-liteGold  bg-semiLiteGold transition-colors  px-4 flex items-center justify-center py-1 shadow rounded-lg text-[14px] cursor-pointer"
                                onClick={() => {
                                    toast.loading("در حال ثبت نوبت شما ...");
                                    setSelectedTime(firstFreeDate.time_id)
                                }}
                                type="submit"
                                disabled={isLoading}
                            >

                                رزرو
                            </button>
                        </div>
                    </form>
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

                                    <SwiperSlide className={`day-slide relative w-[200px] text-[#000] h-[100px] p-2 my-4 shadow rounded-lg cursor-pointer before:content-[attr(before)]`} before={`${item.date === firstFreeDate?.date ? "اولین نوبت خالی" : ""}`} title={item.date} key={item.id}
                                        onClick={() => { setSelectedDate(item.id) }}
                                    >
                                        <form onSubmit={handleGetHours} >
                                            <button type="submit" disabled={isLoading} className={`w-full h-full `} onClick={() => { setSelectedDate(item.id) }}>
                                                <h3 className="font-medium">
                                                    {item.label}
                                                </h3>
                                                <h4 className="mb-1" >
                                                    {item.day}
                                                </h4>

                                                {/* <span className={`${item.date === firstFreeDate?.date ? "bg-green-50 rounded-lg border border-dashed border-green-600 mt-1 py-1 px-2 text-[12px]" : ""}`}>
                                                    {
                                                        item.date === firstFreeDate?.date ? "اولین نوبت خالی" : "-"
                                                    }
                                                </span> */}
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
                <div class="text-center">
                    <div
                        class="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-liteGold mx-auto"
                    ></div>
                </div>

            }

            <div className="flex flex-wrap justify-center gap-2 pt-6 pb-12 max-w-[640px] mx-auto ">
                {
                    time?.map((data) => (
                        <form action={formActionSendTime}>
                            <input type="hidden" name="time_id" id="time_id" value={selectedTime} />
                            <button type="submit" disabled={data.reserved == true ? true : false || isLoading == true} title={data.time} key={data.id} className={`px-2 py-1 rounded-lg  ${data.reserved == true ? "bg-neutral-400 cursor-not-allowed" : "bg-neutral-100 cursor-pointer"}`}
                                onClick={() => {
                                    toast.loading("در حال ثبت نوبت شما ...");
                                    setSelectedTime(data.id)
                                }}
                            >
                                {data.time}
                            </button>
                        </form>
                    ))
                }
            </div>
        </section >
    );
};

export default ReservationPage;