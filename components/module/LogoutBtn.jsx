"use client"
import { logout } from "@/actions/LoginActions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

const LogoutBtn = () => {
    const [data, setData] = useState("");
    const router = useRouter()

    const handleLogout = async () => {
        const response = await logout();
        setData(response);
    };
    useEffect(() => {
        if (data.status === "success") {
            router.push("/")
            toast(data?.message, { type: `${data.status}` });
        } else {
            toast(data?.message, { type: `${data.status}` });
        }
    }, [data]);


    return (
        <button className="text-red-500" onClick={handleLogout} >
            خروج
        </button>
    );
};

export default LogoutBtn;