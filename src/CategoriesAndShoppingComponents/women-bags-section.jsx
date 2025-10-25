import womenHero from '../assets/heroSection-Women.avif'
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../supabase-client';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material'
export default function WomenBagsSection() {
  const fetchData = async () => {
    const { data, error } = await supabase.from("url").select("*").eq("maincategory", "women");
    if (error) throw error;
    return data || [];
  };
  const { data: docs, isLoading, error } = useQuery({
    queryKey: ["url"],
    queryFn: fetchData,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const [openSort, setOpenSort] = useState(false)

  const [sortBy, setSortBy] = useState("")
  const [sortedDocs, setSortedDocs] = useState([]);
  useEffect(() => {
    if (docs) {
      let sorted = [...docs];
      if (sortBy === "newest") {
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
      else if (sortBy === "oldest") {
        sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      }
      else if (sortBy === "Cheapest") {
        sorted.sort((a, b) => a.price - b.price);
      }
      else if (sortBy === "MostExpensive") {
        sorted.sort((a, b) => b.price - a.price);
      }
      setSortedDocs(sorted);
    }
  }, [docs, sortBy]);

  const navigate = useNavigate()
  return (
    <div className='flex flex-col'>
      <div className="flex justify-center items-end m-0 p-0 w-[100vw] h-[50vh] sm:h-[80vh]">
        <img className="m-0 p-0 w-[100%] h-[100%] animate-fadeZoomOut" src={womenHero} alt="" />
        <div className="flex flex-col items-center gap-3 pb-7 absolute text-white">
          <h1 className="text-4xl">Handbags for Women</h1>
        </div>
      </div>

      <div>
        <div className='flex justify-between p-3 sticky z-50 top-[5rem] bg-white border-t-1 border-gray-300'>
          <button onClick={()=>setOpenSort(true)}><i className="fa-solid fa-bars-staggered"></i> Sort By: Recommended</button>
          {/* <button><i className="fa-solid fa-filter"></i> Filters</button> */}
        </div>
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
              <div onClick={() => { setSortBy("Cheapest"); setOpenSort(false) }} className='flex gap-3'>
                <input type="radio" id='sortByCheapest' name='sort' checked={sortBy === "Cheapest"} readOnly />
                <label htmlFor="sortByCheapest">Cheapest</label>
              </div>
              <div onClick={() => { setSortBy("MostExpensive"); setOpenSort(false) }} className='flex gap-3'>
                <input type="radio" id='sortByExpensive' name="sort" checked={sortBy === "MostExpensive"} readOnly />
                <label htmlFor="sortByExpensive">Most Expensive</label>
              </div>
            </div>
          </DialogTitle>
        </Dialog>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 h-auto p-5">
            {error && <h1 className='text-2xl w-full h-[50vh] text-center'>Error Fetching Data</h1>}
            {isLoading ? (
              [...Array(docs?.length || 4)].map((_, i) => (
                <Skeleton key={i} variant="rectangular" height={400} animation="wave" />
              ))
            ) : (sortedDocs?.map((p) => (
              <div onClick={() => { navigate(`/men-bags/${p.id}`) }} key={p.id} className="bg-[#e7e7e7] p-2 h-auto w-full">
                <img src={p.url} alt="Image Not Found" className="hover:scale-107 transition-all duration-700 ease-in-out w-[25rem] h-[80%]" />
                <div className='pl-2 pt-2'>
                  <h1>{p.title}</h1>
                  <h1>$ {p.price}</h1>
                </div>
              </div>
            )))}
          </div>
        </div>
      </div>
    </div>
  )
}
