'use client'

import RouteRoundedIcon from '@mui/icons-material/RouteRounded'
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'

export default function Map() {
    return (
        <div className="w-full lg:w-2/3 h-60 md:h-72 lg:h-96 rounded-md flex justify-center relative bg-black">
            <div className="w-1/2 md:w-1/3 h-6 text-xs lg:text-sm text-white flex justify-center rounded-md bg-neutral-500 absolute bottom-3">
                <div className="mr-5 lg:mr-5 flex items-center"><RouteRoundedIcon />99km</div><div className="flex items-center"><DirectionsCarRoundedIcon />1hr e 30min</div>
            </div>
        </div>
    )
}