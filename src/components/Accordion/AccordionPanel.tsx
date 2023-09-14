import { ReactNode, useState } from "react"

import Image from "next/image"

import { ExpandMoreRoundedIcon } from "@/components/ui/icons"

interface AccordionPanel {
    isActive: boolean
    show: () => void
    photo: any | string
    placeName: string | undefined
    text: string | undefined
}

export default function AccordionPanel({ isActive, show, photo, placeName, text }: AccordionPanel) {
    return (
        <div className="my-2">
            <div className="relative h-48">
                {photo &&
                    <Image
                        alt="Place photo"
                        src={photo}
                        fill
                        className="object-cover rounded-md"
                    />
                }

                <div className="absolute inset-x-0 bottom-1 flex justify-center">
                    {!isActive &&
                        <button onClick={show} className="md:hidden w-20 h-7 rounded-full bg-neutral-500 bg-opacity-80">
                            {<ExpandMoreRoundedIcon className="text-xl text-white animate-rotate" />}
                        </button>
                    }
                </div>
            </div>

            <div className={`${isActive ? "h-32" : "h-0"} md:h-auto overflow-y-auto transition-all duration-200 ease-in`}>
                <h2 className="text-lg font-bold">{placeName}</h2>
                <p>{text}</p>
            </div>
        </div>
    )
}