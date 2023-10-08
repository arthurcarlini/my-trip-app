import Image from "next/image"
import homeImage from "../../public/home-image.jpg"

export default function Home() {
  return (
    <>
      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] md:px-14 md:py-20">
        <div className="relative w-full h-full">
          <Image
            src={homeImage}
            alt="A woman walking along a street surrounded by buildings"
            fill
            priority
            className="object-cover brightness-75 h-full lg:rounded-xl" />

          <div className="absolute top-5 mx-5 text-white">
            <h2 className="font-bold text-5xl">
              Encontre<br />
              Sua<br />
              Próxima Jornada
            </h2>
            <p className="mt-2">
              Explore seu próximo destino conosco!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
