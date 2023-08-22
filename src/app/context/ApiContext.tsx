'use client'

import { createContext, useState, useContext, ReactNode } from "react"
import { Wrapper } from "@googlemaps/react-wrapper"

interface ApiContextType {
    origin: google.maps.LatLngLiteral | null
    setOrigin: (value: google.maps.LatLngLiteral | null) => void
    destination: google.maps.LatLngLiteral | null
    setDestination: (value: google.maps.LatLngLiteral | null) => void
}

const ApiContext = createContext({} as ApiContextType)

export function ApiProvider({ children }: { children: ReactNode }) {
    const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null)
    const [destination, setDestination] = useState<google.maps.LatLngLiteral | null>(null)

    return (
        <Wrapper apiKey="AIzaSyBxC2hxuRJ-HjyfgIUKekDIw_ndNOd9yQA" version="weekly" libraries={["places"]}>
            <ApiContext.Provider value={{ origin, setOrigin, destination, setDestination }}>
                {children}
            </ApiContext.Provider>
        </Wrapper>
    )
}

export function useApiContext() {
    return useContext(ApiContext)
}