import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../global";
import AdminSidebar from "./AdminSidebar";
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'

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

    const [sortedDocs, setSortedDocs] = useState([]);
    const [sortBy, setSortBy] = useState("")
    const [openSort, setOpenSort] = useState(false)
    useEffect(() => {
        if (data) {
            let sorted = [...data];
            if (sortBy === "newest") {
                sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }
            else if (sortBy === "oldest") {
                sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            }
            else if (sortBy === "pending") {
                sorted.sort((a, b) => {
                    if (a.status === "pending" && b.status !== "pending") return -1;
                    if (a.status !== "pending" && b.status === "pending") return 1;
                    return 0;
                });
            }
            else if (sortBy === "done") {
                sorted.sort((a, b) => {
                    if (a.status === "done" && b.status !== "done") return -1;
                    if (a.status !== "done" && b.status === "done") return 1;
                    return 0;
                });
            }
            setSortedDocs(sorted);
        }
    }, [data, sortBy]);

    useEffect(() => {
        window.scrollTo(0, 0);
    })

    const navigate = useNavigate()
    return (
        <>
            <div className="bg-gray-300 w-[100vw] h-[100vh]">
                <AdminNavbar />
                <div className="flex h-[90vh] w-[100vw]">
                    <AdminSidebar />

                    <Dialog
                        open={openSort}
                        onClose={() => setOpenSort(false)}
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
                                width: '50vw'
                            }}
                        >
                            <div className="flex flex-col gap-2">
                                <h1>SORT BY</h1>
                                <div onClick={() => { setSortBy("newest"); setOpenSort(false) }} className='flex gap-3'>
                                    <input type="radio" id='sortByNewest' name="sort" checked={sortBy === "newest"} readOnly />
                                    <label htmlFor="sortByNewest">Newest</label>
                                </div>
                                <div onClick={() => { setSortBy("oldest"); setOpenSort(false) }} className='flex gap-3'>
                                    <input type="radio" id='sortByOldest' name="sort" checked={sortBy === "oldest"} readOnly />
                                    <label htmlFor="sortByOldest">Oldest</label>
                                </div>
                                <div onClick={() => { setSortBy("pending"); setOpenSort(false) }} className='flex gap-3'>
                                    <input type="radio" id='sortBypending' name='sort' checked={sortBy === "pending"} readOnly />
                                    <label htmlFor="sortBypending">pending</label>
                                </div>
                                <div onClick={() => { setSortBy("done"); setOpenSort(false) }} className='flex gap-3'>
                                    <input type="radio" id='sortByDone' name="sort" checked={sortBy === "done"} readOnly />
                                    <label htmlFor="sortByDone">done</label>
                                </div>
                            </div>
                        </DialogTitle>
                    </Dialog>

                    {isLoading && <p>Loading...</p>}
                    {isError && <p>Error fetching data</p>}
                    {/*start */}

                    <div className="grid grid-cols-4 gap-4 overflow-y-scroll h-full w-full ">
                        <table className="table-auto border-collapse border border-gray-400 w-[90vw] h-full overflow-y-scroll text-left mb-6">
                            <thead className="w-full bg-amber-50">
                                <tr>
                                    <th colSpan={9} className="py-3 pl-3 w-full">
                                        <span onClick={() => setOpenSort(true)} className="cursor-pointer"><i className="fa-solid fa-bars-staggered"></i> Sort By: Recommended</span>
                                    </th>
                                </tr>
                            </thead>
                            <thead className="bg-gray-200 h-[5rem]">
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">Order Id</th>
                                    <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">Email Address</th>
                                    <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">Name</th>
                                    <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">Country</th>
                                    <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">Address</th>
                                    <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">Contact</th>
                                    <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">Total Amount</th>
                                    <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">Product</th>
                                    <th className="border border-gray-400 px-4 py-2 whitespace-nowrap">Status</th>
                                </tr>
                            </thead>
                            {sortedDocs?.map((p) => (
                                <tbody onClick={() => navigate(`/admin/orders/${p?.id}`)} key={p?.id}>
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-1 whitespace-nowrap ">{p.id}</td>
                                        <td className="border border-gray-400 px-4 py-1 whitespace-nowrap ">{p.email}</td>
                                        <td className="border border-gray-400 px-4 py-1 whitespace-nowrap ">{p.name}</td>
                                        <td className="border border-gray-400 px-4 py-1 whitespace-nowrap ">{p.country}</td>
                                        <td className="border border-gray-400 px-4 py-1 whitespace-nowrap ">{p.address}</td>
                                        <td className="border border-gray-400 px-4 py-1 whitespace-nowrap ">{p.phone}</td>
                                        <td className="border border-gray-400 px-4 py-1 whitespace-nowrap ">$ {p.total}</td>
                                        <td className="border border-gray-400 px-4 py-1 whitespace-nowrap ">
                                            {p.product.map((i, idx) => (
                                                <span key={idx} className="mr-2 flex flex-col"> {i.quantity} - {i.title}</span>
                                            ))}
                                        </td>
                                        <td colSpan="2" className="border border-gray-400 px-4 py-2 whitespace-nowrap text-center">
                                            <button
                                                className={`text-white px-3 py-1 rounded ${p.status === "pending"
                                                    ? "bg-red-500 hover:bg-red-600"
                                                    : "bg-green-600 hover:bg-green-700"
                                                    }`}>
                                                {
                                                    p.status === "pending"
                                                        ? "Mark as Pending"
                                                        : "Mark as Done"
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                    {/* END */}


                </div>
            </div>

            <div>
            </div>
        </>
    )
}