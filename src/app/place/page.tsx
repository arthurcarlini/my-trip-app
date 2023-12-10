import CityResume from "@/components/CityResume"
import Map from "../../components/map"
import ImagesGrid from "@/components/ImagesGrid"
import PlacesCarousel from "@/components/PlacesCarousel"
import PlaceDescription from "@/components/PlaceDescription"

export default function Page() {

    return (
        <>
            <CityResume />

            <ImagesGrid />

            <div className="w-full p-2 lg:px-12 flex flex-col justify-center items-center md:flex-row">
                <PlaceDescription />
                <Map />
            </div>

            <PlacesCarousel
                query="tourist attractions"
                title="Pontos turísticos"
                description="Confira alguns dos pontos turísticos em seu destino."
            />

            <PlacesCarousel
                query="hotels"
                title="Hotéis"
                description="Explore uma variedade de opções de hospedagem que irão tornar a sua estadia inesquecível."
            />

            <PlacesCarousel
                query="restaurants"
                title="Restaurantes"
                description="Aqui estão algumas opções de restaurantes disponíveis em seu destino."
            />
        </>
    )
}
