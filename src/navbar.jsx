import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function NavbarHome() {
    const navigate = useNavigate()

    const [scrolled,setScrolled] = useState(true)

    return (
        <div className={`${scrolled?"bg-white":"bg-transparent"}  transition-all duration-700 ease-in-out sticky z-[999] top-0 ${scrolled?"text-black":"text-white"} w-[100vw] h-[5rem]`}>
            <div className="flex justify-around items-center h-[100%]">
                <div className="flex-row gap-[2%] items-center hidden sm:flex">
                    <i className="fa-solid fa-plus"></i>
                    <span className="whitespace-nowrap">Contact Us</span>
                </div>
                <h1 className={`${scrolled?"text-4xl sm:text-4xl md:text-4xl lg:text-4xl":"text-[500%] sm:text-[800%] md:text-[1000%] lg:text-[1500%]"} transition-all duration-700 ease-in-out absolute ${scrolled?"top-3 left-6 sm:left-auto":"top-[100px]"} sm:top-[10px]`} style={{ letterSpacing: '50%', fontFamily: "'Cormorant Garamond', serif" }}>
                    GUCCI
                </h1>
                <div className="flex gap-3">
                    <div>
                        <i className="fa-solid fa-bag-shopping"></i>
                    </div>
                    <div>
                        <i className="fa-regular fa-user"></i>
                    </div>
                    <div>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <div>
                        <i className="fa-solid fa-bars"></i>
                    </div>
                    <div>
                        MENU
                    </div>
                </div>
            </div>
        </div>
    )
}