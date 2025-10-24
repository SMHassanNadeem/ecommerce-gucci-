import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import { GlobalContext } from "../global";

export default function Checkout() {
    const [product, setProduct] = useState([])
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("products")) || []
        setProduct(localData)
    }, [])

    const fetchData = async () => {
        const localData = JSON.parse(localStorage.getItem("products")) || []
        setProduct(localData)
        const products = localData.map(i => i.title)
        const { data, error } = await supabase.from("url").select("*").in("title", products);
        if (error) console.log(error);
        return data || [];
    };
    const { data: docs } = useQuery({
        queryKey: ["url"],
        queryFn: fetchData,
    });

    const total =
        docs && product
            ? docs.reduce((acc, item) => {
                const qty =
                    product.find(
                        (p) => p.title === item.title
                    )?.quantity || 0;
                return acc + (item.price || 0) * qty;
            }, 0) : 0;
    const countries = [
        { code: "US", name: "USA" },
        { code: "CA", name: "Canada" },
        { code: "PK", name: "Pakistan" },
        { code: "IN", name: "India" },
        { code: "AU", name: "Australia" },
        { code: "AU", name: "Saudi Arabia" }
    ];
    const queryClient = useQueryClient()
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState(0)

    const { session } = useContext(GlobalContext)

    const addMutation = useMutation({
        mutationFn: async ({ email, country, name, address, city, phone, total, product }) => {
            const { data, error } = await supabase
                .from("orders")
                .insert([{
                    product, total, email, country, name, address, city, phone,
                    user_id: !session?.user ? null : session.user.id,
                }], { returning: "minimal" });

            if (error) console.log(error);
            return data ? data[0] : null;
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(["orders"], (oldData) => [...(oldData || []), newData]);
            setEmail("")
            setCountry("")
            setName("")
            setAddress("")
            setCity("")
            setPhone("")
            localStorage.clear("products");
            alert("Order Placed")
            window.location.reload()
        },
    })
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="border-r-1 border-t-1 border-gray-300 p-10 flex flex-col items-center sm:items-end w-[100vw] sm:w-[50vw]">
                <form onSubmit={(e) => { e.preventDefault(); if(!localStorage.getItem("products")) return alert("No item selected"); addMutation.mutate({ email, country, name, address, city, phone, total, product }) }} className="flex flex-col gap-3 w-[300px] sm:w-[250px] md:w-[350px] lg:w-[400px]">
                    <input required type="text" readOnly value={total} className="hidden w-full border border-gray-300 rounded px-3 py-2" />
                    <input required type="text" readOnly value={JSON.stringify(product)} className="hidden w-full border border-gray-300 rounded px-3 py-2" />

                    <label className="text-2xl">Contact</label>
                    <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border border-gray-300 focus:border-gray-100 rounded px-3 py-2" placeholder="Email" />

                    <label className="text-2xl">Delivery</label>
                    <select required value={country} onChange={(e) => setCountry(e.target.value)} className="border px-3 py-2 border-gray-300 rounded-md w-full" >
                        <option value="">Select your country</option>
                        {countries.map((c) => (<option key={c.code} value={c.name}>{c.name}</option>))}
                    </select>
                    <input required type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input required type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <input required type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                    <input required type="text" className="w-full border border-gray-300 rounded px-3 py-2" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <button type="submit" className="w-full text-white bg-blue-700 rounded px-3 py-2">Cash on Delivery</button>
                </form>
            </div>
            <div className="border-t-1 border-gray-300 p-10 flex flex-col items-center sm:items-start w-[100vw] sm:w-[50vw] h-auto bg-gray-100">
                <div className="flex flex-col gap-3 w-[300px] sm:w-[250px] md:w-[350px] lg:w-[400px]">
                    <div className="flex justify-between w-full text-lg">
                        <h1>Subtotal</h1>
                        <h1 className="text-sm">$ {total}</h1>
                    </div>
                    <div className="flex justify-between w-full text-xl">
                        <h1>Shipping</h1>
                        <h1 className="text-sm">Free</h1>
                    </div>
                    <div className="flex justify-between w-full text-xl">
                        <h1>Total</h1>
                        <h1 className="text-xl">$ {total}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
