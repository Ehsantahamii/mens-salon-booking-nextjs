"use client"
import { useFormStatus } from 'react-dom'

const SubmitBtn = ({ title, style, activeBtn, setDay }) => {
    const { pending } = useFormStatus();
    return (
        <button type='submit'

            disabled={activeBtn && !activeBtn} className={`${style} ${activeBtn && !activeBtn ? "cursor-not-allowed" : "cursor-pointer"} ${pending ? "bg-white" : "bg-liteGold"}`}
            onClick={() => {
                if (setDay) {
                    return setDay()
                }
            }}
        >
            {
                pending ?
                    <div className="text-center" >
                        <div
                            className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-liteGold mx-auto"
                        >
                        </div>
                    </div>
                    :
                    title
            }

        </button >
    );
};

export default SubmitBtn;