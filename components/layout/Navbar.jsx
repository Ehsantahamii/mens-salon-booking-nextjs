"use client"
import Link from 'next/link';
import AvatarPopover from '../module/AvatarPopover';
import { usePathname } from 'next/navigation';
const Navbar = () => {
    const pathname = usePathname()

    const renderNavBtn = () => {
        if (pathname === "/") {
            return null;

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
                    {renderNavBtn()}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;