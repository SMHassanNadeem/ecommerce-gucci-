import { useEffect } from 'react';
import main1 from '../assets/mainSection1.avif'
import main2 from '../assets/mainSection2.avif'
import main3 from '../assets/mainSection3.avif'
import AOS from 'aos';
import "aos/dist/aos.css";

export default function Section3() {
    useEffect(() => {
            AOS.init({
                duration: 1200,       
                easing: "ease",
                once: true,         
                offset: 10,
            });
        }, []);

    return (
        <div className="w-[100vw] flex flex-col items-center">
            <div className="text-black text-center p-10">
                <h1 className="text-4xl">SEASONAL NARRATIVES</h1>
                <p className="text-xl mt-2">Shop a series of unique curations, where inspiration meets wardrobe essentials of the House.</p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center gap-1 w-[100vw] lg:w-[1000px] lg:h-[444px]">
                <div className="w-[100%] h-[100%] lg:w-[33.33%] flex flex-col items-center">
                    <img data-aos="fadeZoomOut" src={main1} alt="" className="h-[95%]" />
                    <p>A Touch of Suede For Fall</p>
                </div>
                <div className="w-[100%] lg:w-[66.66%] flex flex-row h-[100%] gap-3">
                    <div className="h-[100%] flex flex-col items-center">
                        <img data-aos="fadeZoomOut" src={main2} alt="" className="h-[100%]" />
                        <p>New In: Women's Fall Winter Shoes</p>
                    </div>
                    <div className="h-[100%] flex flex-col items-center">
                        <img data-aos="fadeZoomOut" src={main3} alt="" className="h-[100%]" />
                        <p>Men's Boots for Fall</p>
                    </div>
                </div>
            </div>
        </div>
    )
}