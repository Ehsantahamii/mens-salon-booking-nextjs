import NotFound from "@/components/layout/NotFound"
import Link from "next/link"

function NotFoundPage() {
    return <section className="flex flex-col justify-center items-center">
        <NotFound />
        <h1>
            شما گم شده اید!
        </h1>
        <Link className="px-4 py-2 rounded-lg bg-liteGold text-xl" href="/reservation">بازگشت </Link>

    </section>
}

export default NotFoundPage