"use client"
import Link from 'next/link';
import AvatarPopover from '../module/AvatarPopover';

const Navbar = () => {
    const renderNavBtn = () => {
        if (pathname === "/") {
            return null;

        } else if (pathname === "/reserved-list") {
            return (
                <AvatarPopover />
            );

        } else {
            return (
                <AvatarPopover />

            );
        }
    }
    return (
        <nav className="w-full h-20 flex justify-center items-center bg-white shadow-sm">
            <div className='w-[85%] flex items-center justify-center mx-auto'>
                <div className='w-[50%] lg:w-[70%] font-bold'>
                    LOGO
                </div>
                <div className='w-[50%] lg:w-[30%] flex justify-end'>
                    <AvatarPopover />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;