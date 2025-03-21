// "use client"
// import { FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaYoutube } from "react-icons/fa6";
// import { RxCross2 } from "react-icons/rx";

// const MobileNavbar = ({ openNav, setOpenNav }) => {
//     return (
//         <div className={`fixed block z-[999999] min-[1080px]:hidden transition-all p-4 text-[#ffffff] h-full w-[85vw] md:w-[40vw] top-0 bottom-0 bg-boxBg ${openNav ? "right-0" : "right-[-100%]"}`}>
//             <button className="absolute left-4 top-4" onClick={() => {
//                 document.getElementById("main").classList.remove('bg-overlay');
//                 setOpenNav(!openNav);

//             }} >
//                 <RxCross2 size={24} color="white" />
//             </button>
//             <ul className="flex flex-col px-4 py-8 gap-8">
//                 <li>
//                     صفحه اصلی
//                 </li>
//                 <li>
//                     خدمات ما
//                 </li>
//                 <li>
//                     بلاگ
//                 </li>
//                 <li>
//                     درباره ما
//                 </li>
//                 <li>
//                     تماس با ما
//                 </li>
//             </ul>
//             <div className="socials flex gap-2">
//                 <FaInstagram />
//                 <FaTelegram />
//                 <FaYoutube />
//                 <FaTwitter />
//                 <FaFacebook />
//             </div>
//         </div>
//     );
// };

// export default MobileNavbar;