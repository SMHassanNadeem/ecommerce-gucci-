import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabase-client";
import { useEffect, useState } from "react";

export default function Order() {
    const fetchData = async () => {
        const { data, error } = await supabase.from("orders").select("*");
        if (error) throw error;
        return data || [];
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchData,
    });
    useEffect(()=>{
        window.scrollTo(0, 0);
    })
    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching data</p>}

            <div className="grid grid-cols-4 gap-4">
                {data?.map((p) => (
                    <table className="table-auto border-collapse border border-gray-400 w-full text-left mb-6">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-400 px-4 py-2">Field</th>
                                <th className="border border-gray-400 px-4 py-2">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">User Id</td>
                                <td className="border border-gray-400 px-4 py-2">{p.id}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">Email Address</td>
                                <td className="border border-gray-400 px-4 py-2">{p.email}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">Name</td>
                                <td className="border border-gray-400 px-4 py-2">{p.name}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">Country</td>
                                <td className="border border-gray-400 px-4 py-2">{p.country}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">Address</td>
                                <td className="border border-gray-400 px-4 py-2">{p.address}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">Contact</td>
                                <td className="border border-gray-400 px-4 py-2">{p.phone}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">Total Amount</td>
                                <td className="border border-gray-400 px-4 py-2">$ {p.total}</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-400 px-4 py-2">Products</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    {p.product.map((i, idx) => (
                                        <span key={idx} className="mr-2 flex flex-col"> {i.quantity} - {i.title}</span>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" className="border border-gray-400 px-4 py-2 text-center">
                                    {/* <button
                                        onClick={() =>
                                            deleteMutation.mutate({
                                                filePath: p.url.split("/").pop(),
                                                rowId: p.id,
                                            })
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    )
}