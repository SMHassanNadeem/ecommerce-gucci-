import { useNavigate, useParams } from "react-router-dom";
import { supabase } from '../supabase-client';
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../global";
import { Skeleton } from '@mui/material';

export default function WBSDetail() {
    const savedProduct = JSON.parse(localStorage.getItem("product")) || { quantity: 0 };
    const [quantity, setQuantity] = useState(savedProduct.quantity || 0)
    const { id } = useParams()

    const fetchData = async () => {
        const { data, error } = await supabase.from("url").select("*").eq("id", `${id}`);
        if (error) throw error;
        return data || [];
    };
    const { data: docs, isLoading, error } = useQuery({
        queryKey: ["url", id],
        queryFn: fetchData,
        enabled: !!id,
    });


    const { setNotif } = useContext(GlobalContext)
    const { no, setNo } = useContext(GlobalContext)
    const [toast, setToast] = useState(null);
    function addToBag(p) {
        let products = JSON.parse(localStorage.getItem("products")) || [];
        const existingProduct = products.find((item) => item.title === p.title);

        if (existingProduct) {
            alert('already saved')
        } else {
            products.push({
                title: p?.title,
                quantity: 0 + no,
                price:p?.price,
                pricePerProduct:p?.price * no,
            });
        }
        localStorage.setItem("products", JSON.stringify(products));
        const notification = JSON.parse(localStorage.getItem("products")) || []
        setNotif(notification?.length)

        setToast("✅ Added to Bag!");
        setTimeout(() => setToast(null), 2000);

        setNo(1);
    }

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    const navigate = useNavigate()

    return (
        <div className="w-full h-auto">
            {toast && (
                <div onClick={()=> navigate('/shopping-bags')} className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-[#e7e7e7] text-black px-6 py-2 rounded-lg shadow-lg z-50 animate-fadeInOut">
                    {toast}
                </div>
            )}
            {error && <h1 className='text-2xl w-full h-[50vh] text-center'>Error Fetching Data</h1>}
            {isLoading ? (
                [...Array(docs?.length || 4)].map((_, i) => (
                    <Skeleton key={i} variant="rectangular" height={400} animation="wave" />
                ))
            ) : (docs?.map((p) => (
                <div onClick={() => { navigate(`/women-bags/${p.id}`) }} key={p.id} className="flex flex-col border w-full h-auto bg-[#e7e7e7]">
                    <div className="h-[85vh] py-5 flex flex-col items-center justify-center">
                        <img src={p.url} alt="Image Not Found" className="w-auto h-[100%]" />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3 w-full bg-white p-10">
                            <div className="flex justify-between">
                                <div>
                                    <h1>{p.title}</h1>
                                    <h1>$ {p.price * no}</h1>
                                    <p className="whitespace-pre-line">{p?.description.replace(/\\n/g, "\n")}</p>
                                </div>
                                <div className="border rounded-2xl flex justify-around items-center w-[5rem] h-[3rem]">
                                    <button className="cursor-pointer" onClick={() => setNo(no > 1 ? no - 1 : no)}>-</button>
                                    <h1>{no}</h1>
                                    <button className="cursor-pointer" onClick={() => setNo(no + 1)}>+</button>
                                </div>
                                <button onClick={() => addToBag(p)} className="bg-black text-white px-[5%] py-[1%] cursor-pointer h-[4rem]">ADD TO BAG</button>
                            </div>
                        </div>
                    </div>
                </div>
            )))}
        </div>
    )
}