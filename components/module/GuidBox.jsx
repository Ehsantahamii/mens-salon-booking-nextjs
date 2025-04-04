"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const GuidBox = () => {
    return (
        <div className="pb-8">
            <Accordion type="single" collapsible dir="rtl" className="w-[95%] max-w-[640px] mx-auto">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <span className="flex items-center gap-2 text-[18px]">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" className="fill-liteGold">
                                <path d="M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z"></path>
                            </svg>
                            راهنمای دریافت نوبت
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul>
                            <h3 className="font-bold text-[18px] pb-2">
                                به سیستم رزرو نوبت آنلاین خوش آمدید! لطفاً دستورالعمل‌های زیر را برای رزرو نوبت خود دنبال کنید:
                            </h3>
                            <li>
                                1. انتخاب خدمت:
                                ابتدا از لیست خدمات، گزینه موردنظر خود را انتخاب کنید.
                            </li>
                            <li>
                                2. انتخاب خدمات دهنده:انتخاب خدمات دهنده از لیست اجراکننده خدمات
                            </li>
                            <li>
                                3. انتخاب تاریخ و ساعت:
                                پس از انتخاب خدمات دهنده، تاریخ و ساعت دلخواه خود را از میان گزینه‌های موجود انتخاب کنید.
                            </li>
                            <li>
                                4. دریافت تاییدیه:
                                پس از تکمیل مراحل، پیامک یا ایمیل تاییدیه برای شما ارسال خواهد شد. لطفاً اطلاعات رزرو را بررسی و در زمان مقرر در محل حضور داشته باشید.

                            </li>
                        </ul>

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default GuidBox;