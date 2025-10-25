import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../global";
import { useContext } from "react";

export default function AdminNavbar() {
    const { session, signOut } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut();
            navigate("/");
        } catch (err) {
            setError("An unexpected error occurred.");
        }
    };

    return (
        <div className="flex justify-between items-center w-full h-[10vh] bg-gray-200 p-2 text-2xl">
            <h2 className="pl-5">{session?.user?.email}</h2>
            <div onClick={handleSignOut} className="hover:cursor-pointer border inline-block px-3 py-1 ">
                Sign out
            </div>
        </div>
    )
}