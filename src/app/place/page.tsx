"use client"

import { useState, useEffect, useRef } from "react"

import { useSearchParams } from "next/navigation"

import CityResume from "@/components/CityResume"
import Map from "@/components/Map"
import Accordion from "@/components/Accordion"
import { Carousel } from "@/components/Carousel"

export default function Page() {
    const [originPlaceId, setOriginPlaceId] = useState("")
    const [destinationPlaceId, setDestinationPlaceId] = useState("")

    const [placeAddress, setPlaceAddress] = useState("")

    const searchParams = useSearchParams()
    const originIdParam = searchParams.get("origin")
    const destinationIdParams = searchParams.get("destination")

    useEffect(() => {
        getUrlParams()
        function getUrlParams() {
            console.log('chamando GetURl')
            if (originIdParam && destinationIdParams) {
                console.log('setando origin and destination')
                setOriginPlaceId(originIdParam)
                setDestinationPlaceId(destinationIdParams)
            }
        }
    }, [originIdParam, destinationIdParams])


    /////
    const divRef = useRef<HTMLDivElement>(null)
    const placeServiceRef = useRef<google.maps.places.PlacesService>()

    interface Place {
        id: string | undefined
        name: string | undefined
        address: string | undefined
        photos: string | undefined
        rating: number | undefined
    }
    const [hotels, setHotels] = useState<Place[]>([])
    const [restaurants, setRestaurants] = useState<Place[]>([])

    useEffect(() => {
        console.log('chamando initPlaceService')
        initPlaceService()
    }, [])

    function initPlaceService() {
        if (!placeServiceRef.current && divRef.current) {
            placeServiceRef.current = new google.maps.places.PlacesService(divRef.current)
        }
    }

    useEffect(() => {
        if (destinationPlaceId) {
            getPlaceAddress()
        }
        function getPlaceAddress() {
            console.log('getPlaceAddress')
            const request = {
                placeId: destinationPlaceId,
                fields: ["formatted_address"]
            }

            placeServiceRef.current?.getDetails(request, (res, status) => {
                if (status === "OK" && res) {
                    const address = res.formatted_address

                    if (address) {
                        setPlaceAddress(address)
                        getHotelsFromPlaceAddress(address)
                        getRestaurantsFromPlaceAddress(address)
                    }
                }
            })
        }


    }, [destinationPlaceId])


    function getHotelsFromPlaceAddress(address: string) {
        const request = {
            query: `Hotels in ${address}`,
        }

        placeServiceRef.current?.textSearch(request, (res, status) => {
            if (status === "OK" && res) {

                const hotel = res.map((hotel) => {
                    return {
                        id: hotel.place_id,
                        name: hotel.name,
                        address: hotel.formatted_address,
                        photos: hotel.photos?.[0].getUrl(),
                        rating: hotel.rating
                    }
                })
                setHotels(hotel)
            }
        })
    }

    function getRestaurantsFromPlaceAddress(address: string) {
        const request = {
            query: `Restaurants in ${address}`,
            type: "restaurant"
        }

        placeServiceRef.current?.textSearch(request, (res, status) => {
            if (status === "OK" && res) {

                const restaurant = res.map((restaurant) => {
                    return {
                        id: restaurant.place_id,
                        name: restaurant.name,
                        address: restaurant.formatted_address,
                        photos: restaurant.photos?.[0].getUrl(),
                        rating: restaurant.rating
                    }
                })
                setRestaurants(restaurant)
            }
        })
    }

    return (
        <main>
            <CityResume placeAddress={placeAddress} />
            <div ref={divRef}></div>
            <div className="px-2 lg:px-12">
                <div className="flex justify-center">
                    <Map origin={originPlaceId} destination={destinationPlaceId} />
                </div>

                <div className="mt-5">
                    <h2 className="font-bold text-2xl">Atrações</h2>
                    <p>Confira algum dos pontos mais visitados em seu destino.</p>
                    <Accordion />
                </div>
            </div>

            <Carousel.Layout
                title="Hóteis"
                description="Explore uma variedade de opções de hospedagem que irão tornar a sua estadia inesquecível.">
                <Carousel.Carousel>
                    {hotels.map(hotel => (
                        <Carousel.Card
                            key={hotel.id}
                            placeName={hotel.name}
                            placeAddress={hotel.address}
                            photo={hotel.photos}
                            rating={hotel.rating} />
                    ))}
                </Carousel.Carousel>
            </Carousel.Layout>

            <Carousel.Layout
                title="Restaurantes"
                description="Aqui estão algumas opções de restaurantes disponíveis em seu destino.">
                <Carousel.Carousel>
                    {restaurants.map(restaurant => (
                        <Carousel.Card
                            key={restaurant.id}
                            placeName={restaurant.name}
                            placeAddress={restaurant.address}
                            photo={restaurant.photos}
                            rating={restaurant.rating} />
                    ))}
                </Carousel.Carousel>
            </Carousel.Layout>
        </main>
    )
}
