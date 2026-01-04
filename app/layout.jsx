import localFont from "next/font/local";
import "./globals.css";
import "./typography.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReservedProvider } from "@/context/ReservedContext";
import Navbar from "@/components/layout/Navbar";
import { UserInfoProvider } from "@/context/UserInfoContext";

const yekanBakh = localFont({
  src: "./fonts/YekanBakhMedium.woff",
  variable: "--font-yekan-bakh",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "سامانه رزرو نوبت آنلاین",
  description: "سامانه هوشمند رزرو نوبت آنلاین - رزرو آسان و سریع",
  keywords: ["رزرو نوبت", "نوبت آنلاین", "رزرو آنلاین"],
  authors: [{ name: "Varna Web", url: "https://varna-web.ir" }],
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#ffd39a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${yekanBakh.variable} ${geistMono.variable} antialiased bg-slate-50`}
      >
        <ReservedProvider>
          <UserInfoProvider>
            <ToastContainer
              position="top-center"
              autoClose={4000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick={true}
              rtl={true}
              theme="light"
              limit={3}
              toastClassName="custom-toast"
              bodyClassName="custom-toast-body"
              style={{ zIndex: 9999 }}
            />

            <Navbar />

            <main className="min-h-[calc(100vh-80px)]">
              {children}
            </main>
          </UserInfoProvider>
        </ReservedProvider>
      </body>
    </html>
  );
}
