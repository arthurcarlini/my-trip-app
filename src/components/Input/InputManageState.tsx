'use client'
import { useState } from "react"

import { useApiContext } from "@/app/context/ApiContext"
import InputTextField from "./InputTextField"

export default function ManageState() {

    const { setOrigin, setDestination } = useApiContext()

    return (
        <>
            <InputTextField setText={setDestination} placeholder="Destino" />
            <InputTextField setText={setOrigin} placeholder="Origem" />
        </>
    )
}