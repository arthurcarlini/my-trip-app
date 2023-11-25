import Image from "next/image"

import { StarRateIcon } from "../ui/icons"

interface Card {
    placeName: string | undefined
    placeAddress: string | undefined
    photo: string | undefined
    rating: number | undefined
}

export default function Card({ placeName, placeAddress, photo, rating }: Card) {

    return (
        <a href="#" className="relative flex-none rounded-md w-56 md:w-64 h-60 md:h-72 mx-1 text-white hover:brightness-50 transition-all">
            {photo && <Image
                src={photo}
                alt="Restaurant image"
                fill
                sizes="(min-width: 640px) 33vw, (min-width:1024px) 50vw, 100vw"
                className="object-cover rounded-md"
            />}
            <div className="absolute top-2 right-2 p-1 flex bg-neutral-500 bg-opacity-70 rounded-md">
                <StarRateIcon className="text-yellow-500" fontSize="small"/>
                <div className="text-sm">
                    {rating}
                </div>
            </div>
            <div className="absolute right-0 left-0 bottom-2 mx-2 p-2 bg-neutral-500 bg-opacity-70 rounded-md truncate">
                <span className="font-bold md:text-lg">
                    {placeName}
                </span>
            </div>
        </a>
    )
}
