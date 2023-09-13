'use client'

import { ReactNode } from "react"
import { Wrapper } from "@googlemaps/react-wrapper"

export function ApiProvider({ children }: { children: ReactNode }) {
    return (
        <Wrapper apiKey="AIzaSyBxC2hxuRJ-HjyfgIUKekDIw_ndNOd9yQA" version="weekly" libraries={["places"]}>
            {children}
        </Wrapper>
    )
}
