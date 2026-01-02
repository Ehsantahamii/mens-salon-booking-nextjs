"use client"
import { Suspense, useEffect, useState } from "react";
import CheckOtpForm from "@/components/layout/login/CheckOtpForm";
import LoginForm from "@/components/layout/login/LoginForm";
import NameForm from "@/components/layout/login/NameForm";
import { useRouter } from "next/navigation";


export default function FarsiLandingPage() {
  // const features = [
  //   { icon: Calendar, title: 'رزرو آنلاین', desc: 'رزرو نوبت در هر زمان و مکان' },
  //   { icon: Clock, title: 'مدیریت زمان', desc: 'انتخاب دقیق ساعت و تاریخ' },
  //   { icon: MapPin, title: 'موقعیت مکانی', desc: 'نزدیک‌ترین سالن‌ها به شما' },
  //   { icon: Users, title: 'متخصصان برتر', desc: 'بهترین آرایشگران و متخصصان' }
  // ];

  // const salons = [
  //   { name: 'سالن ماساژ خانم مریم خلیلی', rating: 4.7, reviews: 195, image: '💆', type: 'ماساژ درمانی' },
  //   // { name: 'آرایشگاه مهسا', rating: 4.9, reviews: 312, image: '💇', type: 'آرایشگاه زنانه' },
  //   // { name: 'ناخن استودیو نگین', rating: 4.8, reviews: 243, image: '💅', type: 'ناخن و آرایش' },
  // ];


  const [step, setStep] = useState(1);
  const [userPhone, setUserPhone] = useState("");


  const router = useRouter()

  return (
    // <div dir="rtl" className="bg-white" style={{ fontFamily: 'YekanBakh, system-ui, Avenir, Helvetica, Arial, sans-serif' }}>
    //   {/* Navigation */}
    //   <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/90">
    //     <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
    //       <div className="text-2xl font-bold" style={{ color: '#3a3845' }}>
    //         ایزی<span style={{ color: '#ffd39a' }}>بوک</span>
    //       </div>
    //       <div className="flex gap-8 items-center">
    //         <Link
    //           href="/login"
    //           className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:shadow-lg"
    //           style={{ backgroundColor: '#ffd39a', color: '#3a3845' }}
    //         >
    //           ورود / ثبت‌نام
    //         </Link>
    //       </div>
    //     </div>
    //   </nav>

    //   {/* Hero Section */}
    //   <section className="min-h-[500px] flex items-center px-8 py-16" style={{ background: 'linear-gradient(135deg, #3a3845 0%, #4a4855 100%)' }}>
    //     <div className="max-w-7xl mx-auto w-full">
    //       <div className="max-w-2xl">
    //         <h1 className="text-5xl text-white mb-6 font-bold leading-tight">
    //           رزرو نوبت
    //           ایزی<span style={{ color: '#ffd39a' }}>بوک</span>

    //           <br />
    //           <span style={{ color: '#ffd39a' }}>
    //             دریچه‌ای برای ارتقاء شغل و مدیریت زمان شما
    //           </span>
    //         </h1>
    //         <p className="text-xl text-white/90 mb-12 leading-relaxed">
    //           بهترین سالن‌های زیبایی، آرایشگاه‌ها و مراکز ماساژ را پیدا کنید و نوبت خود را آنلاین رزرو کنید
    //         </p>

    //         <div className="flex gap-4 flex-wrap">
    //           <button
    //             className="px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
    //             style={{
    //               backgroundColor: '#ffd39a',
    //               color: '#3a3845',
    //               boxShadow: '0 4px 20px rgba(255, 211, 154, 0.4)'
    //             }}
    //           >
    //             رزرو نوبت
    //           </button>
    //           <button className="bg-transparent border-2 border-white/30 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-white/10 hover:border-white/50">
    //             امکانات
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Features Section */}
    //   <section className="py-20 px-8 bg-gray-50">
    //     <div className="max-w-7xl mx-auto">
    //       <h2 className="text-center text-4xl font-bold mb-12" style={{ color: '#3a3845' }}>
    //         چرا ایزی<span style={{ color: '#ffd39a' }}>بوک</span>؟
    //       </h2>
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    //         {features.map((feature, idx) => (
    //           <div
    //             key={idx}
    //             className="bg-white p-10 rounded-2xl text-center transition-all cursor-pointer border border-gray-100 hover:-translate-y-2"
    //             style={{ boxShadow: '0 0 0 rgba(255, 211, 154, 0)' }}
    //             onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 211, 154, 0.2)'}
    //             onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 0 rgba(255, 211, 154, 0)'}
    //           >
    //             <div
    //               className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
    //               style={{
    //                 backgroundColor: '#ffd39a',
    //                 boxShadow: '0 4px 20px rgba(255, 211, 154, 0.3)'
    //               }}
    //             >
    //               <feature.icon size={36} color="#3a3845" />
    //             </div>
    //             <h3 className="text-xl font-semibold mb-3" style={{ color: '#3a3845' }}>
    //               {feature.title}
    //             </h3>
    //             <p className="text-gray-600 leading-relaxed">
    //               {feature.desc}
    //             </p>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>

    //   {/* Salons Section */}
    //   <section className="py-20 px-8">
    //     <div className="max-w-7xl mx-auto">
    //       <h2 className="text-center text-4xl font-bold mb-12" style={{ color: '#3a3845' }}>
    //         جدید ترین سالن‌ها
    //       </h2>
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //         {salons.map((salon, idx) => (
    //           <div
    //             key={idx}
    //             className="bg-white rounded-3xl overflow-hidden border border-gray-100 transition-all cursor-pointer hover:-translate-y-2"
    //             style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
    //             onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'}
    //             onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'}
    //           >
    //             <div
    //               className="h-56 flex items-center justify-center text-8xl relative"
    //               style={{ background: 'linear-gradient(135deg, #ffd39a20 0%, #ffd39a40 100%)' }}
    //             >
    //               {salon.image}
    //               <div
    //                 className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5"
    //                 style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
    //               >
    //                 <Star size={16} fill="#ffd39a" color="#ffd39a" />
    //                 <span className="font-semibold text-sm" style={{ color: '#3a3845' }}>
    //                   {salon.rating}
    //                 </span>
    //               </div>
    //             </div>
    //             <div className="p-7">
    //               <h3 className="text-xl font-semibold mb-2" style={{ color: '#3a3845' }}>
    //                 {salon.name}
    //               </h3>
    //               <p className="text-gray-600 mb-5 text-sm">
    //                 {salon.type}
    //               </p>
    //               <div className="flex justify-between items-center">
    //                 <span className="text-gray-500 text-sm">
    //                   {/* {salon.reviews} نظر */}
    //                 </span>
    //                 <button
    //                   className="px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105"
    //                   style={{ backgroundColor: '#ffd39a', color: '#3a3845' }}
    //                 >
    //                   رزرو نوبت
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </section>

    //   {/* CTA Section */}
    //   <section className="py-16 px-8 text-center" style={{ backgroundColor: '#3a3845' }}>
    //     <div className="max-w-4xl mx-auto">
    //       <h2 className="text-3xl text-white mb-4 font-bold">
    //         آماده برای تجربه‌ای جدید؟
    //       </h2>
    //       <p className="text-xl text-white/85 mb-8 leading-relaxed">
    //         همین حالا ثبت‌نام کنید و از تخفیف ویژه اولین رزرو بهره‌مند شوید
    //       </p>
    //       <Link
    //         href="/login"
    //         className="px-12 py-4 rounded-lg font-semibold text-lg"
    //         style={{ backgroundColor: '#ffd39a', color: '#3a3845' }}
    //       >
    //         شروع کنید
    //       </Link>
    //     </div>
    //   </section>

    //   {/* Footer */}
    //   <footer className="py-12 px-8 text-white" style={{ backgroundColor: '#2a2835' }}>
    //     <div className="max-w-7xl mx-auto">
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
    //         <div>
    //           <h3 className="text-2xl mb-4" style={{ color: '#ffd39a' }}>EasyBook</h3>
    //           <p className="text-white/70 leading-relaxed">
    //             سامانه هوشمند رزرو آنلاین سالن‌های زیبایی
    //           </p>
    //         </div>
    //         <div>
    //           <h4 className="mb-4 text-lg">دسترسی سریع</h4>
    //           <div className="flex flex-col gap-3">
    //             <a href="#" className="text-white/70 hover:text-white transition-colors">درباره ما</a>
    //             <a href="#" className="text-white/70 hover:text-white transition-colors">سالن‌ها</a>
    //             <a href="#" className="text-white/70 hover:text-white transition-colors">بلاگ</a>
    //             <a href="#" className="text-white/70 hover:text-white transition-colors">پشتیبانی</a>
    //           </div>
    //         </div>
    //         <div>
    //           <h4 className="mb-4 text-lg">تماس با ما</h4>
    //           <div className="flex flex-col gap-3">
    //             <div className="flex items-center gap-2">
    //               <Phone size={18} color="#ffd39a" />
    //               <span className="text-white/70">09137592384</span>
    //             </div>
    //             <div className="flex items-center gap-2">
    //               <Mail size={18} color="#ffd39a" />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
    //         © ۱۴۰۳ EasyBook. تمامی حقوق محفوظ است.
    //       </div>
    //     </div>
    //   </footer>
    // </div>
    <>

      <Suspense fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="animate-spin w-8 h-8 border-4 border-liteGold border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 text-sm mt-4">در حال بارگذاری...</p>
          </div>
        </div>
      }>
        {step === 1 && <LoginForm setStep={setStep} setUserPhone={setUserPhone} />}
        {step === 2 && <CheckOtpForm setStep={setStep} userPhone={userPhone} />}
        {step === 3 && <NameForm setStep={setStep} />}
      </Suspense>
    </>

  );
}