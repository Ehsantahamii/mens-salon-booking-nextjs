"use client"
import React, { useState } from 'react';
import Navbar from '../module/Navbar/Navbar';
import BookingBtn from '../module/BookingBtn';
import { BiPhoneCall } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileNavbar from '../module/Navbar/MobileNavbar';

const Header = () => {
    const [openNav, setOpenNav] = useState(false);
    return (
        <div className='flex items-center justify-between text-textColor w-[100vw] absolute top-0'>
            <Navbar />
            <MobileNavbar openNav={openNav} setOpenNav={setOpenNav} />
            <div className='bg-boxBg flex items-center justify-center gap-4 h-20 rounded-br-3xl w-1/3 min-w-[210px] md:min-w-[260px]'>
                <p className='text-[#ffffff] justify-center  gap-2 items-center hidden min-[1080px]:flex'>
                    رزرو تلفنی نوبت 021338620
                    <BiPhoneCall size={18} />
                </p>
                <button onClick={() => {
                    document.getElementById("main").classList.add('bg-overlay');
                    setOpenNav(!openNav);
                }}>
                    <RxHamburgerMenu size={18} color='white' className='min-[1080px]:hidden' />
                </button>
                <a className="text-white" to="/reservation">
                    <BookingBtn title="رزرو صندلی" width="1rem" hight="1rem" />
                </a>


            </div>
        </div>
    );
};

export default Header;