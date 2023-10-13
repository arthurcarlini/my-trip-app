"use client"

import { useState, useEffect, useRef } from "react"

import { useSearchParams } from "next/navigation"
import Image from "next/image"

import CityResume from "@/components/CityResume"
import Map from "../../components/map"
import { Carousel } from "@/components/Carousel"
import Modal from "@/components/Modal"

interface Place {
    id: string | undefined
    name: string | undefined
    address: string | undefined
    photos: string | undefined
    rating: number | undefined
}

export default function Page() {
    const [originPlaceId, setOriginPlaceId] = useState("")
    const [destinationPlaceId, setDestinationPlaceId] = useState("")

    const [placeAddress, setPlaceAddress] = useState("")

    const searchParams = useSearchParams()
    const originIdParam = searchParams.get("origin")
    const destinationIdParams = searchParams.get("destination")

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        getUrlParams()
        function getUrlParams() {
            if (originIdParam && destinationIdParams) {
                setOriginPlaceId(originIdParam)
                setDestinationPlaceId(destinationIdParams)
            }
        }
    }, [originIdParam, destinationIdParams])

    const divRef = useRef<HTMLDivElement>(null)
    const placeServiceRef = useRef<google.maps.places.PlacesService>()

    const [hotels, setHotels] = useState<Place[]>([])
    const [restaurants, setRestaurants] = useState<Place[]>([])
    const [touristAttractions, setTouristAttractions] = useState<Place[]>([])
    const [destinationPhotosURLs, setDestinationPhotosURLs] = useState<string[]>([])

    useEffect(() => {
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
            const request = {
                placeId: destinationPlaceId,
                fields: ["formatted_address", "photos"]
            }

            placeServiceRef.current?.getDetails(request, (res, status) => {
                if (status === "OK" && res) {
                    const address = res.formatted_address
                    const destinationPhotos = res.photos

                    if (address && destinationPhotos) {
                        getDestinationPhotoURL(destinationPhotos)
                        setPlaceAddress(address)
                        getHotelsFromPlaceAddress(address)
                        getRestaurantsFromPlaceAddress(address)
                        getTouristAttractions(address)
                    }
                }
            })
        }
    }, [destinationPlaceId])

    function getDestinationPhotoURL(photos: google.maps.places.PlacePhoto[]) {
        const photosURLs = photos.map(photo => photo.getUrl())

        setDestinationPhotosURLs(photosURLs)
    }

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

    function getTouristAttractions(address: string) {
        const request = {
            query: `Tourist attraction in ${address}`,
            type: "tourist_attraction"
        }

        placeServiceRef.current?.textSearch(request, (res, status) => {
            if (status === "OK" && res) {

                const touristAttractions = res.map((attraction) => {
                    return {
                        id: attraction.place_id,
                        name: attraction.name,
                        address: attraction.formatted_address,
                        photos: attraction.photos?.[0].getUrl(),
                        rating: attraction.rating
                    }
                })
                setTouristAttractions(touristAttractions)
            }
        })
    }

    return (
        <main>
            <CityResume placeAddress={placeAddress} />
            {/* remover isso ↓ */}
            <div ref={divRef}></div>

            <Modal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                destinationPhotosURLs={destinationPhotosURLs}
            />

            <div className="relative grid grid-cols-2 grid-rows-2 gap-1 h-96">
                <div className="relative col-span-2 lg:col-span-1 lg:row-span-2">
                    <Image
                        src={destinationPhotosURLs[0]}
                        alt="Destination photos"
                        fill
                        className="object-cover" />
                </div>
                <div className="relative">
                    <Image
                        src={destinationPhotosURLs[1]}
                        alt="Destination photos"
                        fill
                        className="object-cover" />
                </div>
                <div className="relative">
                    <Image
                        src={destinationPhotosURLs[2]}
                        alt="Destination photos"
                        fill
                        className="object-cover" />
                </div>
                <button
                    className="absolute bottom-4 right-2 lg:right-12 w-16 lg:w-20 h-10 text-sm bg-black text-white hover:brightness-75 rounded-full"
                    onClick={() => setIsModalOpen(true)}>
                    Ver mais
                </button>
            </div>

            <div className="px-2 lg:px-12">
                <div className="flex justify-center">
                    <Map origin={originPlaceId} destination={destinationPlaceId} />
                </div>
            </div>

            <Carousel.Layout
                title="Pontos turísticos"
                description="Confira alguns dos pontos turísticos em seu destino.">
                <Carousel.Carousel>
                    {touristAttractions.map(attraction => (
                        <Carousel.Card
                            key={attraction.id}
                            placeName={attraction.name}
                            placeAddress={attraction.address}
                            photo={attraction.photos}
                            rating={attraction.rating} />
                    ))}
                </Carousel.Carousel>
            </Carousel.Layout>

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
