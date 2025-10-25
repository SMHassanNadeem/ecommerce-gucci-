import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../global";
import { Skeleton } from '@mui/material';

export default function ShoppingBag() {
    const [flag, setFlag] = useState(false)
    const [product, setProduct] = useState([])
    const fetchData = async () => {
        const localData = JSON.parse(localStorage.getItem("products")) || []
        setProduct(localData)
        const products = localData.map(i => i.title)
        if (products.length > 0) {
            setFlag(true)
        }
        const { data, error } = await supabase.from("url").select("*").in("title", products);
        if (error) throw error;
        return data || [];
    };
    const { data: docs,isLoading,error } = useQuery({
        queryKey: ["url"],
        queryFn: fetchData,
    });

    const { no, setNo } = useContext(GlobalContext)
    const getQuantity = (title) => {
        const found = product.find((p) => p.title === title);
        return found ? found.quantity : 0;
    };

    const updateQuantity = (title, change) => {
        setProduct((prev) => {
            const updated = prev.map((p) => {
                if (p.title === title) {
                    const newQty = Math.max(1, p.quantity + change);
                    return { ...p, quantity: newQty , pricePerOrder: p.price * newQty};
                }
                return p;
            });
            localStorage.setItem("products", JSON.stringify(updated));
            return updated;
        });
    };
    const removeItem = (title) => {
        setProduct((prev) => {
            const updated = prev.filter((p) => p.title !== title);
            localStorage.setItem("products", JSON.stringify(updated));
            return updated;
        });
        window.location.reload();
    };

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    const navigate = useNavigate();
    return (
        <div>
            <img className="w-full h-[20vh] sm:h-[30vh] md:h-[40vh] lg:h-[50vh]" src="https://media.gucci.com/content/HeroShortStandard_3200x654/1753875012/HeroShortStandard_Gucci-FW25-JULY25-250606-46-039-w1-B-SAFE_001_Default.jpg" alt="" />
            <div className="w-50 relative top-[-70px] left-[50%] ml-[-60px] text-white text-2xl z-1">SHOPPING BAG</div>
            <div className="mt-[-53px] ml-[50%] rotate-45 bg-[#1b1b1b] p-5 text-white w-5 h-5 flex justify-center items-center">
                <span className="rotate-320 mr-2">
                    <span>G</span><span className="absolute left-[7px]">C</span>
                </span>
            </div>
            <div className="w-[100vw] h-auto flex flex-col sm:flex-row justify-center gap-5 pt-10">
                <div className="flex flex-col w-full sm:w-[700px] bg-white pl-10">
                    <h1>YOURS COLLECTION</h1>
                    {error && <h1 className='text-2xl w-full h-[50vh] text-center'>Error Fetching Data</h1>}
                    {isLoading ? (
                        [...Array(docs?.length || 4)].map((_, i) => (
                            <Skeleton key={i} variant="rectangular" height={400} animation="wave" />
                        ))
                    ) : (flag ?
                        docs?.map((p) => (
                            <div className="border-t-1 border-gray-400 flex w-full h-[300px]" key={p.id}>
                                <div className="w-[30%] h-[90%] my-auto">
                                    <img src={p.url} alt="Image Not Found" className="w-[100%] h-[100%]" />
                                </div>
                                <div className="flex flex-col gap-3 bg-white p-5 w-[70%] h-[100%]">
                                    <div className="flex flex-col gap-2 justify-between text-2xl text-gray-600">
                                        <h1>{p.title}</h1>
                                        <div className="border rounded-2xl flex justify-around items-center w-[5rem] h-[3rem]">
                                            <button className="cursor-pointer" onClick={() => updateQuantity(p.title, -1)}>-</button>
                                            <h1>{getQuantity(p.title)}</h1>
                                            <button className="cursor-pointer" onClick={() => updateQuantity(p.title, +1)}>+</button>
                                        </div>
                                        <h1>$ {p.price * getQuantity(p?.title)}</h1>
                                    </div>
                                    <div className=" overflow-hidden">{p?.discription}</div>
                                    <div>
                                        <button onClick={() => removeItem(p.title)} className="cursor-pointer border-b-1 border-gray-400">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <h1>Shopping bag is empty</h1>
                    )}
                </div>
                <div className="flex flex-col gap-3 border border-gray-400 h-[100vh] w-full sm:w-[300px] p-7 text-sm">
                    <div className="border-b-1 border-gray-400 py-2">ORDER SUMMARY</div>
                    <div className="flex justify-between">
                        <h1>Subtotal</h1>
                        <h1 >$
                            {docs && product ?
                                docs.reduce((acc, item) => {
                                    const qty = product.find(p => p.title === item.title)?.quantity || 0;
                                    return acc + item.price * qty;
                                }, 0)
                                : 0}
                        </h1>
                    </div>
                    <div className="flex justify-between">
                        <h1>Shipping</h1>
                        <h1>Free</h1>
                    </div>
                    <div className="flex justify-between">
                        <h1>Estimated Tax</h1>
                        <h1>$ 0</h1>
                    </div>
                    <div className="flex justify-between">
                        <h1>Estimated Total</h1>
                        <h1>$
                            {docs && product ?
                                docs.reduce((acc, item) => {
                                    const qty = product.find(p => p.title === item.title)?.quantity || 0;
                                    return acc + item.price * qty;
                                }, 0)
                                : 0}
                        </h1>
                    </div>
                    <div className="text-justify">
                        <h1 className="py-3">VIEW DETAILS</h1>
                        <h1>You will be charged at the time of shipment. If this is a personalized or made-to-order purchase, you will be charged at the time of purchase.</h1>
                    </div>
                    <button disabled={product?.length < 1} onClick={() => {navigate('/checkout')}} className="cursor-pointer bg-black text-white w-full py-3 my-3">
                        CHECKOUT
                    </button>
                    <h1>OR</h1>
                    <button className="cursor-pointer bg-white border text-black w-full py-3 my-3">Pay with PayPal</button>
                </div>
            </div>
        </div>
    )
}