'use client'

import { useState } from "react"
import AccordionPanel from "./AccordionPanel"

interface Place {
    id: string | undefined
    name: string | undefined
    address: string | undefined
    photos: string | undefined
    rating: number | undefined
}

interface AccordionRootType {
    attractions: Place[]
}

export default function AccordionRoot({ attractions }: AccordionRootType) {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    return (
        <div className="mt-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-2">
            {attractions.map(attraction => (
                <AccordionPanel
                    key={attraction.id}
                    isActive={activeIndex === attractions.indexOf(attraction)}
                    show={() => setActiveIndex(attractions.indexOf(attraction))}
                    photo={attraction.photos}
                    placeName={attraction.name}
                    text={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor ipsam asperiores alias illum hic consequatur molestiae quia doloribus architecto minima minus velit, libero ullam enim tenetur perspiciatis sunt labore quidem."}
                />
            ))}
        </div>
    )
}