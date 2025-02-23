"use client"
import { useFormStatus } from 'react-dom'

const SubmitBtn = ({ title, style }) => {
    const { pending } = useFormStatus();
    return (
        <button type='submit' disabled={pending} className={`${style} ${pending ? "bg-white" : "bg-liteGold hover:bg-orange-400"}`}>

            {pending ?
                <div class="text-center">
                    <div
                        class="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-liteGold mx-auto"
                    >
                    </div>
                </div>
                :
                title
            }

        </button>
    );
};

export default SubmitBtn;