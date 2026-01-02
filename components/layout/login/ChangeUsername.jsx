"use client"

import { Edit3, Sparkles } from "lucide-react";

const ChangeUsername = ({ setOpenModal }) => {
    return (
        <button
            onClick={() => setOpenModal(true)}
            className="group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-[#ffd39a]/10 hover:to-[#ffcd7a]/10 border border-gray-200 hover:border-[#ffd39a] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        >
            {/* Icon Container */}
            <div className="w-10 h-10 bg-gradient-to-br from-[#ffd39a] to-[#ffcd7a] rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Edit3 className="text-white" size={18} />
            </div>

            {/* Text */}
            <div className="flex-1 text-right">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                    تغییر نام کاربری
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                    ویرایش اطلاعات حساب کاربری
                </p>
            </div>

            {/* Arrow Icon */}
            <Sparkles
                className="text-gray-400 group-hover:text-[#ffa726] transition-all duration-300 group-hover:rotate-12"
                size={16}
            />

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ffd39a]/0 to-[#ffcd7a]/0 group-hover:from-[#ffd39a]/5 group-hover:to-[#ffcd7a]/5 transition-all duration-300" />
        </button>
    );
};

export default ChangeUsername;
