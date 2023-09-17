"use client"

import { useState, useRef } from "react"

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'

interface Carousel {
    children: React.ReactNode
}

export default function Carousel({ children }: Carousel) {

    const carouselRef = useRef<HTMLDivElement | null>(null)
    const leftScrollButtonRef = useRef<HTMLButtonElement | null>(null)
    const rightScrollButtonRef = useRef<HTMLButtonElement | null>(null)

    const [scrollComplete, setScrollComplte] = useState(false)
    const [scrollAtStart, setScrollAtStart] = useState(true)

    const scrollToLeft = () => {
        if (carouselRef.current !== null) {
            carouselRef.current.scrollLeft -= carouselRef.current.clientWidth
        }
    }

    const scrollToRight = () => {
        if (carouselRef.current !== null) {
            carouselRef.current.scrollLeft += carouselRef.current.clientWidth
        }
    }

    const checkScrollState = () => {
        if (carouselRef.current != null) {
            const isScrollAtStart = carouselRef.current.scrollLeft === 0
            setScrollAtStart(isScrollAtStart)

            const isScrollComplete = carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth - 1
            setScrollComplte(isScrollComplete)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="hidden md:flex justify-end w-full mb-2 space-x-1">
                <button
                    ref={leftScrollButtonRef}
                    onClick={scrollToLeft}
                    className={`h-7 w-7 bg-neutral-600 rounded-full transition-colors hover:brightness-90
                    ${scrollAtStart ? "text-neutral-400" : "text-white"}`}>
                    <NavigateBeforeIcon />
                </button>
                <button
                    ref={rightScrollButtonRef}
                    onClick={scrollToRight}
                    className={`h-7 w-7 bg-neutral-600 rounded-full transition-colors hover:brightness-90
                    ${scrollComplete ? "text-neutral-400" : "text-white"}`}>
                    <NavigateNextIcon />
                </button>
            </div>
            <div
                ref={carouselRef}
                onScroll={checkScrollState}
                className="flex rounded-md scrollbar-hide overflow-x-auto scroll-smooth">
                {children}
            </div>
        </div>
    )
}