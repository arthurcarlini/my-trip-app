'use client'

import { createContext, useState, useContext, ReactNode } from "react"
import { Wrapper } from "@googlemaps/react-wrapper"

interface ApiContextType {
    originCity: City
    setOriginCity: (value: City) => void
    destinationCity: City
    setDestinationCity: (value: City) => void
}

interface City {
    name: string
    location: google.maps.LatLngLiteral
}

const ApiContext = createContext({} as ApiContextType)

export function ApiProvider({ children }: { children: ReactNode }) {
    const [originCity, setOriginCity] = useState({} as City)
    const [destinationCity, setDestinationCity] = useState({} as City)

    return (
        <Wrapper apiKey="AIzaSyBxC2hxuRJ-HjyfgIUKekDIw_ndNOd9yQA" version="weekly" libraries={["places"]}>
            <ApiContext.Provider value={{ originCity, setOriginCity, destinationCity, setDestinationCity }}>
                {children}
            </ApiContext.Provider>
        </Wrapper>
    )
}

export function useApiContext() {
    return useContext(ApiContext)
}