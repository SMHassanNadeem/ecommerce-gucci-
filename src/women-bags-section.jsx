import womenHero from './assets/heroSection-Women.avif'
import { useQuery } from '@tanstack/react-query';
import { supabase } from './supabase-client';
import { useNavigate } from 'react-router-dom';
export default function WomenBagsSection() {
  const fetchData = async () => {
    const { data, error } = await supabase.from("url").select("*").eq("mainCategory", "women");;
    if (error) throw error;
    return data || [];
  };
  const { data: docs } = useQuery({
    queryKey: ["url"],
    queryFn: fetchData,
  });

  const navigate = useNavigate()
  return (
    <div className='flex flex-col'>
      <div className="flex justify-center items-end m-0 p-0 w-[100vw] h-[80vh]">
        <img className="m-0 p-0 w-[100%] h-[100%]" src={womenHero} alt="" />
        <div className="flex flex-col items-center gap-3 pb-7 absolute text-white">
          <h1 className="text-4xl">Handbags for Women</h1>
        </div>
      </div>

      <div>
        <div className='flex justify-between p-3 sticky z-50 top-[5rem] bg-white border-t-1 border-gray-300'>
          <button><i className="fa-solid fa-bars-staggered"></i> Sort By: Recommended</button>
          <button><i className="fa-solid fa-filter"></i> Filters</button>
        </div>
        <div>
          <div className="grid grid-cols-4 gap-4">
            {docs?.map((p) => (
              <div onClick={()=> {navigate(`/women-bags/${p.id}`)}} key={p.id} className="border p-2">
                <img src={p.url} alt="Image Not Found" className="w-full h-auto" />
                <h1>{p.title}</h1>
                <h1>$ {p.price}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
