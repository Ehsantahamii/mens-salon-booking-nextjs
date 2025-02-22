import { IoIosArrowRoundBack } from "react-icons/io";

const BookingBtn = ({ title, width, hight }) => {
    return (
        <p className={`bg-liteGold flex items-center w-[${width} h-[${hight} px-6 py-1 rounded-lg ]`}>
            {title}
            <IoIosArrowRoundBack size="1rem" />
        </p>
    );
};

export default BookingBtn;