import { useState, useEffect } from "react"

import { Carousel } from "@/components/Carousel"

interface Place {
    id: string | undefined
    name: string | undefined
    address: string | undefined
    photos: string | undefined
    rating: number | undefined
}

interface PlacesCarouselType {
    placeService: google.maps.places.PlacesService
    query: string
    address: string
    title: string
    description: string
}

export default function PlacesCarousel({ placeService, query, address, title, description }: PlacesCarouselType) {
    const [places, setPlaces] = useState<Place[]>([])

    useEffect(() => {
        getPlacesFromQueryAndAddress()
        function getPlacesFromQueryAndAddress() {
            const request = {
                query: `${query} in ${address}`,
            }

            placeService.textSearch(request, (res, status) => {
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
    }, [placeService, address, query])

    return (
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
    )
}