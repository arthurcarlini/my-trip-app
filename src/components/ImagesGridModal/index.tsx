"use client"

import Image from "next/image"

import { CloseIcon } from "@/components/ui/icons"

interface ModalType {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    destinationPhotosURLs: string[]
    placeAddress: string
}

export default function ImagesGridModal({ isModalOpen, setIsModalOpen, destinationPhotosURLs, placeAddress }: ModalType) {

    if (isModalOpen) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "auto"
    }

    return (
        <>
            {isModalOpen &&
                <div className="fixed inset-0 pt-40 bg-transparent backdrop-blur-md z-10">
                    <div className="relative h-full bg-white rounded-t-lg border overflow-x-auto">
                        <div className="sticky top-0 z-10 flex items-center bg-white">
                            <button
                                className="w-10 h-10 flex-none"
                                onClick={() => setIsModalOpen(false)}>
                                <CloseIcon />
                            </button>
                            <p className="w-full text-center">Mais fotos de {placeAddress}</p>
                        </div>
                        <div className="h-full overflow-x-auto">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 p-0.5 h-full">
                                {destinationPhotosURLs.map(photo => (
                                    <div
                                        key={photo}
                                        className="relative">
                                        <Image
                                            src={photo}
                                            alt="Destination photos"
                                            fill
                                            className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}