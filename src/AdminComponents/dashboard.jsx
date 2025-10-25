import { useQuery } from "@tanstack/react-query";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import { supabase } from "../supabase-client";
import Chart from "./chart";

export default function Dashboard() {

  const fetchOrder = async () => {
    const { data, error } = await supabase.from("orders").select("*");
    if (error) throw error;
    return data || [];
  };
  const { data: orderData } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrder,
  });


  const fetchUrl = async () => {
    const { data, error } = await supabase.from("url").select("*");
    if (error) throw error;
    return data || [];
  };
  const { data: urlData } = useQuery({
    queryKey: ["url"],
    queryFn: fetchUrl,
  });


  return (
    <div className=" bg-gray-300 w-full h-[100vh] text-2xl">
      <AdminNavbar />
      <div className="flex w-full h-[90vh]">
        <AdminSidebar />

        <div className="overflow-y-scroll">
          <Chart data={orderData}/> 
        </div>

      </div>
    </div>
  );
};