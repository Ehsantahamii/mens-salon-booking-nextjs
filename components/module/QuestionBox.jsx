"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
const QuestionBox = () => {
    return (
        <div className="py-8">
            <Accordion type="single" collapsible dir="rtl" defaultValue="item-1" className="w-[95%] max-w-[640px] mx-auto">
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50" className="fill-liteGold">
                                <path d="M25,2C12.297,2,2,12.297,2,25s10.297,23,23,23s23-10.297,23-23S37.703,2,25,2z M25,11c1.657,0,3,1.343,3,3s-1.343,3-3,3 s-3-1.343-3-3S23.343,11,25,11z M29,38h-2h-4h-2v-2h2V23h-2v-2h2h4v2v13h2V38z"></path>
                            </svg>
                            سوالات متداول
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Accordion type="single" collapsible dir="rtl" className="shadow-none">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <span className="flex items-center gap-2">
                                        <img className="w-5 h-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADwElEQVR4nO2az2sTQRTHB/ImTSlKC/YHCOo/4E1PFUEQRVDUi9j2IniWFlG8eFZbRSwK4qUHDx6i3TdJk2jwUPUkxYMnm8aCYutBWnqR1sysuvLSdLt0N2mzO7uJpQNzavpmP/O+896bH4zttG3arAzrKGH8nBT8rhQ8qxAKEvmSFFyWO/IlhTBNf6PflFLxsxaydtYMzcqxFin4gBQ8LwX/rQS36un0PxL5S4m8n2yxyAGSrFUJuKoQvtf78VU7wrxCGLImWSISCNOInVICZrUBuIE+mxg7Ga6MkI+GBuDq8JQ8rxcixbqV4B+ig+Crawj5lDXOurRA/MKWA+TuqCHUutSK9A3BPJFknRRGGwYhbJnNWhnW4w9ikiUaISdVS2Z+QrRE/rjRH6/cMA99hNjAgy5Xkt2oFPyOQhijzB7UrmnETtST7HzniUq2vlWt/FAGHFECPvqGQShuSWLljO3fC2ZJxM9vZbKk4G/8ewYGaw+QYy1Byg6SkNOeKWLHSNeU3GiCrDxrs8fKsB4p+E+fIHM1vUIFYJA1QRWw7VmEax6yKFiC7dIRUKTB+2qB5AN4I7tmZyWd2Ecyq6LxG/Z4Br8QYLyct6wyrMNPKe4w/I4iyvJE614l4HoNWTyzvSbgaAAFmFaO7XaB0KbIr1G/uYA2V0FslTB+xktW90KHEPyPSsNhxxoZCTgpI14g2Qi88ciWcp61ScF/BLMJaRcIJZpwQeCrU9NS8OHANhEKXh5ZDNETpkpBrz1pKegNEljUut0FLxAZojdu2pJC1q4EfNE0QaXIQCTyt1aSxRwSfq7RdikSaVUKyIOOKHVZ8yQtuBe7gJkQQLIbEq7eyUKYdnsEeSYEWd1fs09HPLrtK6/wS8eYIYDcdkzUpRA8PuwCCVouVHG9YYrYceqr5bxe+6YRO+0CobCoI7ZH1aXgyrNorMjr1X8DgjzjCVHRcb/mWZug/Uelj2m2fXGzre68xsEG1mwrAYf0gcCclWTxqiDlARGGmh4E4UpNCPuEUdNZbyggCIUtnzhqS14IRYn8NfVAZ1miMjHI/1IoZ/U02gTp07QmqSJ/UBeE42Jnqokg3m+6wKvCpNmeprlWSLFupuGip9hAiJmVF4n9gSBsz4yzrkbITK7KqVMLxMbLUIocEYE8CfXunU4TQ5UaQqHuEOu3lUsZAYNUKmhcC98oYzfmBQTJzeB95fcl1Q6ta68Bk6pYKgB9h1bdjfYGdBZLx5iVqpce0Czaj2rK+3X4RNtT2tnRpsh5xbDTtlv7B9I1JHNLO2uEAAAAAElFTkSuQmCC" alt="help" />
                                        چگونه می‌توانم نوبت خود را لغو کنم؟
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>

                                    برای لغو نوبت، وارد حساب کاربری خود شده و از بخش "نوبت های من" گزینه "حذف نوبت" را انتخاب کنید. لطفاً این کار را حداقل ۲ ساعت قبل از موعد مقرر انجام دهید.

                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible dir="rtl" className="shadow-none">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <span className="flex items-center gap-2">
                                        <img className="w-5 h-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADwElEQVR4nO2az2sTQRTHB/ImTSlKC/YHCOo/4E1PFUEQRVDUi9j2IniWFlG8eFZbRSwK4qUHDx6i3TdJk2jwUPUkxYMnm8aCYutBWnqR1sysuvLSdLt0N2mzO7uJpQNzavpmP/O+896bH4zttG3arAzrKGH8nBT8rhQ8qxAKEvmSFFyWO/IlhTBNf6PflFLxsxaydtYMzcqxFin4gBQ8LwX/rQS36un0PxL5S4m8n2yxyAGSrFUJuKoQvtf78VU7wrxCGLImWSISCNOInVICZrUBuIE+mxg7Ga6MkI+GBuDq8JQ8rxcixbqV4B+ig+Crawj5lDXOurRA/MKWA+TuqCHUutSK9A3BPJFknRRGGwYhbJnNWhnW4w9ikiUaISdVS2Z+QrRE/rjRH6/cMA99hNjAgy5Xkt2oFPyOQhijzB7UrmnETtST7HzniUq2vlWt/FAGHFECPvqGQShuSWLljO3fC2ZJxM9vZbKk4G/8ewYGaw+QYy1Byg6SkNOeKWLHSNeU3GiCrDxrs8fKsB4p+E+fIHM1vUIFYJA1QRWw7VmEax6yKFiC7dIRUKTB+2qB5AN4I7tmZyWd2Ecyq6LxG/Z4Br8QYLyct6wyrMNPKe4w/I4iyvJE614l4HoNWTyzvSbgaAAFmFaO7XaB0KbIr1G/uYA2V0FslTB+xktW90KHEPyPSsNhxxoZCTgpI14g2Qi88ciWcp61ScF/BLMJaRcIJZpwQeCrU9NS8OHANhEKXh5ZDNETpkpBrz1pKegNEljUut0FLxAZojdu2pJC1q4EfNE0QaXIQCTyt1aSxRwSfq7RdikSaVUKyIOOKHVZ8yQtuBe7gJkQQLIbEq7eyUKYdnsEeSYEWd1fs09HPLrtK6/wS8eYIYDcdkzUpRA8PuwCCVouVHG9YYrYceqr5bxe+6YRO+0CobCoI7ZH1aXgyrNorMjr1X8DgjzjCVHRcb/mWZug/Uelj2m2fXGzre68xsEG1mwrAYf0gcCclWTxqiDlARGGmh4E4UpNCPuEUdNZbyggCIUtnzhqS14IRYn8NfVAZ1miMjHI/1IoZ/U02gTp07QmqSJ/UBeE42Jnqokg3m+6wKvCpNmeprlWSLFupuGip9hAiJmVF4n9gSBsz4yzrkbITK7KqVMLxMbLUIocEYE8CfXunU4TQ5UaQqHuEOu3lUsZAYNUKmhcC98oYzfmBQTJzeB95fcl1Q6ta68Bk6pYKgB9h1bdjfYGdBZLx5iVqpce0Czaj2rK+3X4RNtT2tnRpsh5xbDTtlv7B9I1JHNLO2uEAAAAAElFTkSuQmCC" alt="help" />
                                        آیا رزرو نوبت ملزم به پرداخت هزینه است؟
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    خیر،رزرو نوبت رایگان است.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible dir="rtl" className="shadow-none">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <span className="flex items-center gap-2">
                                        <img className="w-5 h-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADwElEQVR4nO2az2sTQRTHB/ImTSlKC/YHCOo/4E1PFUEQRVDUi9j2IniWFlG8eFZbRSwK4qUHDx6i3TdJk2jwUPUkxYMnm8aCYutBWnqR1sysuvLSdLt0N2mzO7uJpQNzavpmP/O+896bH4zttG3arAzrKGH8nBT8rhQ8qxAKEvmSFFyWO/IlhTBNf6PflFLxsxaydtYMzcqxFin4gBQ8LwX/rQS36un0PxL5S4m8n2yxyAGSrFUJuKoQvtf78VU7wrxCGLImWSISCNOInVICZrUBuIE+mxg7Ga6MkI+GBuDq8JQ8rxcixbqV4B+ig+Crawj5lDXOurRA/MKWA+TuqCHUutSK9A3BPJFknRRGGwYhbJnNWhnW4w9ikiUaISdVS2Z+QrRE/rjRH6/cMA99hNjAgy5Xkt2oFPyOQhijzB7UrmnETtST7HzniUq2vlWt/FAGHFECPvqGQShuSWLljO3fC2ZJxM9vZbKk4G/8ewYGaw+QYy1Byg6SkNOeKWLHSNeU3GiCrDxrs8fKsB4p+E+fIHM1vUIFYJA1QRWw7VmEax6yKFiC7dIRUKTB+2qB5AN4I7tmZyWd2Ecyq6LxG/Z4Br8QYLyct6wyrMNPKe4w/I4iyvJE614l4HoNWTyzvSbgaAAFmFaO7XaB0KbIr1G/uYA2V0FslTB+xktW90KHEPyPSsNhxxoZCTgpI14g2Qi88ciWcp61ScF/BLMJaRcIJZpwQeCrU9NS8OHANhEKXh5ZDNETpkpBrz1pKegNEljUut0FLxAZojdu2pJC1q4EfNE0QaXIQCTyt1aSxRwSfq7RdikSaVUKyIOOKHVZ8yQtuBe7gJkQQLIbEq7eyUKYdnsEeSYEWd1fs09HPLrtK6/wS8eYIYDcdkzUpRA8PuwCCVouVHG9YYrYceqr5bxe+6YRO+0CobCoI7ZH1aXgyrNorMjr1X8DgjzjCVHRcb/mWZug/Uelj2m2fXGzre68xsEG1mwrAYf0gcCclWTxqiDlARGGmh4E4UpNCPuEUdNZbyggCIUtnzhqS14IRYn8NfVAZ1miMjHI/1IoZ/U02gTp07QmqSJ/UBeE42Jnqokg3m+6wKvCpNmeprlWSLFupuGip9hAiJmVF4n9gSBsz4yzrkbITK7KqVMLxMbLUIocEYE8CfXunU4TQ5UaQqHuEOu3lUsZAYNUKmhcC98oYzfmBQTJzeB95fcl1Q6ta68Bk6pYKgB9h1bdjfYGdBZLx5iVqpce0Czaj2rK+3X4RNtT2tnRpsh5xbDTtlv7B9I1JHNLO2uEAAAAAElFTkSuQmCC" alt="help" />
                                        آیا امکان رزرو چندین نوبت همزمان وجود دارد؟
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>

                                    بله، شما می‌توانید حداکثر تا ۲ نوبت را برای خدمات مختلف یا تاریخ‌های متفاوت رزرو کنید.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible dir="rtl" className="shadow-none">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <span className="flex items-center gap-2">
                                        <img className="w-5 h-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADwElEQVR4nO2az2sTQRTHB/ImTSlKC/YHCOo/4E1PFUEQRVDUi9j2IniWFlG8eFZbRSwK4qUHDx6i3TdJk2jwUPUkxYMnm8aCYutBWnqR1sysuvLSdLt0N2mzO7uJpQNzavpmP/O+896bH4zttG3arAzrKGH8nBT8rhQ8qxAKEvmSFFyWO/IlhTBNf6PflFLxsxaydtYMzcqxFin4gBQ8LwX/rQS36un0PxL5S4m8n2yxyAGSrFUJuKoQvtf78VU7wrxCGLImWSISCNOInVICZrUBuIE+mxg7Ga6MkI+GBuDq8JQ8rxcixbqV4B+ig+Crawj5lDXOurRA/MKWA+TuqCHUutSK9A3BPJFknRRGGwYhbJnNWhnW4w9ikiUaISdVS2Z+QrRE/rjRH6/cMA99hNjAgy5Xkt2oFPyOQhijzB7UrmnETtST7HzniUq2vlWt/FAGHFECPvqGQShuSWLljO3fC2ZJxM9vZbKk4G/8ewYGaw+QYy1Byg6SkNOeKWLHSNeU3GiCrDxrs8fKsB4p+E+fIHM1vUIFYJA1QRWw7VmEax6yKFiC7dIRUKTB+2qB5AN4I7tmZyWd2Ecyq6LxG/Z4Br8QYLyct6wyrMNPKe4w/I4iyvJE614l4HoNWTyzvSbgaAAFmFaO7XaB0KbIr1G/uYA2V0FslTB+xktW90KHEPyPSsNhxxoZCTgpI14g2Qi88ciWcp61ScF/BLMJaRcIJZpwQeCrU9NS8OHANhEKXh5ZDNETpkpBrz1pKegNEljUut0FLxAZojdu2pJC1q4EfNE0QaXIQCTyt1aSxRwSfq7RdikSaVUKyIOOKHVZ8yQtuBe7gJkQQLIbEq7eyUKYdnsEeSYEWd1fs09HPLrtK6/wS8eYIYDcdkzUpRA8PuwCCVouVHG9YYrYceqr5bxe+6YRO+0CobCoI7ZH1aXgyrNorMjr1X8DgjzjCVHRcb/mWZug/Uelj2m2fXGzre68xsEG1mwrAYf0gcCclWTxqiDlARGGmh4E4UpNCPuEUdNZbyggCIUtnzhqS14IRYn8NfVAZ1miMjHI/1IoZ/U02gTp07QmqSJ/UBeE42Jnqokg3m+6wKvCpNmeprlWSLFupuGip9hAiJmVF4n9gSBsz4yzrkbITK7KqVMLxMbLUIocEYE8CfXunU4TQ5UaQqHuEOu3lUsZAYNUKmhcC98oYzfmBQTJzeB95fcl1Q6ta68Bk6pYKgB9h1bdjfYGdBZLx5iVqpce0Czaj2rK+3X4RNtT2tnRpsh5xbDTtlv7B9I1JHNLO2uEAAAAAElFTkSuQmCC" alt="help" />
                                        در صورت تأخیر چه اتفاقی می‌افتد؟
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>

                                    در صورت تأخیر بیش از ۱۵ دقیقه، ممکن است نوبت شما به فرد دیگری اختصاص داده شود. لطفاً در زمان مقرر در محل حضور داشته باشید.

                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                        <Accordion type="single" collapsible dir="rtl" className="shadow-none">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <span className="flex items-center gap-2">
                                        <img className="w-5 h-5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADwElEQVR4nO2az2sTQRTHB/ImTSlKC/YHCOo/4E1PFUEQRVDUi9j2IniWFlG8eFZbRSwK4qUHDx6i3TdJk2jwUPUkxYMnm8aCYutBWnqR1sysuvLSdLt0N2mzO7uJpQNzavpmP/O+896bH4zttG3arAzrKGH8nBT8rhQ8qxAKEvmSFFyWO/IlhTBNf6PflFLxsxaydtYMzcqxFin4gBQ8LwX/rQS36un0PxL5S4m8n2yxyAGSrFUJuKoQvtf78VU7wrxCGLImWSISCNOInVICZrUBuIE+mxg7Ga6MkI+GBuDq8JQ8rxcixbqV4B+ig+Crawj5lDXOurRA/MKWA+TuqCHUutSK9A3BPJFknRRGGwYhbJnNWhnW4w9ikiUaISdVS2Z+QrRE/rjRH6/cMA99hNjAgy5Xkt2oFPyOQhijzB7UrmnETtST7HzniUq2vlWt/FAGHFECPvqGQShuSWLljO3fC2ZJxM9vZbKk4G/8ewYGaw+QYy1Byg6SkNOeKWLHSNeU3GiCrDxrs8fKsB4p+E+fIHM1vUIFYJA1QRWw7VmEax6yKFiC7dIRUKTB+2qB5AN4I7tmZyWd2Ecyq6LxG/Z4Br8QYLyct6wyrMNPKe4w/I4iyvJE614l4HoNWTyzvSbgaAAFmFaO7XaB0KbIr1G/uYA2V0FslTB+xktW90KHEPyPSsNhxxoZCTgpI14g2Qi88ciWcp61ScF/BLMJaRcIJZpwQeCrU9NS8OHANhEKXh5ZDNETpkpBrz1pKegNEljUut0FLxAZojdu2pJC1q4EfNE0QaXIQCTyt1aSxRwSfq7RdikSaVUKyIOOKHVZ8yQtuBe7gJkQQLIbEq7eyUKYdnsEeSYEWd1fs09HPLrtK6/wS8eYIYDcdkzUpRA8PuwCCVouVHG9YYrYceqr5bxe+6YRO+0CobCoI7ZH1aXgyrNorMjr1X8DgjzjCVHRcb/mWZug/Uelj2m2fXGzre68xsEG1mwrAYf0gcCclWTxqiDlARGGmh4E4UpNCPuEUdNZbyggCIUtnzhqS14IRYn8NfVAZ1miMjHI/1IoZ/U02gTp07QmqSJ/UBeE42Jnqokg3m+6wKvCpNmeprlWSLFupuGip9hAiJmVF4n9gSBsz4yzrkbITK7KqVMLxMbLUIocEYE8CfXunU4TQ5UaQqHuEOu3lUsZAYNUKmhcC98oYzfmBQTJzeB95fcl1Q6ta68Bk6pYKgB9h1bdjfYGdBZLx5iVqpce0Czaj2rK+3X4RNtT2tnRpsh5xbDTtlv7B9I1JHNLO2uEAAAAAElFTkSuQmCC" alt="help" />
                                        در صورت عدم دریافت پیامک تاییدیه رزرو چه باید کرد؟
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent>

                                    در صورت عدم دریافت پیامک تاییدیه می توانید وضعیت رزرو نوبت انتخابی خود را در قسمت "نوبت های من" بررسی کنید و درصورت عدم رزرو مجددا اقدام به رزرو نوبت نمایید.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>


                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    );
};

export default QuestionBox;