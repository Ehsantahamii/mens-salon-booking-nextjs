"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("react-lottie-player"), {
    ssr: false,
});

import runFile from "../../lottie/404-animate.json";

export default function NotFound() {
    return (
        <div className="flex justify-center">
            <Lottie
                animationData={runFile}
                play
                loop
                className="w-[75vw] max-w-[540px] mx-auto"
            />
        </div>
    );
}
