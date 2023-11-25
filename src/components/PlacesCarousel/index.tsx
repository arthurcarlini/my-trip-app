"use client"
import { useSearchParams } from "next/navigation"

import { useState, useEffect, useRef } from "react"

import { Carousel } from "@/components/Carousel"

interface Place {
    id: string | undefined
    name: string | undefined
    address: string | undefined
    photos: string | undefined
    rating: number | undefined
}

interface PlacesCarouselType {
    query: string
    title: string
    description: string
}

export default function PlacesCarousel({ query, title, description }: PlacesCarouselType) {
    const searchParams = useSearchParams()
    const destinationPlaceId = searchParams.get("destination")

    const [placeAddress, setPlaceAddress] = useState("")
    const [places, setPlaces] = useState<Place[]>([])

    const divRef = useRef(null)
    const placeServiceRef = useRef<null | google.maps.places.PlacesService>()

    useEffect(() => {
        if (!placeServiceRef.current && divRef.current) {
            placeServiceRef.current = new google.maps.places.PlacesService(divRef.current)
        }
    }, [])

    useEffect(() => {
        getPlaceAddress()
        function getPlaceAddress() {
            if (destinationPlaceId) {

                const request = {
                    placeId: destinationPlaceId,
                    fields: ["formatted_address"]
                }

                placeServiceRef.current?.getDetails(request, (res, status) => {
                    if (status === "OK" && res?.formatted_address) {
                        setPlaceAddress(res.formatted_address)
                    }
                })
            }
            getPlacesFromQueryAndAddress()
        }

        function getPlacesFromQueryAndAddress() {
            if (placeServiceRef.current) {

                const request = {
                    query: `${query} in ${placeAddress}`,
                }

                placeServiceRef.current.textSearch(request, (res, status) => {
                    if (status === "OK" && res) {

                        const places = res.map((place) => {
                            return {
                                id: place.place_id,
                                name: place.name,
                                address: place.formatted_address,
                                photos: place.photos?.[0].getUrl(),
                                rating: place.rating
                            }
                        })
                        setPlaces(places)
                    }
                })
            }

        }

    }, [destinationPlaceId, query, placeAddress])

    return (
        <>
            <div ref={divRef}></div>
            <Carousel.Layout
                title={title}
                description={description}>
                <Carousel.Carousel>
                    {places.map(place => (
                        <Carousel.Card
                            key={place.id}
                            placeName={place.name}
                            placeAddress={place.address}
                            photo={place.photos}
                            rating={place.rating} />
                    ))}
                </Carousel.Carousel>
            </Carousel.Layout>
        </>
    )
}