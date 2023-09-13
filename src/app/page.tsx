"use client"
import { useState } from "react"

import Image from "next/image"
import homeImage from "../../public/home-image.jpg"

import Input from "@/components/Input"

export default function Home() {
  const [show, setShow] = useState(false)

  return (
    <>
      <Input show={show} setShow={setShow} />
      <div className="relative h-[calc(100vh-64px)]">
        <Image
          src={homeImage}
          alt="A woman walking along a street surrounded by buildings"
          fill
          priority
          className="object-cover brightness-75 h-full" />

        <div className="absolute top-3 mx-5 text-white">
          <h2 className="font-bold text-5xl">
            Encontre<br />
            Sua<br />
            Próxima Jornada
          </h2>
          <p className="mt-2">
            Explore seu próximo destino conosco!
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-5 mx-5 flex items-center justify-center">
          <button onClick={() => setShow(true)} className="bg-amber-900 text-white w-80 h-10 rounded-md">
            Começar
          </button>
        </div>
      </div>
    </>
  )
}
