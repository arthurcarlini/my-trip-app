import { Loader } from "@googlemaps/js-api-loader"

const API_KEY = 'AIzaSyBxC2hxuRJ-HjyfgIUKekDIw_ndNOd9yQA' // tirar isso daqui

const loader = new Loader({
    apiKey: API_KEY,
    version: "weekly",
    libraries: ["places"]
})


export function initAutocomplete(input: HTMLInputElement | null) {
    loader
        .importLibrary("places")
        .then(({ Autocomplete }) => {
            if (input != null) {
                const autocomplete = new Autocomplete(input)
                autocomplete.setFields(["name", "place_id", "photos"])
                autocomplete.setTypes(["(cities)"])

                autocomplete.addListener("place_changed", () => {
                    console.log(autocomplete.getPlace())
                })
            }
        })
        .catch((e) => {
            console.log(e)
        })
}

export function initPlacesService(cityName: string, map: HTMLDivElement) {
    loader.importLibrary("places")
        .then(({ PlacesService }) => {
            const placeService = new PlacesService(map)
            const request = {
                query: `Pontos turísticos em ${cityName}`
            }
            const callback = (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    if (results != null) {
                        for (let i = 0; i < 4; i++) {
                            const place = results[i];
                            console.log(place)
                        }
                    }
                }
                placeService.textSearch(request, callback)
            }
        })
}
