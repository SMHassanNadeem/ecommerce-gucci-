import video1 from '../assets/main.mp4'
import video2 from '../assets/main (1).mp4'
import video3 from '../assets/main (2).mp4'

export default function Section4() {

    return (
        <div className="w-[100vw] flex flex-col items-center">
            <div className="text-black text-center p-10">
                <h1 className="text-4xl">GUCCI SERVICES</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-1 w-[100vw] lg:w-[1000px] lg:h-[470px]">
                <div className="w-[100%] h-[100%] lg:w-[33.33%] flex flex-col text-center">
                    <video className="h-[70%]" autoPlay={true} loop muted>
                        <source src={video1} />
                    </video>
                    <div className="h-[70%]">
                        <h1 className="text-xl p-3">Personalization</h1>
                        <p>Emboss select bags, luggage, belts, leather accessories, and items from the pet’s collection with initials to create a truly unique piece.</p>
                    </div>
                </div>
                <div className="w-[100%] lg:w-[66.66%] flex flex-row h-[100%] gap-1 text-center">
                    <div className="h-[100%] w-[50%] flex flex-col">
                        <video className="w-[100%] h-[70%]" autoPlay={true} loop muted>
                            <source src={video2} />
                        </video>
                        <div className="h-[30%] w-[90%] ml-[5%]">
                            <h1 className="text-xl p-3">Collect In Store</h1>
                            <p>Order online and collect your order from your preferred Gucci boutique.</p>
                        </div>
                    </div>
                    <div className="h-[100%] w-[50%] flex flex-col text-center">
                        <video className="w-[100%] h-[70%]" autoPlay={true} loop muted>
                            <source src={video3} />
                        </video>
                        <div className="h-[30%]">
                            <h1 className="text-xl p-3">Book an Appointment</h1>
                            <p>Enjoy priority access to the boutique of your choice at the time and date that suits you. When you arrive, your Client Advisor will guide you through a hand-picked selection of pieces for you to try-on and style.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}