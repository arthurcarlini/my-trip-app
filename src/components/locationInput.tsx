'use client'

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function LocationInput() {
    return (
        <div className="w-11/12 lg:w-1/2 h-14 md:h-20 rounded-xl absolute top-7 lg:top-auto lg:-bottom-10 flex items-center bg-white shadow">
            <SearchRoundedIcon className="hidden lg:block text-black text-4xl mx-5" />
            <input placeholder="Qual seu destino?" className="w-full mx-5 lg:mx-0 text-black text-sm md:text-xl focus:outline-none" type="text" />
            <button className="hidden lg:block w-40 h-14 mr-3 rounded-xl bg-blue-500 text-white text-xl">Buscar</button>
            <button className="lg:hidden w-14 md:w-20 h-10 md:h-14 mr-3 rounded-xl bg-blue-500 text-white"><SearchRoundedIcon className="md:text-3xl" /></button>
        </div>
    )
}