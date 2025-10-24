import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../supabase-client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"

export default function OrderDetail() {
    const { id } = useParams()

    const fetchData = async () => {
        const { data, error } = await supabase.from("orders").select("*").eq("id", id)
        if (error) throw error;
        return data || [];
    }
    const { data, isLoading, error } = useQuery({
        queryKey: ["orders", id],
        queryFn: fetchData,
    })


    const queryClient = useQueryClient()
    const updateMutation = useMutation({
        mutationFn: async ({ id, currentStatus }) => {
            const newStatus = currentStatus === "pending" ? "done" : "pending";
            const { data, error } = await supabase
                .from("orders")
                .update({ status: newStatus })
                .eq("id", id)
                .select();
            if (error) throw error;
            return { id, newStatus };
        },
        onSuccess: ({ id, newStatus }) => {
            queryClient.invalidateQueries(["orders", id]);
            queryClient.setQueryData(["orders", id], (oldData) =>
                oldData.map((order) =>
                    order.id === id ? { ...order, status: newStatus } : order
                ),
            );
        },
    });


    const allTitles = data?.flatMap((order) => order?.product?.map((p) => p.title)) || [];
    const fetchProduct = async (titles) => {
        if (!titles?.length) return [];
        const { data, error } = await supabase
            .from("url")
            .select("*")
            .in("title", titles);
        if (error) throw error;
        return data || [];
    };
    const { data: imageAndNav } = useQuery({
        queryKey: ["url", allTitles],
        queryFn: () => fetchProduct(allTitles),
        enabled: allTitles.length > 0,
    });

    const navigate = useNavigate()
    return (
        <>
            <div className=" bg-gray-300 w-full h-[100vh]">
                <AdminNavbar />
                <div className="flex w-full h-[90vh]">
                    <AdminSidebar />

                    <div className="w-full overflow-y-scroll">
                        {isLoading && <p>Loading...</p>}
                        {error && <p>Error fetching data</p>}
                        {
                            data?.map((i) => (
                                <div className="flex flex-col items-center" key={i?.id}>
                                    <div className="flex flex-col mt-3 rounded p-4 bg-white w-[75%]">
                                        <h1 className="text-xl">Order #{i?.id} details</h1>
                                        <p className="text-md">Payment on delivery</p>
                                        <div className="flex justify-between">
                                            <div className="flex flex-col gap-1 mt-2 text-md">
                                                <p>Date Created :</p>
                                                <h1 className="border rounded p-1 w-60 text-xl">{i?.created_at.slice(0, 10)}</h1>
                                                <p>Status :</p>
                                                <button
                                                    onClick={() => {
                                                        updateMutation.mutate({
                                                            id: i.id,
                                                            currentStatus: i.status,
                                                        })
                                                    }}
                                                    className={`text-white px-3 py-1 rounded ${i.status === "pending"
                                                        ? "bg-red-500 hover:bg-red-600"
                                                        : "bg-green-600 hover:bg-green-700"
                                                        }`}>
                                                    {updateMutation.isPending
                                                        ? "Updating..."
                                                        : i.status === "pending"
                                                            ? "Mark as Pending"
                                                            : "Mark as Done"}
                                                </button>
                                                {/* <h1 className="border rounded p-1 w-60 text-xl">{i?.status}</h1> */}
                                                <p>Total Amount :</p>
                                                <h1 className="border rounded p-1 w-60 text-xl">{i?.total}</h1>
                                            </div>
                                            <div className="flex flex-col gap-1 mt-2 text-md">
                                                <p>User Name :</p>
                                                <h1 className="border rounded p-1 w-60 text-xl">{i?.address}</h1>
                                                <p>Country :</p>
                                                <h1 className="border rounded p-1 w-60 text-xl">{i?.country}</h1>
                                                <p>Email Address :</p>
                                                <h1 className="border rounded p-1 w-60 text-xl">{i?.email}</h1>
                                                <p>Contact Number :</p>
                                                <h1 className="border rounded p-1 w-60 text-xl">{i?.phone}</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table-auto mt-3 rounded p-4 bg-white w-[75%]">
                                        <tbody>
                                            <tr className="text-left">
                                                <td className="p-1">Image</td>
                                                <td className="p-1">Title</td>
                                                <td className="p-1 text-right">Price</td>
                                                <td className="p-1 text-right">Quantity</td>
                                            </tr>
                                            {
                                                data?.map((items) => (
                                                    items?.product.map((prod) => {
                                                        const matched =
                                                            imageAndNav?.find(
                                                                (img) => img.title === prod.title
                                                            ) || {};
                                                        return (
                                                            <tr className="" key={prod?.title}>
                                                                <td className="w-50 p-1">
                                                                    {matched?.url && (
                                                                        <img
                                                                            src={matched.url}
                                                                            alt={prod.title}
                                                                            className="w-30 h-30 rounded"
                                                                        />
                                                                    )}
                                                                </td>
                                                                <td className="p-1 break-words">{prod?.title}</td>
                                                                <td className="p-1 text-right">{prod?.pricePerOrder}</td>
                                                                <td className="p-1 pr-9 text-right">{prod?.quantity}</td>
                                                            </tr>
                                                        )
                                                    })
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}