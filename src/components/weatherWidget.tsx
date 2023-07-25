'use client'

import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { useEffect, useRef } from 'react'

export default function WeatherWidget() {

    const weatherWidget = useRef<HTMLDivElement | null>(null)
    const inputRadioList = useRef<HTMLDivElement | null>(null)

    let index = 0
    // useEffect(() => {
    //     const scrollAt = setInterval(() => {
    //         index++
    //         if (index > 1) { index = 0 }
    //         scrollNextWidget(index)
    //     }, 6000)

    //     return () => clearInterval(scrollAt)
    // }, [])

    function scrollNextWidget(index: number) {
        const widget = weatherWidget.current?.querySelectorAll(".widget")[index]
        widget?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        })

        if (inputRadioList.current != null) {
            inputRadioList.current.querySelectorAll<HTMLInputElement>("input")[index].checked = true
        }
    }

    return (
        <div className="h-80 w-96 mx-1 relative">
            <div ref={weatherWidget} className="flex h-80 overflow-x-auto scrollbar-hide scroll-smooth rounded-md">

                <div className="widget bg-blue-500 flex-none text-white flex flex-col h-80 w-96 items-center">
                    <span className="mt-2">Capão da Canoa, RS</span>
                    <span className="mt-2 mb-5">Hoje</span>
                    <span className="text-sm">Chuva leve</span>
                    <span className="text-3xl">22°C</span>
                    <div className="mt-4">
                        <span className="ml-2">Próximos dias</span>
                        <div className="flex text-black">
                            <div className="bg-white mx-2 flex flex-col space-y-2 items-center justify-center rounded-md w-24 h-24">
                                <span className="text-sm font-semibold">Terça</span>
                                <span><WbSunnyIcon /></span>
                                <span className="text-lg">25°C</span>
                            </div>
                            <div className="bg-white mx-2 flex flex-col space-y-2 items-center justify-center rounded-md w-24 h-24">
                                <span className="text-sm font-semibold">Terça</span>
                                <span><WbSunnyIcon /></span>
                                <span className="text-lg">25°C</span>
                            </div>
                            <div className="bg-white mx-2 flex flex-col space-y-2 items-center justify-center rounded-md w-24 h-24">
                                <span className="text-sm font-semibold">Terça</span>
                                <span><WbSunnyIcon /></span>
                                <span className="text-lg">25°C</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="widget bg-blue-500 flex-none text-white flex flex-col h-80 w-96 items-center">
                    <span className="mt-2">Porto Alegre, RS</span>
                    <span className="mt-2 mb-5">Hoje</span>
                    <span className="text-sm">Chuva leve</span>
                    <span className="text-3xl">22°C</span>
                    <div className="mt-4">
                        <span className="ml-2">Próximos dias</span>
                        <div className="flex text-black">
                            <div className="bg-white mx-2 flex flex-col space-y-2 items-center justify-center rounded-md w-24 h-24">
                                <span className="text-sm font-semibold">Terça</span>
                                <span><WbSunnyIcon /></span>
                                <span className="text-lg">25°C</span>
                            </div>
                            <div className="bg-white mx-2 flex flex-col space-y-2 items-center justify-center rounded-md w-24 h-24">
                                <span className="text-sm font-semibold">Terça</span>
                                <span><WbSunnyIcon /></span>
                                <span className="text-lg">25°C</span>
                            </div>
                            <div className="bg-white mx-2 flex flex-col space-y-2 items-center justify-center rounded-md w-24 h-24">
                                <span className="text-sm font-semibold">Terça</span>
                                <span><WbSunnyIcon /></span>
                                <span className="text-lg">25°C</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div ref={inputRadioList} className="flex justify-center absolute inset-x-0 bottom-3">
                <input className="hidden" type="radio" id="radio1" onClick={() => scrollNextWidget(0)} name="weatherRadio" />
                <input className="hidden" type="radio" id="radio2" onClick={() => scrollNextWidget(1)} name="weatherRadio" />

                <label id="label1" htmlFor="radio1" className="bg-blue-600 w-3 h-3 mx-1 rounded-full hover:bg-blue-900 cursor-pointer transition-colors duration-300"></label>
                <label id="label2" htmlFor="radio2" className="bg-blue-600 w-3 h-3 mx-1 rounded-full hover:bg-blue-900 cursor-pointer transition-colors duration-300"></label>
            </div>

        </div>
    )
}