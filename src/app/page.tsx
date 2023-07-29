import Map from "../components/map"
import Slider from "../components/slider"
import Accordion from "@/components/Accordion"
import { Input } from "@/components/Input"

export default function Home() {
  return (
    <div>
      <div className="h-screen">
        <div className="h-full px-2 pb-2 pt-16 md:pt-20 lg:py-20 lg:px-12">
          <div className="relative w-full h-full flex justify-center rounded-xl bg-cover lg:bg-left bg-[url('../../public/bg-trip-image.jpg')]">
            <div className="w-full h-full flex flex-col justify-center items-center text-center rounded-xl backdrop-brightness-50">
              <h2 className="md:w-2/3 lg:w-1/2 my-2 mx-3 font-bold text-4xl md:text-6xl text-white">Descubra Sua Próxima Jornada</h2>
              <p className="md:w-2/3 lg:w-1/2 my-2 mx-3 md:text-xl text-white">Deixe-nos ajudar com a sua próxima viagem, fornecendo o melhor trajeto disponível com uma lista dos melhores hotéis e restaurantes no seu destino!</p>
            </div>
            <Input.Root>
              <Input.Icon />
              <Input.TextField />
              <Input.Button />
            </Input.Root>
          </div>
        </div>
      </div>
      <div className="px-2 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:justify-between mb-5 lg:mb-10">
          <h2 className="mb-5 font-bold text-2xl lg:text-4xl">Porto Alegre, RS</h2>
          <p className="lg:w-1/2 lg:font-medium lg:text-lg text-center lg:text-left">Porto Alegre, RS: cidade vibrante às margens do Rio Guaíba, com rica cultura, parques encantadores e gastronomia deliciosa. Mistura de tradição e modernidade, acolhe visitantes com calor humano gaúcho.</p>
        </div>
        <div className="flex justify-center">
          <Map />
        </div>
        <div className="mt-5">
          <h2 className="font-bold text-2xl">Atrações</h2>
          <p>Confira algum dos pontos mais visitados em Porto Alegre.</p>
          <Accordion />
        </div>
      </div>

      <div className="mt-5 p-2 lg:px-12">
        <h2 className="font-bold text-2xl">Hotéis</h2>
        <p className="mb-5 lg:mb-0">Explore uma variedade de opções de hospedagem que irão tornar a sua estadia inesquecível.</p>
        <Slider />
      </div>
      <div className="mt-5 p-2 lg:px-12">
        <h2 className="font-bold text-2xl">Restaurantes</h2>
        <p className="mb-5 lg:mb-0">Aqui estão algumas opções de restaurantes disponíveis para seu passeio.</p>
        <Slider />
      </div>
    </div>
  )
}
