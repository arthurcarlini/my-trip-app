import { ReactNode, useState } from "react"

import Image from "next/image"

import { ExpandMoreRoundedIcon } from "@/components/ui/icons"

interface AccordionPanel {
    isActive: boolean,
    show: () => void,
    img: any | string,
    title: string,
    text: string,
}

export default function AccordionPanel({ isActive, show, img, title, text }: AccordionPanel) {
    return (
        <div className="my-2">
            <div className="relative">
                <Image
                    alt={"Praça"}
                    src={img}
                    height={160}
                    width={409}
                    className="rounded-md w-full h-48 md:h-56"
                />
                <div className="absolute inset-x-0 bottom-1 flex justify-center">
                    {!isActive &&
                        <button onClick={show} className="md:hidden w-20 h-7 rounded-full bg-neutral-500 bg-opacity-80">
                            {<ExpandMoreRoundedIcon className="text-xl text-white animate-rotate" />}
                        </button>
                    }
                </div>
            </div>
            <div className={`${isActive ? "h-32" : "h-0"} md:h-auto  overflow-y-auto transition-all duration-200 ease-in`}>
                <h2 className="text-lg font-bold">{title}</h2>
                <p>{text}</p>
            </div>
        </div>
    )
}