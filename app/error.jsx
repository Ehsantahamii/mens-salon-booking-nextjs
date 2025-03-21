'use client'

import { useRouter } from "next/navigation"

export default function Error({ error, reset }) {
    const router = useRouter()
    return (
        <section className="w-[100vw] h-screen flex items-center justify-center">
            <div className="flex flex-col gap-6 justify-center items-center">
                <img className="w-[65%] lg:max-w-96" src="/images/login-vector.png" alt="login-vector" />
                <h2 className="text-center">حساب شما منقضی شده است لطفا دوباره وارد شوید.</h2>
                <button className="px-4 py-2 animate-pulse rounded-lg bg-liteGold" onClick={() => router.push("/")}>رفتن به صفحه لاگین</button>
            </div>
        </section>
    )
}