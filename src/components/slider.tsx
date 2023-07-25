'use client'

import { useState, useRef, useEffect } from 'react'
import Card from './card'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'

export default function CarouselRef() {

    const carouselRef = useRef<HTMLDivElement | null>(null)
    const leftScrollButtonRef = useRef<HTMLButtonElement | null>(null)
    const rightScrollButtonRef = useRef<HTMLButtonElement | null>(null)

    const scrollToLeft = () => {
        if (carouselRef.current !== null) {
            carouselRef.current.scrollLeft -= carouselRef.current.clientWidth
        }
        carouselRef.current?.addEventListener('scroll', checkScrollState)
    }

    const scrollToRight = () => {
        if (carouselRef.current != null) {
            carouselRef.current.scrollLeft += carouselRef.current.clientWidth
        }
        carouselRef.current?.addEventListener('scroll', checkScrollState)
    }

    const [rightStyleButton, setRightStyleButton] = useState<string>()
    const [leftStyleButton, setLeftStyleButton] = useState<string>()

    const checkScrollState = () => {
        if (carouselRef.current != null) {
            const enabledButtonStyle = `bg-neutral-500 text-white rounded-full h-8 w-8 transition-colors hover:bg-neutral-600 active:bg-neutral-500`
            const disabledButtonStyle = `bg-neutral-500 text-neutral-400 rounded-full h-8 w-8 transition-colors hover:cursor-default`
            const isScrollComplete: boolean = carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth - 1
            const isScrollAtStart: boolean = carouselRef.current.scrollLeft == 0
            if (isScrollComplete && rightScrollButtonRef.current != null) {
                setRightStyleButton(disabledButtonStyle)
            }
            if (!isScrollComplete && rightScrollButtonRef.current != null) {
                setRightStyleButton(enabledButtonStyle)
            }
            if (isScrollAtStart && leftScrollButtonRef.current != null) {
                setLeftStyleButton(disabledButtonStyle)
            }
            if (!isScrollAtStart && leftScrollButtonRef.current != null) {
                setLeftStyleButton(enabledButtonStyle)
            }
        }
    }
    useEffect(checkScrollState, [])

    return (
        <div className="flex flex-col">
            <div className="hidden lg:flex mb-2 justify-end w-full">
                <button ref={leftScrollButtonRef} onClick={scrollToLeft} className="mr-1">
                    <NavigateBeforeIcon className={leftStyleButton} />
                </button>
                <button ref={rightScrollButtonRef} onClick={scrollToRight}>
                    <NavigateNextIcon className={rightStyleButton} />
                </button>
            </div>
            <div ref={carouselRef} className="flex rounded-md scrollbar-hide overflow-x-auto scroll-smooth">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}