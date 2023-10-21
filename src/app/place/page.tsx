"use client"

import { useState, useEffect, useRef } from "react"

import { useSearchParams } from "next/navigation"

import CityResume from "@/components/CityResume"
import Map from "../../components/map"
import ImagesGrid from "@/components/ImagesGrid"
import PlacesCarousel from "@/components/PlacesCarousel"

export default function Page() {
    const [originPlaceId, setOriginPlaceId] = useState("")
    const [destinationPlaceId, setDestinationPlaceId] = useState("")

    const searchParams = useSearchParams()
    const originIdParam = searchParams.get("origin")
    const destinationIdParams = searchParams.get("destination")

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

    useEffect(() => {
        initPlaceService()
    }, [])

    function initPlaceService() {
        if (!placeServiceRef.current && divRef.current) {
            placeServiceRef.current = new google.maps.places.PlacesService(divRef.current)
        }
    }

    const [placeAddress, setPlaceAddress] = useState("")

    useEffect(() => {
        if (destinationPlaceId) {
            getPlaceAddress()
        }

        function getPlaceAddress() {
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
    }, [destinationPlaceId])

    return (
        <main>
            {/* remover isso ↓ */}
            <div ref={divRef}></div>
            {placeServiceRef.current &&
                <>
                    <CityResume
                        placeAddress={placeAddress}
                    />

                    <ImagesGrid
                        placeService={placeServiceRef.current}
                        destinationPlaceId={destinationPlaceId}
                    />
                </>
            }

            <div className="w-full p-2 lg:px-12 flex flex-col justify-center items-center md:flex-row">
                <div className="lg:w-1/3 md:mr-20">
                    <h2 className="font-semibold text-2xl mb-2">
                        Sobre o local
                    </h2>
                    <p>
                        Redondo Beach, na Califórnia, é uma charmosa cidade costeira conhecida por suas belas praias, clima agradável e estilo de vida descontraído. As praias, atividades aquáticas, clima ameno e uma comunidade acolhedora são os destaques dessa encantadora cidade. É um destino popular para quem busca a vida à beira-mar e atividades ao ar livre.
                    </p>
                </div>
                <Map origin={originPlaceId} destination={destinationPlaceId} />
            </div>

            {placeServiceRef.current &&
                <>
                    <PlacesCarousel
                        placeService={placeServiceRef.current}
                        address={placeAddress}
                        query="tourist attractions"
                        title="Pontos turísticos"
                        description="Confira alguns dos pontos turísticos em seu destino."
                    />

                    <PlacesCarousel
                        placeService={placeServiceRef.current}
                        address={placeAddress}
                        query="hotels"
                        title="Hotéis"
                        description="Explore uma variedade de opções de hospedagem que irão tornar a sua estadia inesquecível."
                    />

                    <PlacesCarousel
                        placeService={placeServiceRef.current}
                        address={placeAddress}
                        query="restaurants"
                        title="Restaurantes"
                        description="Aqui estão algumas opções de restaurantes disponíveis em seu destino."
                    />
                </>
            }
        </main>
    )
}
