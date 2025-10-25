import { useNavigate } from 'react-router-dom'
import heroSec1 from '../assets/heroSection-Giglio.avif'
import heroSec2 from '../assets/heroSection-man.avif'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

export default function Section2() {

    useEffect(() => {
        AOS.init({
            duration: 1000,       
            easing: "ease",
            once: true,         
            offset: 10,
        });
    }, []);

    const navigate = useNavigate()
    return (
        <div className="flex w-[100vw] mt-3 mb-3 justify-center items-center">
            <div className=" w-[98%] flex flex-col sm:flex-row gap-3">
                <div className="w-[100%] sm:w-[50%] flex items-end justify-center m-0 p-0">
                    <img data-aos="fadeZoomOut" src={heroSec1} onClick={() => navigate('women-bags')}
                        alt="" className="w-[100%] cursor-pointer" />
                    <div className="pb-7 gap-3 flex flex-col items-center absolute z-[1] text-white">
                        <h1 className="text-4xl text-center whitespace-wrap">New Gucci Giglio Back Denim</h1>
                        <button onClick={() => navigate('women-bags')} className=" hover:bg-white hover:text-black transition-colors duration-700 ease-in-out  bg-[#00000054] border-1 border-white text-white px-4 py-2 rounded cursor-pointer">SHOP NOW</button>
                    </div>
                </div>
                <div className="w-[100%] sm:w-[50%] flex items-end justify-center m-0 p-0">
                    <img data-aos="fadeZoomOut" src={heroSec2} onClick={() => navigate('men-bags')}
                        alt="" className="w-[100%] cursor-pointer" />
                    <div className="pb-7 gap-3 flex flex-col items-center absolute z-[1] text-white">
                        <h1 className="text-4xl whitespace-nowrap">Men's Bags</h1>
                        <button onClick={() => navigate('men-bags')} className=" hover:bg-white hover:text-black transition-colors duration-700 ease-in-out bg-[#00000054] border-1 border-white text-white px-4 py-2 rounded cursor-pointer">SHOP NOW</button>
                    </div>
                </div>
            </div>
        </div>
    )
}