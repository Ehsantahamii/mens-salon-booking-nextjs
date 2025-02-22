import DatePicker from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

import "./JalaliDatePicker.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { VscGlobe } from "react-icons/vsc"
const JalaliDatePicker = () => {
    const [data, setData] = useState([]);
    return (
        <>
            <Calendar
                className="reserve-calendar"
                minDate="1403/11/29"
                maxDate="1403/11/29"
                calendar={persian}
                locale={persian_fa}
                showFridaysAsRed={true} />
        </>
    );
};

export default JalaliDatePicker;