"use client"
import { MdKeyboardArrowDown } from "react-icons/md";

import "./Navbar.css";
const Navbar = () => {
    return (
        <nav className="flex items-center">
            <img src="/logo.webp" alt="logo" className='w-[160px] h-[62px] mx-1 sm:mx-4' />

            <ul className="gap-8 hidden min-[1080px]:flex">
                <li>
                    <a href="#">
                        صفحه اصلی
                    </a>
                </li>
                <li className="relative service-nav">
                    <a href="#" className="flex items-center">
                        خدمات ما
                        <MdKeyboardArrowDown />

                    </a>
                    <ul id="drop-down" className="w-full z-[99999] bg-background min-w-[120px] text-center absolute top-6 flex flex-col shadow-md rounded-xl">
                        <li className="hover:bg-boxBg hover:text-liteGold w-full py-2 transition-colors border-b-[1px] border-b-[#3333] rounded-t-xl">
                            <a href="#" className="w-full h-full">
                                کراتینه مو
                            </a>
                        </li>
                        <li className="hover:bg-boxBg hover:text-liteGold w-full py-2 transition-colors border-b-[1px] border-b-[#3333]">
                            <a href="#" className="w-full h-full">
                                پاکسازی صورت
                            </a>
                        </li>
                        <li className="hover:bg-boxBg hover:text-liteGold w-full py-2 transition-colors border-b-[1px] border-b-[#3333]">
                            <a href="#" className="w-full h-full">
                                پیرایش داماد
                            </a>
                        </li>
                        <li className="hover:bg-boxBg hover:text-liteGold w-full py-2 transition-colors  border-b-[1px] border-b-[#3333]">
                            <a href="#" className="w-full h-full">
                                فرم و سشوار
                            </a>
                        </li>
                        <li className="hover:bg-boxBg hover:text-liteGold w-full py-2 transition-colors  border-b-[1px] border-b-[#3333]">
                            <a href="#" className="w-full h-full">
                                اصلاح موی سر
                            </a>
                        </li>
                        <li className="hover:bg-boxBg hover:text-liteGold w-full py-2 transition-colors  border-b-[1px] border-b-[#3333] rounded-b-xl">
                            <a href="#" className="w-full h-full">
                                اصلاح صورت
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    بلاگ
                </li>
                <li>
                    درباره ما
                </li>
                <li>
                    تماس با ما
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;