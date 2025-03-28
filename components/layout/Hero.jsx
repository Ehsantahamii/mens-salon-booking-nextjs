import Link from "next/link";
import BookingBtn from "../module/BookingBtn";
import "./Hero.css";
const Hero = () => {
    return (
        <section className='hero-section text-textColor w-full bg-cover'>
            <div className="flex flex-col pt-[25%] pb-[10%] gap-4 md:pt-[10%] md:pb-[5%] md:justify-between md:flex-row-reverse w-[90vw] md:max-w-[1200px] sm:w-full mx-auto">
                <div className="w-[98%] mx-auto md:w-1/3">
                    <img src="/images/new-hero-sec-pic-min.webp" alt="hero-pic" className="max-w-[250px] md:max-w-[350px] mx-auto" />
                </div>
                <div className="w-[98%] mx-auto md:w-2/3">
                    <p className="text-liteGold">
                        این صندلی شروع زیبایی شماست
                    </p>
                    <h1>
                        پیرایـــش مردانه پائیـــزان
                    </h1>
                    <p className="py-4 font-thin text-justify">
                        لورم ایپسوم متن ساختــگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است مورد نیاز، و کاربـــــردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فـــــراوان جامعه و متخصصان را می طلبد، تا با نرم افزارهـــا شناخت و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.

                    </p>
                    <div className="flex md:mt-8 items-center gap-4">
                        <Link className="text-white" href="/reservation">
                            <BookingBtn title="رزرو صندلی زیبایی" />
                        </Link>
                        <p>
                            رزرو تلفنی نوبت
                            <tel>021338620</tel>
                        </p>
                        <address>
                            یزد شهر مهربانان، خیابان طراحان وب، کوچه هفتم، پلاک 5
                        </address>
                    </div>
                    <div className="flex justify-between my-8">
                        <div className="flex gap-2 hover:bg-background rounded-xl p-4 cursor-pointer">
                            {/* <svg className="w-[40px] fill-liteGold" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="40" height="40" x="0" y="0" viewBox="0 0 512.095 512.095" xmlSpace="preserve" class=""><g><path d="m215.72 451.536 149.106-316.399c.015-.044.044-.073.059-.117 19.893-42.861 14.121-92.314-15.059-129.053-3.237-4.058-8.364-6.472-13.447-5.872-5.156.586-9.624 4.085-11.851 8.772L178.176 319.348c-51.979-35.24-125.504-15.246-152.783 43.213-24.52 52.556-1.82 115.106 50.742 139.629 52.698 24.57 115.183 1.663 139.585-50.654zM79.798 387.991c10.469-22.416 37.123-32.327 59.795-21.768 22.564 10.538 32.265 37.302 21.768 59.81-10.379 22.223-37.001 32.412-59.81 21.753-22.574-10.543-32.251-37.287-21.753-59.795zM461.32 434.926c6.707-24.12 5.123-49.475-5.555-72.365-24.478-52.471-87.1-75.293-139.673-50.742-.425.2-.829.513-1.252.72l-57.66 121.582 8.214 17.327c24.138 51.738 86.242 75.634 139.629 50.742 18.658-8.705 33.913-22.454 44.548-39.564 9.972 8.403 17.009 20.843 17.009 34.378 0 8.291 6.709 15 15 15s15-6.619 15-14.91c-.001-25.643-14.384-48.475-35.26-62.168zM402.869 422.4c-8.509 23.346-34.294 35.414-57.671 26.895-23.34-8.507-35.43-34.253-26.895-57.671 8.477-23.373 34.338-35.421 57.671-26.895 23.324 8.501 35.403 34.243 26.895 57.671z" class=""></path><path d="M144.778.095c-5.068-.615-10.21 1.814-13.447 5.872-29.18 36.738-34.951 86.191-15 129.17l57.523 122.32 50.171-106.74-67.396-141.85c-2.227-4.688-6.695-8.186-11.851-8.772z" ></path></g></svg> */}
                            <span>
                                <h4 className="font-bold">
                                    بالاترین کیفیت
                                </h4>
                                <p>
                                    کیفیت بالای خدمات
                                </p>
                            </span>
                        </div>
                        <div className="flex gap-2 hover:bg-background rounded-xl p-4 cursor-pointer">
                            {/* <svg className="w-[40px] fill-liteGold" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="40" height="40" x="0" y="0" viewBox="0 0 68 68" xml:space="preserve"><g><path d="M32.094 61.767a6.1 6.1 0 0 1 2.97-5.24c-.05-.3-.07-.6-.07-.9 0-2.99 2.21-5.53 5.09-6.04.85-1.56 1.8-2.75 2.72-3.64.15-2.66-.63-4.59-1.59-5.94-.34.12-.71.18-1.09.18h-21.63c-.38 0-.75-.06-1.09-.18-1.06 1.49-1.9 3.69-1.51 6.78.27 2.15 1.31 4.11 2.7 5.76 1.56 1.85 3.43 5.33.96 9.78-.87 1.56.31 3.48 2.11 3.48h11.98c-.17-.17-.31-.36-.45-.55a6.048 6.048 0 0 1-1.1-3.49zM42.514 3.287a80.173 80.173 0 0 0-26.41 0c-5.14.85-8.36 6.08-6.79 11.04 2.15 6.78 5.38 13.64 9.42 20.55h-.24c-1.05 0-1.9.86-1.9 1.91 0 1.05.85 1.9 1.9 1.9h21.63c1.06 0 1.9-.85 1.9-1.9 0-1.05-.84-1.91-1.9-1.91h-.24c.53-1.04 5.95-9.58 9.38-20.43 1.59-5.01-1.56-10.3-6.75-11.16zm-18.54 31.59h-1.51l-3.46-16.86c-.08-.41.18-.8.58-.88.41-.09.81.17.89.58l3.5 17.01c.01.05 0 .1 0 .15zm6.11 0h-1.5l.02-17.01c0-.42.33-.75.75-.75.41 0 .75.34.75.75zm6.04 0h-1.5c0-.05-.01-.1 0-.15l3.5-17.01c.08-.41.48-.67.88-.58.41.08.67.47.59.88z"></path><path d="M54.908 58.068a4.602 4.602 0 0 0 .403-1.87 4.623 4.623 0 0 0-4.627-4.614c-.52 0-1.041.095-1.503.26-.808-1.335-1.513-3.135-1.717-5.487-.07-.815-.949-1.279-1.65-.86-1.34.803-3.269 2.412-4.762 5.495-2.532.06-4.556 2.13-4.556 4.639 0 .603.118 1.195.332 1.727-1.87.604-3.23 2.343-3.23 4.414 0 .982.306 1.893.827 2.627.64.923 1.752 1.408 2.864 1.408h18.353a3.443 3.443 0 0 0 3.443-3.443c0-2.331-1.845-4.213-4.177-4.296z"></path></g></svg> */}
                            <span>
                                <h4 className="font-bold">
                                    وسایل درجه یک
                                </h4>
                                <p>
                                    لوازم باکیفیت و مدرن
                                </p>
                            </span>
                        </div>
                        <div className="flex gap-2 hover:bg-background rounded-xl p-4 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.com/svgjs" width="40" height="40" x="0" y="0" viewBox="0 0 120 120" xmlSpace="preserve" class=""><g><g><path d="M10 28.88v40.544A20 20 0 0 0 20.455 87l31.633 17.18a14.998 14.998 0 0 0 14.125.103l33.075-17.344A20 20 0 0 0 110 69.226V27.669c0-1.214-1.872-1.4-2.143-.217-2.912 12.711-7.05 24.108-16.474 35.006-1.557 1.8-3.608 3.088-5.855 3.871l-14.195 4.946a9.403 9.403 0 0 1-7.73-.698 9.403 9.403 0 0 0-9.032-.132l-.13.07a9.671 9.671 0 0 1-8.34.335l-11.58-4.976c-1.138-.489-2.222-1.107-3.168-1.907C21.815 55.892 17.18 43.895 11.95 28.56 11.586 27.49 10 27.748 10 28.88z" class=""></path><path d="M31.439 39.787c7.13 1.28 13.263-2.677 18.125-5.814 3.438-2.218 7.67-2.23 9.931 1.763 2.262-3.993 6.493-3.982 9.93-1.764 4.864 3.138 10.997 7.095 18.127 5.815 5.576-1 8.584-3.864 9.937-6.608.42-.854 1.725-.99 1.987-.07 1.093 3.837 1.052 9.34-1.553 13.926-5.392 9.49-28.21 13.469-37.083-.095a16.68 16.68 0 0 1-1.345-2.47 16.68 16.68 0 0 1-1.344 2.47c-8.874 13.564-31.691 9.586-37.083.095-2.606-4.587-2.646-10.09-1.553-13.926.262-.92 1.566-.784 1.987.07 1.353 2.744 4.36 5.607 9.937 6.608z" class=""></path></g></g></svg>                            <span>
                                <h4 className="font-bold">
                                    متدهای روز دنیا
                                </h4>
                                <p>
                                    برترین متد ها و مدل ها
                                </p>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;