import Footer from "./footer"
import NavbarHome from "./HomeSections/navbarHome"
import Section1 from "./HomeSections/section1"
import Section2 from "./HomeSections/section2"
import Section3 from "./HomeSections/section3"
import Section4 from "./HomeSections/section4"

export default function Home() {
    return (
        <>
            <NavbarHome/>
            <div className="flex flex-col mt-[-5rem]">
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
            </div>
            <Footer/>
        </>
    )
}
