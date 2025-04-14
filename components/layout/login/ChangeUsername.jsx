"use client"
import { HiOutlinePencilAlt } from "react-icons/hi";

const ChangeUsername = ({ setOpenModal }) => {

    return (
        <div>
            <button className="flex gap-1 items-center font-extralight  py-1 border-b-[#333333b4] transition-opacity opacity-75 hover:opacity-100 " onClick={() => setOpenModal(true)}>
                <HiOutlinePencilAlt />
                تغییر نام کاربری
            </button>

        </div>
    );
};

export default ChangeUsername;