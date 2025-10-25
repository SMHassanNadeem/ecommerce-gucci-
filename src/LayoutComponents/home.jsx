import Footer from "./footer"
import NavbarHome from "../HomeSectionsComponents/navbarHome"
import Section1 from "../HomeSectionsComponents/section1"
import Section2 from "../HomeSectionsComponents/section2"
import Section3 from "../HomeSectionsComponents/section3"
import Section4 from "../HomeSectionsComponents/section4"

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
