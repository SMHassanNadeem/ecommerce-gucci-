import { Outlet } from "react-router-dom";
import Navbar from './navbar.jsx';
import Footer from "./footer.jsx";
export default function Layout(){
    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}