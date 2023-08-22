'use client'
import { useApiContext } from "@/app/context/ApiContext"


export default function CityResume() {

    const { destinationCity } = useApiContext()

    return (
        <div className="flex flex-col lg:flex-row lg:justify-between mb-5 lg:mb-10">
            <h2 className="mb-5 font-bold text-2xl lg:text-4xl">{destinationCity.name}</h2>
            <p className="lg:w-1/2 lg:font-medium lg:text-lg text-center lg:text-left"></p>
        </div>
    )
}