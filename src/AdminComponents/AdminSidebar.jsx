import { useNavigate } from "react-router-dom"

export default function AdminSidebar(){
    const navigate = useNavigate()
    return(
        <div className="flex flex-col gap-3 w-[10vw] h-[90vh] py-3 border text-2xl ">
          <button className="cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="cursor-pointer" onClick={() => navigate('/admin/product')}>Products</button>
          <button className="cursor-pointer" onClick={() => navigate('/admin/orders')}>Orders</button>
        </div>
    )
}