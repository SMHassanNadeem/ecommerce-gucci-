import { useNavigate } from 'react-router-dom'
import heroMain from '../assets/heroSection-Women.avif'
export default function Section1() {
    const navigate = useNavigate()
    return (
        <div className="flex justify-center items-end m-0 p-0 w-[100vw] h-[100vh]">
            <img onClick={()=> navigate('women-bags')} className="cursor-pointer m-0 p-0 w-[100%] h-[100%]" src={heroMain} alt="" />
            <div className="flex flex-col items-center gap-3 pb-7 absolute text-white">
                <h1 className="text-4xl">Handbags</h1>
                <button onClick={()=> navigate('women-bags')} className="bg-white text-black px-4 py-2 rounded cursor-pointer">SHOP NOW</button>
            </div>
        </div>
    )
}