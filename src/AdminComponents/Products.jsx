import { useContext, useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { GlobalContext } from "../global";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

export default function Products() {
    const [input, setInput] = useState(null);
    const [filePath, setFilePath] = useState(null);

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [maincategory, setMaincategory] = useState("")
    const [description, setDescription] = useState("")

    const inputRef = useRef(null);

    const queryClient = useQueryClient();

    const handleInputFun = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setInput(e.target.files[0]);
        }
    };

    const { session } = useContext(GlobalContext)
    const [loading,setLoading] = useState(false)
    const addMutation = useMutation({
        mutationFn: async ({ file, title, price, maincategory, description }) => {
            setLoading(true)
            if (!file) throw new Error("No file selected");
            const imageUrl = await uploadImage(file);
            if (!imageUrl) throw new Error("Failed to upload image");

            const { data, error } = await supabase.from("url").insert([{
                url: imageUrl.url, title, price, maincategory, description, user_id: session.user.id,
            }]).select();
            setLoading(false)
            if (error) throw error;
            return data[0];
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(["url"], (oldData) => [...(oldData || []), newData]);
            setInput(null)
            setTitle("")
            setPrice("")
            setMaincategory("")
            setDescription("")
            if (inputRef.current) inputRef.current.value = "";
        },
    });

    const uploadImage = async (file) => {
        const filePath = `${Date.now()}_${file.name}`;
        setFilePath(filePath);
        const { error } = await supabase.storage.from("ecommerce1").upload(filePath, file);
        setFilePath(null);
        if (error) {
            console.error("Error uploading image:", error.message);
            return null;
        }
        const { data } = supabase.storage.from("ecommerce1").getPublicUrl(filePath);
        return { url: data.publicUrl, filePath };
    };

    const fetchData = async () => {
        const { data, error } = await supabase.from("url").select("*");
        if (error) throw error;
        return data || [];
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["url"],
        queryFn: fetchData,
    });

    const deleteImage = async (filePath, rowId) => {
        const { error: storageError } = await supabase
            .storage
            .from("ecommerce1")
            .remove([filePath]);

        if (storageError) {
            console.error("Error deleting image from bucket:", storageError.message);
            return;
        }
        const { error: dbError } = await supabase
            .from("url")
            .delete()
            .eq("id", rowId);

        if (dbError) {
            console.error("Error deleting image from DB:", dbError.message);
            return;
        }
        console.log("Image deleted successfully");
    };
    const deleteMutation = useMutation({
        mutationFn: async ({ filePath, rowId }) => {
            await deleteImage(filePath, rowId);
            return rowId;
        },
        onSuccess: (deletedId) => {
            queryClient.setQueryData(["url"], (oldData) =>
                oldData.filter((item) => item.id !== deletedId)
            );
        },
    });

    const navigate = useNavigate()

    return (
        <>
            <div className=" bg-gray-300 w-[100vw] h-[100vh]">
                <AdminNavbar />
                <div className="flex h-[90vh]">
                    <AdminSidebar />

                    {/* Start */}
                    <div className="flex flex-col overflow-y-scroll h-full w-full">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addMutation.mutate({ file: input, title, price, maincategory, description });
                            }}
                            className="mb-4 flex flex-col"
                        >
                            <input required ref={inputRef} type="file" accept="image/*" onChange={handleInputFun} className="border p-1" />
                            <input required value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Enter product title" className="border p-1" />
                            <input required value={price} onChange={(e) => { setPrice(e.target.value) }} type="number" placeholder="Enter product price" className="border p-1" />
                            <select required value={maincategory} onChange={(e) => { setMaincategory(e.target.value) }} className="border p-1" >
                                <option disabled value="">-- Select Category --</option>
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                            </select>
                            <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="Enter product description" className="border p-1" rows={4} />
                            <button disabled={loading} type="submit" className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded">
                                {loading? "Loading":"Add"}
                            </button>
                        </form>
                        <div>
                            {isLoading && <p className="w-[90vw]">Loading...</p>}
                            {isError && <p>Error fetching data</p>}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                            {data?.map((p) => (
                                <div key={p.id} className="bg-[#e7e7e7] w-full h-auto p-2">
                                    {filePath && p.url.includes(filePath) && <p>Uploading image...</p>}
                                    <img onClick={() => { navigate(`/men-bags/${p.id}`) }} src={p.url} alt="Image Not Found" className="w-full h-[70%] cursor-pointer" />
                                    <h1>{p.title}</h1>
                                    <h1>{p.price}</h1>
                                    <button
                                        onClick={() => deleteMutation.mutate({ filePath: p.url.split("/").pop(), rowId: p.id })}
                                        className=" bg-red-500 text-white px-2 py-1 rounded"
                                    >Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* ENds */}



                </div>
            </div>

        </>
    );
}