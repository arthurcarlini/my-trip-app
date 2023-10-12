'use client'

import { ReactNode } from "react"
import { Wrapper } from "@googlemaps/react-wrapper"

export function ApiProvider({ children }: { children: ReactNode }) {
    return (
        //@ts-ignore
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} version="weekly" libraries={["places"]}>
            {children}
        </Wrapper>
    )
}
