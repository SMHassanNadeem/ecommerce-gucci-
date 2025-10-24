import { Outlet } from "react-router-dom";
import Navbar from './LayoutComponents/navbar.jsx';
import Footer from "./LayoutComponents/footer.jsx";
export default function Layout(){
    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}