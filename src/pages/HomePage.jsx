import { Heart, HeartPulse, Search, Soup } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
const APP_ID=import.meta.env.VITE_APP_ID
const APP_KEY=import.meta.env.VITE_APP_KEY

const HomePage = () => {
  const [Recipes, setRecipes]=useState([]);
  const [loading, setLoading]=useState(true);

  function handlesearch(e){
    e.preventDefault();
    fetchRecipes(e.target.value);

  }
  const fetchRecipes=async(searchQuery)=>{
    setLoading(true)
    setRecipes([])
    try{
      const response=await fetch(
        `https://api.edamam.com/api/recipes/v2/?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public`)
        const data=await response.json();
        console.log(data);
       setRecipes(data.hits);
    }catch(err){
      console.log(err.message)
    }finally{
      setLoading(false);
    }

  }
  
        useEffect(()=>{
          fetchRecipes();

        },[])
  return (
    <div className='bg-[#faf9fb] p-10 flex-1'>
        <div className='max-w-screen-lg mx-auto'>
            <form >
                <label className='input shadow-md flex items-center gap-2'>
                    <Search size={"24"}/>
                    <input type="text" className='text-sm md:text-md grow' placeholder='what do you want to cook today' onChange={handlesearch} 
                    />
                </label>
            </form>
            <h1 className='font-bold text-3xl md:text-5xl mt-4'>Recommanded Recipes</h1>
            <p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>popular choices</p>
           <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {!loading && Recipes?.map(({recipe},index)=>(
              <RecipeCard key={index} recipe={recipe}/>
            ))}





             {loading && 
               [...Array(9)].map((_,index)=>(
                   <div key={index} className='flex flex-col gap-5 w-full'>
                    <div className='skeleton h-32 w-full'></div>
                    <div className='flex justify-between'>
                      <div className='skeleton h-4 w-28'></div>
                      <div className='skeleton h-4 w-28'></div>
                    </div>
                    <div className='skeleton h-4 w-1/2'></div>
                   </div>
               ))
             
             }
            
           </div>
        </div>
    </div>
  )
}

export default HomePage
