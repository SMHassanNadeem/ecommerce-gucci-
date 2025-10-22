import { useContext, useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "./supabase-client";
import { GlobalContext } from "./global";
import { useNavigate } from "react-router-dom";

export default function Products() {
    const [input, setInput] = useState(null);
    const [filePath, setFilePath] = useState(null);

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [mainCategory, setMainCategory] = useState("")
    const [discription, setDiscription] = useState("")

    const inputRef = useRef(null);

    const queryClient = useQueryClient();

    const handleInputFun = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setInput(e.target.files[0]);
        }
    };

    const addMutation = useMutation({
        mutationFn: async ({ file, title, price, mainCategory, discription }) => {
            if (!file) throw new Error("No file selected");
            const imageUrl = await uploadImage(file);
            if (!imageUrl) throw new Error("Failed to upload image");

            const { data, error } = await supabase.from("url").insert([{
                url: imageUrl.url, title, price, mainCategory, discription
            }]).select();
            if (error) throw error;
            return data[0];
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(["url"], (oldData) => [...(oldData || []), newData]);
            setInput(null)
            setTitle("")
            setPrice("")
            setMainCategory("")
            setDiscription("")
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

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addMutation.mutate({ file: input, title, price, mainCategory, discription });
                }}
                className="mb-4 flex flex-col"
            >
                <input ref={inputRef} type="file" accept="image/*" onChange={handleInputFun} className="border p-1" />
                <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" placeholder="Enter product title" className="border p-1" />
                <input value={price} onChange={(e) => { setPrice(e.target.value) }} type="number" placeholder="Enter product price" className="border p-1" />
                <select value={mainCategory} onChange={(e) => { setMainCategory(e.target.value) }} className="border p-1" >
                    <option disabled value="">-- Select Category --</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    {/* <option value="kids">Kids</option> */}
                </select>
                <input value={discription} onChange={(e) => { setDiscription(e.target.value) }} type="text" placeholder="Enter product discription" className="border p-1" />
                <button type="submit" className="cursor-pointer ml-2 px-3 py-1 bg-blue-500 text-white rounded">
                    Add
                </button>
            </form>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching data</p>}

            <div className="grid grid-cols-4 gap-4">
                {data?.map((p) => (
                    <div key={p.id} className="border p-2">
                        {filePath && p.url.includes(filePath) && <p>Uploading image...</p>}
                        <img src={p.url} alt="Image Not Found" className="w-full h-[70%]" />
                        <h1>{p.title}</h1>
                        <h1>{p.price}</h1>
                        <button
                            onClick={() => deleteMutation.mutate({ filePath: p.url.split("/").pop(), rowId: p.id })}
                            className=" bg-red-500 text-white px-2 py-1 rounded"
                        >Delete</button>
                    </div>
                ))}
            </div>
        </>
    );
}