'use client'

import { createContext, useState, useContext, ReactNode, MouseEventHandler, Dispatch, SetStateAction } from "react"


interface ApiContextType {
    origin: string
    setOrigin: (value: string) => void
    destination: string
    setDestination: (value: string) => void
    isActive: boolean
    setIsActive: (value: boolean) => void
}

const ApiContext = createContext({} as ApiContextType)

export function ApiProvider({ children }: { children: ReactNode }) {
    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState("")
    const [isActive, setIsActive] = useState(false)


    return (
        <ApiContext.Provider value={{ origin, setOrigin, destination, setDestination, isActive, setIsActive }}>
            {children}
        </ApiContext.Provider>
    )
}

export function useApiContext() {
    return useContext(ApiContext)
}