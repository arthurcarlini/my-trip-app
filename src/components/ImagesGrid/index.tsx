import Image from "next/image"

import { useState, useEffect } from "react"

import ImagesGridModal from "../ImagesGridModal"

interface ImagesGridType {
    placeService: google.maps.places.PlacesService
    destinationPlaceId: string
}

export default function ImagesGrid({ placeService, destinationPlaceId }: ImagesGridType) {
    const [placeAddress, setPlaceAddress] = useState("")
    const [destinationPhotosURLs, setDestinationPhotosURLs] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        getDestinationPhotos(destinationPlaceId)
        function getDestinationPhotos(destinationPlaceId: string) {
            const request = {
                placeId: destinationPlaceId,
                fields: ["formatted_address", "photos"]
            }

            placeService.getDetails(request, (res, status) => {
                if (status === "OK" && res?.photos && res?.formatted_address) {
                    setPlaceAddress(res.formatted_address)
                    getDestinationPhotoURL(res.photos)
                }
            })
        }

        function getDestinationPhotoURL(photos: google.maps.places.PlacePhoto[]) {
            const photosURLs = photos.map(photo => photo.getUrl())

            setDestinationPhotosURLs(photosURLs)
        }
    }, [destinationPlaceId, placeService])

    return (
        <>
            <ImagesGridModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                destinationPhotosURLs={destinationPhotosURLs}
                placeAddress={placeAddress}
            />

            <div className="relative grid grid-cols-2 grid-rows-2 gap-0.5 h-96">
                <div className="relative col-span-2 lg:col-span-1 lg:row-span-2">
                    <Image
                        src={destinationPhotosURLs[0]}
                        alt="Destination photos"
                        priority
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover" />
                </div>
                <div className="relative">
                    <Image
                        src={destinationPhotosURLs[1]}
                        alt="Destination photos"
                        priority
                        fill
                        sizes="50vw"
                        className="object-cover" />
                </div>
                <div className="relative">
                    <Image
                        src={destinationPhotosURLs[2]}
                        alt="Destination photos"
                        priority
                        fill
                        sizes="50vw"
                        className="object-cover" />
                </div>
                <button
                    className="absolute bottom-4 right-2 lg:right-12 w-16 lg:w-20 h-10 text-sm bg-black text-white hover:brightness-75 rounded-full"
                    onClick={() => setIsModalOpen(true)}>
                    Ver mais
                </button>
            </div>
        </>
    )
}