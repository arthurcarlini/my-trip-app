'use client'

import { useRef, useEffect, useState } from "react"

import { useApiContext } from "@/app/context/ApiContext"

const mapOptions = {
    center: { lat: -23.36, lng: -46.36 },
    zoom: 10,
    disableDefaultUI: true
}

export default function Map() {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [routes, setRoutes] = useState<google.maps.DirectionsResult | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const { originCity, destinationCity } = useApiContext()

    useEffect(() => {
        if (containerRef.current !== null) {
            setMap(new window.google.maps.Map(containerRef.current, mapOptions))
        }
    }, [])

    useEffect(() => {
        if (originCity.location && destinationCity.location !== null) {
            getRoutes(originCity.location, destinationCity.location, setRoutes)
        }
    }, [originCity, destinationCity])

    return (
        <>
            <div ref={containerRef} className="w-full lg:w-2/3 h-60 md:h-72 lg:h-96 rounded-md flex justify-center relative" />
            {map && routes && <RenderRoutes map={map} routes={routes} />}
        </>
    )
}

async function getRoutes(origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral, setRoutes: (value: any) => void) {
    const request = {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
    }

    const directionsService = new window.google.maps.DirectionsService()
    directionsService.route(request, (result, status) => {
        if (status === "OK" && result) {
            const routes = result
            setRoutes(routes)
        }
    })
}

interface RenderRoutes {
    routes: google.maps.DirectionsResult
    map: google.maps.Map
}

function RenderRoutes({ routes, map }: RenderRoutes) {
    const directionsRef = useRef<google.maps.DirectionsRenderer | null>(null)
    const trackRef = useRef<google.maps.DirectionsResult | null>(null)

    useEffect(() => {
        if (!directionsRef.current) {
            directionsRef.current = new window.google.maps.DirectionsRenderer()
        }

        if (trackRef.current) {
            directionsRef.current.setMap(null)
        }
        directionsRef.current.setMap(map)
        trackRef.current = routes
        directionsRef.current.setDirections(trackRef.current)

        return () => {
            directionsRef.current?.setMap(null)
        }
    }, [routes])

    return null
}
