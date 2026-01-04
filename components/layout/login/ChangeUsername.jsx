"use client"

import { Edit3 } from "lucide-react";

const ChangeUsername = ({ setOpenModal, onClick }) => {
    const handleClick = () => {
        onClick?.();
        setOpenModal(true);
    };

    return (
        <div
            onClick={handleClick}
            className="group relative w-full flex items-center gap-2.5 sm:gap-3 cursor-pointer rounded-xl transition-all duration-300"
        >
            {/* Icon Container */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0">
                <Edit3 className="text-white" size={16} />
            </div>

            {/* Text */}
            <div className="flex-1 text-right min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors truncate">
                    تغییر نام کاربری
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 truncate">
                    ویرایش اطلاعات حساب کاربری
                </p>
            </div>
        </div>
    );
};

export default ChangeUsername;