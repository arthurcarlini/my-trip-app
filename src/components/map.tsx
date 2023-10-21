'use client'

import { useRef, useEffect, useState } from "react"

const mapOptions = {
    center: { lat: -23.36, lng: -46.36 },
    zoom: 10,
    disableDefaultUI: true
}

interface Map {
    origin: string
    destination: string
}

export default function Map({ origin, destination }: Map) {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [routes, setRoutes] = useState<google.maps.DirectionsResult | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current !== null) {
            setMap(new window.google.maps.Map(containerRef.current, mapOptions))
        }
    }, [])

    useEffect(() => {
        getRoutes(origin, destination, setRoutes)
    }, [origin, destination])

    return (
        <>
            <div ref={containerRef} className="flex-none w-full md:w-80 h-60 md:h-72 lg:h-96 rounded-md" />
            {map && routes && <RenderRoutes map={map} routes={routes} />}
        </>
    )
}

async function getRoutes(origin: string, destination: string, setRoutes: (value: google.maps.DirectionsResult) => void) {
    if (origin && destination) {
        const request = {
            origin: { placeId: origin },
            destination: { placeId: destination },
            travelMode: window.google.maps.TravelMode.DRIVING,
        }

        const directionsService = new window.google.maps.DirectionsService()
        directionsService.route(request, (result, status) => {
            if (status === "OK" && result) {
                const routes = result
                setRoutes(routes)
            } else {
                console.log(status)
            }
        })
    }
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
    }, [routes, map])

    return null
}
