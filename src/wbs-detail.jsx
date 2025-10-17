import { useNavigate, useParams } from "react-router-dom";
import { supabase } from './supabase-client';
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export default function WBSDetail() {
    const savedProduct = JSON.parse(localStorage.getItem("product")) || { quantity: 0 };
    const [quantity, setQuantity] = useState(savedProduct.quantity || 0)
    const { id } = useParams()

    const fetchData = async () => {
        const { data, error } = await supabase.from("url").select("*").eq("id", `${id}`);;
        if (error) throw error;
        return data || [];
    };
    const { data: docs } = useQuery({
        queryKey: ["url"],
        queryFn: fetchData,
    });


    function addToBag(p) {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        const product = {
            title: p.title,
            quantity: newQuantity,
        }
        localStorage.setItem("product", JSON.stringify(product));
    }

    const navigate = useNavigate()

    return (
        <div className="w-full h-auto">
            {docs?.map((p) => (
                <div onClick={() => { navigate(`/women-bags/${p.id}`) }} key={p.id} className="flex flex-col border w-full h-auto bg-[#e7e7e7]">
                    <div className="h-[85vh] py-5 flex flex-col items-center justify-center">
                        <img src={p.url} alt="Image Not Found" className="w-auto h-[100%]" />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3 w-full bg-white p-10">
                            <div className="flex justify-between">
                                <div>
                                    <h1>{p.title}</h1>
                                    <h1>$ {p.price}</h1>
                                    <h1>{p?.discription}</h1>
                                </div>
                                <button onClick={() => addToBag(p)} className="bg-black text-white px-[5%] py-[1%] cursor-pointer">ADD TO BAG</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}