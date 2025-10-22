import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { GlobalContext } from "./global";
import { useContext } from "react";
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'
import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase-client";

export default function NavbarHome() {
    const navigate = useNavigate()

    const [scrolled, setScrolled] = useState(true)

    const { notif } = useContext(GlobalContext)

    const [openContact, setOpenContact] = useState(false)
    // const [openProfile,setOpenProfile] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    const [search,setSearch] = useState("")
    const fetchData = async () => {
        if(!search) return [];
        const { data, error } = await supabase.from("url").select("*").eq("title",search);
        if (error) throw error;
        return data || [];
    };

    const { data, isLoading, isError ,refetch} = useQuery({
        queryKey: ["url", search],
        queryFn: fetchData,
        enabled: false, 
    });
    return (
        <div className={`${scrolled ? "bg-white" : "bg-transparent"}  transition-all duration-700 ease-in-out sticky z-[999] top-0 ${scrolled ? "text-black" : "text-white"} w-[100vw] h-[5rem]`}>
            <Dialog
                open={openMenu}
                onClose={() => setOpenMenu(false)}
                sx={{
                    "& .MuiDialog-container": {
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        height: '110vh'
                    },
                }}
                PaperProps={{
                    sx: {
                        height: "100vh",
                        margin: 0,
                        borderRadius: 0,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        paddingY: "50px",
                        width: "50vw",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: 'flex-start',
                        gap: "10px",
                    }}
                >
                    <div className="flex flex-col gap-3 items-start">
                        <button className="text-xl cursor-pointer" onClick={() => navigate('/man-bags')}>Man</button>
                        <button className="text-xl cursor-pointer" onClick={() => navigate('/man-bags')}>Women</button>
                    </div>
                </DialogTitle>
            </Dialog>
            <Dialog
                open={openSearch}
                onClose={() => setOpenSearch(false)}
                sx={{
                    "& .MuiDialog-container": {
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        height: '110vh',
                    },
                }}
                PaperProps={{
                    sx: {
                        height: "100vh",
                        margin: 0,
                        borderRadius: 0,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        padding: "50px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "10px",
                        width: "50vw"
                    }}
                >
                    <div>
                        <form onSubmit={(e)=> {e.preventDefault(); refetch()}}>
                            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="search" className="border-b-1 border-gray-300 w-full pl-2" placeholder="Search..." />
                        </form>
                        {isLoading && <p>Loading...</p>}
                        {isError && <p>Not Found...</p>}
                        {data?.map((p) => (
                            <div key={p.id} className="border p-2">
                                <h1 onClick={()=>navigate(`/${p.mainCategory}-bags/${p.id}`)}>{p.title}</h1>
                            </div>
                        ))}
                    </div>
                </DialogTitle>
            </Dialog>
            {/* <Dialog
                open={openProfile}
                onClose={() => setOpenProfile(false)}
                sx={{
                    "& .MuiDialog-container": {
                        justifyContent: "flex-start",
                        alignItems: "stretch",  
                        height:'110vh'    
                    },
                }}
                PaperProps={{
                    sx: {
                        height: "100vh",
                        margin: 0,
                        borderRadius: 0, 
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        padding: "50px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <div>
                        Hi
                    </div>
                </DialogTitle>
            </Dialog> */}
            <Dialog
                open={openContact}
                onClose={() => setOpenContact(false)}
                sx={{
                    "& .MuiDialog-container": {
                        justifyContent: "flex-end",
                        alignItems: "stretch",
                        height: '110vh'
                    },
                }}
                PaperProps={{
                    sx: {
                        height: "100vh",
                        margin: 0,
                        borderRadius: 0,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        padding: "50px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <h1>CONTACT US</h1>
                        <h1 className="text-sm">CALL US : 03412367061</h1>
                        <h1 className="text-sm">EMAIL ADDRESS : hassan64us@gmail.com</h1>
                    </div>
                </DialogTitle>
            </Dialog>
            <div className="flex justify-around items-center w-full h-[100%]">
                <div onClick={() => setOpenContact(true)} className="cursor-pointer z-[100] flex-row gap-[2%] items-center hidden sm:flex">
                    <i className="fa-solid fa-plus"></i>
                    <span className="whitespace-nowrap">Contact Us</span>
                </div>
                <h1 onClick={() => navigate('/')} className={`z-[90] cursor-pointer ${scrolled ? "text-4xl sm:text-4xl md:text-4xl lg:text-4xl" : "text-[500%] sm:text-[800%] md:text-[1000%] lg:text-[1500%]"} transition-all duration-700 ease-in-out absolute ${scrolled ? "top-3 left-6 sm:left-auto" : "top-[100px]"} sm:top-[10px]`} style={{ letterSpacing: '50%', fontFamily: "'Cormorant Garamond', serif" }}>
                    GUCCI
                </h1>
                <div className="cursor-pointer flex gap-3 z-[100] ml-30 sm:ml-0">
                    <div className="cursor-pointer" onClick={() => navigate('/shopping-bags')}>
                        <i className="fa-solid fa-bag-shopping text-2xl"></i>
                        {notif > 0 ? <span className="text-white text-xs ml-[-18px]">{notif}</span> : null}
                    </div>
                    {/* <div onClick={() => setOpenProfile(true)} className="cursor-pointer z-[100]">
                        <i className="fa-regular fa-user text-2xl"></i>
                    </div> */}
                    <div onClick={() => setOpenSearch(true)} className="cursor-pointer z-[100]">
                        <i className="fa-solid fa-magnifying-glass text-2xl"></i>
                    </div>
                    <div onClick={() => setOpenMenu(true)} className="cursor-pointer flex z-[100]">
                        <i className="fa-solid fa-bars text-2xl"></i>
                        <div>MENU</div>
                    </div>
                </div>
            </div>
        </div>
    )
}