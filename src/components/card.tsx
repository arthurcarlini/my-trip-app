'use client'

import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';

export default function Card() {
    return (
        <a href="#" className="w-48 md:w-64 h-52 md:h-72 mx-1 relative flex flex-none justify-center rounded-md bg-cover bg-[url('../../public/bg-image-road.jpg')] hover:brightness-50 transition-all">
            <div className="w-11/12 h-14 pl-3 absolute flex flex-col justify-center bottom-2 bg-neutral-500 bg-opacity-80 rounded-md text-white">
                <p className="font-bold md:text-lg">Hotel Fulano</p>
                <p className="text-sm md:text-base flex items-center"><RoomOutlinedIcon className="text-base" /> Guarani, Porto Alegre</p>
            </div>
        </a>
    )
}