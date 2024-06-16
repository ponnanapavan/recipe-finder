import React, { useState } from 'react'
import { Heart, HeartPulse, Search, Soup } from 'lucide-react'
const getValues=(arr)=>{
  return [arr[0],arr[1]];
}
const RecipeCard = ({recipe}) => {
  const [favorite, setFavorite]=useState(localStorage.getItem('favorites')?.includes(recipe.label))
 const addRecipes=()=>{
  let favorites=JSON.parse(localStorage.getItem('favorites'))||[];
  const isAlreadyFavorites=favorites.some((fav)=>fav.label === recipe.label)
  if(isAlreadyFavorites){
    favorites=favorites.filter((fav)=>fav.label !== recipe.label);
    setFavorite(false);
  }else{
    favorites.push(recipe);
    setFavorite(true)
  }
     localStorage.setItem('favorites', JSON.stringify(favorites))


 }

  return (
    <div className='flex flex-col rounded-md bg-[#ecf7d4] overflow-hidden p-3 relative'>
    <a href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`} target='_blank' className='relative h-40'>
        <img src={recipe?.image} alt=""  className='rounded-md w-full h-full object-cover cursor-pointer'/>
        <div className='absolute bottom-6 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm'>
            <Soup size={20}/> {recipe?.yield} servings
        </div>
        <div className='absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer' 
        onClick={(e)=>{
          e.preventDefault();
          addRecipes();

        }}
        >
           {!favorite && <Heart size={25} className='fill-white '/>}
           {favorite &&  <Heart size={25} className='fill-red-500 text-red-500'/>}
           
        </div>
     </a>
     <div className='flex mt-1'>
        <p className='font-bold tracking-wide'>{recipe?.label}</p>
     </div>
     <p className='my-2'>{recipe?.cuisineType[0].charAt(0).toUpperCase()+ recipe.cuisineType[0].slice(1)}</p>

     <div className='flex gap-4 mt-auto'>
         {getValues(recipe.healthLabels).map((label,index)=>(
           <div key={index} className='flex gap-1 bg-[#d6f497] items-center p-1 rounded-md'>
            <HeartPulse size={16}/>
            <span className='text-sm tracking-tighter font-semibold'>{label}</span>
           </div>
         ))}
     </div>
    </div>
  )
}

export default RecipeCard
