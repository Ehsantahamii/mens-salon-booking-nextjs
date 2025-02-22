"use client"
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { PiArrowCircleLeftFill, PiArrowCircleRightFill } from "react-icons/pi";

import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import "./ReservationPage.css"


const ReservationPage = (salonData) => {
    const [day, setDay] = useState([]);
    const [selectedDate, setSelectedDate] = useState();
    const [time, setTime] = useState([]);
    console.log(day)
    const [selectedTime, setSelectedTime] = useState();
    const [empty, isEmpty] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        service_id: null,
        provider_id: null,
    });

    const router = useRouter();


    const handleServiceIdChange = (event) => {
        let changed = event.target.value
        setForm((prevData) => ({
            ...prevData,
            service_id: changed * 1,
        }));
    };
    const handleProviderIdChange = (event) => {
        setForm((prevData) => ({
            ...prevData,
            provider_id: Number(event.target.value),
        }));
    };
    const changeHandler = (event) => {
        const name = event.target.name
        setForm({ ...form, [name]: event.target.value });
    };

    const handleUpload = (event) => {
        event.preventDefault();
        const formData = new FormData();

        for (let i in form) {
            formData.append(i, form[i]);
        }
        setTime([]);
        setDay([]);
        setIsLoading(true);


        axios.post(`https://admin.developmart.ir/api/v1/reservation/days`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${accessToken.value}`
            },
        }).then(res => {
            setDay(res.data.data)
            isEmpty(false);
            setIsLoading(false);

        })
            .catch((error) => {
                setIsLoading(false);
                isEmpty(true);
                console.log(error);
                toast.error(`مشکلی بوجود آمده است !! ${error.message}`);

            });
    }
    const handleDayUpload = async (item, event) => {
        setIsLoading(true);
        setSelectedDate(item.id)
        setTime([]);
        try {
            const response = await axios.post("https://admin.developmart.ir/api/v1/reservation/times", { day_id: selectedDate });
            setTime(response.data.data);
            setIsLoading(false);
            console.log("Response:", response.data);
        } catch (error) {
            setIsLoading(false);
            console.error("Error sending data:", error);
        }
    };
    const handleReserveTimeUpload = async (data, event) => {
        setIsLoading(true);
        setSelectedTime(data.id)
        try {
            const response = await axios.post("https://admin.developmart.ir/api/v1/reservation/book", { id: selectedTime });
            console.log("Response:", response.data);
            setIsLoading(false);
            router.push(`${response.data.data.url}`)
        } catch (error) {
            console.error("Error sending data:", error);
            setIsLoading(false);
            toast.error(error.response.data.message)
        }
    };

    return (
        <section className="md:pt-[10%] pt-[25%] w-[98%] mx-auto max-w-[1440px] text-textColor">
            <h1 className="text-textColor">
                فرم رزرو خدمات

                <span className="text-liteGold">
                    پائیزان
                </span>
            </h1>
            <form className="flex max-w-[640px] flex-col gap-8  mx-auto py-8" onChange={changeHandler} encType="multipart/form-data">
                <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-12">
                    <div className="flex flex-col w-[85%] md:w-[48%] mx-auto">
                        <label htmlFor="service_id">
                            خدمات مورد نظر خود را انتخاب کنید*

                        </label>

                        <select name="service_id" id="service_id" className="border-b-textColor transition-all focus:transition-all p-2 border-b-[1px]" onChange={handleServiceIdChange}>
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

                        <select name="provider_id" id="provider_id" className="border-b-textColor cursor-pointer transition-all focus:transition-all p-2 border-b-[1px]" onChange={handleProviderIdChange}>
                            <option value="">انتخاب کنید ...</option>
                            {
                                salonData.salonData.providers && salonData.salonData.providers.map((item) => {
                                    return <option className="cursor-pointer px-2" key={item.id} value={+item.id}>{item.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                {
                    !isLoading &&
                    <button onClick={handleUpload} className="max-w-[150px] mx-auto px-4 py-2 bg-liteGold rounded-lg">
                        جستوجو
                    </button>

                }
                {
                    isLoading &&
                    <div class="text-center">
                        <div
                            class="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-liteGold mx-auto"
                        ></div>
                    </div>

                }

                {/* <JalaliDatePicker /> */}
                {
                    empty == false && day.length == 0 && <p>نوبتی جهت انتخاب یافت نشد.</p>
                }
                {

                    day.length != 0 && <div className="swiper-container flex gap-6 justify-between items-center">
                        <div className="icon-arrow-long-right review-swiper-button-next cursor-pointer transition-all">
                            <PiArrowCircleRightFill className="fill-liteGold" width="100%" height="100%" size={38} />
                        </div>


                        <Swiper
                            className="day-swiper w-[90%] max-w-[640px] mx-auto cursor-grab"
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
                                day.days && day.days.map((item => (

                                    <SwiperSlide className={`w-[200px] text-[#000] h-[100px] p-2 my-4 shadow rounded cursor-pointer`} title={item.date} key={item.id}
                                    >
                                        <button type="button" className="w-full h-full" onClick={() => handleDayUpload(item)}>
                                            <p>
                                                {item.label}
                                            </p>
                                            <h4>
                                                {item.day}
                                            </h4>
                                            {
                                                day.first_free_time != null && day.first_free_time.date === item.date ? <p className="text-[10px]">اولین روز خالی</p> : <></>
                                            }
                                        </button>

                                    </SwiperSlide>

                                )))
                            }
                        </Swiper>

                        <div className="icon-arrow-long-left review-swiper-button-prev cursor-pointer transition-opacity" >
                            <PiArrowCircleLeftFill width="100%" height="100%" size={38} className="fill-liteGold" />
                        </div>
                    </div>
                }
            </form>
            <div className="flex flex-wrap justify-center gap-2 pb-12 max-w-[640px] mx-auto ">
                {
                    time.length != 0 && time.times.map((data) => (
                        <button type="button" disabled={data.reserved == true ? true : false} title={data.time} key={data.id} className={`px-2 py-1 rounded-lg  ${data.reserved == true ? "bg-neutral-400 cursor-not-allowed" : "bg-neutral-100 cursor-pointer"}`}
                            onClick={() => handleReserveTimeUpload(data)}
                        >
                            {data.time}
                        </button>
                    ))
                }
            </div>
        </section >
    );
};

export default ReservationPage;