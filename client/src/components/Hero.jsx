import React from 'react'
import { assets, cities } from "../assets/assets";

const Hero = () => {
  return (
   <div
  className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 
  text-white bg-black/40 bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center bg-blend-overlay min-h-dvh md:h-screen'
>
  
  <p className='text-sm md:text-base uppercase tracking-[4px] text-gray-200 mb-4'>
    The Ultimate Hotel Experience
  </p>

  <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mb-6 break-words'>
    Discover Your Perfect Gateway Destination
  </h1>

  <p className='text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl leading-relaxed mb-8'>
    Unparalleled luxury and comfort await at the world's most exclusive hotels 
    and resorts. Start your journey today.
  </p>
   <form className='bg-white text-gray-500 rounded-lg px-4 sm:px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 w-full max-w-4xl md:w-auto'>

            <div className='w-full md:w-auto'>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" />
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className="w-full md:w-auto rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                <datalist id="destinations">
                    {cities.map((city,indes)=>(
                        <option value={city} key={indes}/>
                    ))}
                </datalist>
            </div>

            <div className='w-full md:w-auto'>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" />
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className="w-full md:w-auto rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='w-full md:w-auto'>
                <div className='flex items-center gap-2'>
                    <img src={assets.calenderIcon} alt="" />
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className="w-full md:w-auto rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-start w-full md:w-auto'>
                <label htmlFor="guests" className='whitespace-nowrap'>Guests</label>
                <input min={1} max={4} id="guests" type="number" className="w-full md:w-20 rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-2 rounded-md bg-black py-3.5 px-5 text-white my-auto cursor-pointer w-full md:w-auto' >
                <img src={assets.searchIcon} alt="search" />
                <span>Search</span>
            </button>
        </form>

</div>
    
  )
}

export default Hero