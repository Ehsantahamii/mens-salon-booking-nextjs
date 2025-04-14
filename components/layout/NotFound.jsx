"use client"
import Lottie from 'react-lottie-player';
import runFile from "../../lottie/404-animate.json";

const NotFound = () => {

    return (
        <>

            <Lottie animationData={runFile} play loop={true} className='w-[75vw] max-w-[540px]  mx-auto' />

        </>
    );
};

export default NotFound;