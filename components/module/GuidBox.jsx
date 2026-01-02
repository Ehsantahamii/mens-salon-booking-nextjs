"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { BiInfoCircle, BiCheckCircle } from "react-icons/bi";

const GuidBox = () => {
    return (
        <div className="pb-8">
            <Accordion
                type="single"
                collapsible
                dir="rtl"
                className="w-[95%] max-w-[640px] mx-auto"
            >
                <AccordionItem
                    value="item-1"
                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                    <AccordionTrigger className="px-5 py-4 hover:bg-gradient-to-r hover:from-liteGold/5 hover:to-semiLiteGold/5 transition-all">
                        <span className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                            <div className="p-2 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-lg">
                                <BiInfoCircle className="text-white" size={22} />
                            </div>
                            راهنمای دریافت نوبت
                        </span>
                    </AccordionTrigger>

                    <AccordionContent className="px-5 pb-5 pt-2">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 space-y-4">

                            {/* Welcome Message */}
                            <div className="bg-white rounded-lg p-4 border-r-4 border-liteGold">
                                <h3 className="font-bold text-base text-gray-800 leading-relaxed">
                                    به سیستم رزرو نوبت آنلاین خوش آمدید! لطفاً دستورالعمل‌های زیر را برای رزرو نوبت خود دنبال کنید:
                                </h3>
                            </div>

                            {/* Steps */}
                            <div className="space-y-3">

                                {/* Step 1 */}
                                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">۱</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1">انتخاب خدمت</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                ابتدا از لیست خدمات، گزینه موردنظر خود را انتخاب کنید.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">۲</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1">انتخاب خدمات‌دهنده</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                انتخاب خدمات‌دهنده از لیست اجراکننده خدمات
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">۳</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1">انتخاب تاریخ و ساعت</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                پس از انتخاب خدمات‌دهنده، تاریخ و ساعت دلخواه خود را از میان گزینه‌های موجود انتخاب کنید.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-liteGold to-semiLiteGold rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">۴</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 mb-1">دریافت تأییدیه</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                پس از تکمیل مراحل، پیامک  تأییدیه برای شما ارسال خواهد شد. لطفاً اطلاعات رزرو را بررسی و در زمان مقرر در محل حضور یابید.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Success Note */}
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
                                <BiCheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                                <p className="text-sm text-green-700 leading-relaxed">
                                    با رعایت این مراحل، نوبت شما با موفقیت ثبت خواهد شد.
                                </p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default GuidBox;
