"use client"
import "./Preloader.css"
const Preloader = () => {
    return (
        <div className="min-h-screen flex justify-center items-center bg-inherit">

            <div className="loader  p-5 rounded-full flex space-x-4">
                <div className="w-5 h-5 bg-liteGold rounded-full animate-bounce"></div>
                <div className="w-5 h-5  bg-liteGold rounded-full animate-bounce"></div>
                <div className="w-5 h-5 bg-liteGold rounded-full animate-bounce"></div>
            </div>

        </div>);
};

export default Preloader;