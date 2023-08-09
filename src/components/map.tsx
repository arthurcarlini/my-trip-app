'use client'

import { useRef, useEffect } from "react"

import { googleMapsApi } from "@/app/api/googleApi"
import { useApiContext } from "@/app/context/ApiContext"

import RouteRoundedIcon from '@mui/icons-material/RouteRounded'
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'

export default function Map() {
    const MapRef = useRef<HTMLDivElement | null>(null)

    const { origin, destination, isActive } = useApiContext()

    function initMap(mapElement: HTMLDivElement) {
        googleMapsApi
            .importLibrary("routes")
            .then(() => {
                if (mapElement != null) {
                    const directionsRenderer = new google.maps.DirectionsRenderer()
                    const directionsService = new google.maps.DirectionsService()

                    const map = new google.maps.Map(mapElement, {
                        center: { lat: -23.36, lng: -46.84 },
                        zoom: 10,
                    })
                    directionsRenderer.setMap(map)

                    directionsService.route({
                        destination,
                        origin,
                        travelMode: google.maps.TravelMode.DRIVING,
                    }, (routes, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsRenderer.setDirections(routes)
                        }
                    })
                }
            })
    }

    useEffect(() => {
        if (MapRef.current != null) {
            initMap(MapRef.current)
        }
    }, [origin, destination])


    return (
        <div ref={MapRef} className="w-full lg:w-2/3 h-60 md:h-72 lg:h-96 rounded-md flex justify-center relative">
            <div className="w-1/2 md:w-1/3 h-6 text-xs lg:text-sm text-white flex justify-center rounded-md bg-neutral-500 absolute bottom-3">
                <div className="mr-5 lg:mr-5 flex items-center"><RouteRoundedIcon />99km</div><div className="flex items-center"><DirectionsCarRoundedIcon />1hr e 30min</div>
            </div>
        </div>
    )
}