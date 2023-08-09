import { Loader } from "@googlemaps/js-api-loader"

const API_KEY = 'AIzaSyBxC2hxuRJ-HjyfgIUKekDIw_ndNOd9yQA'

export const googleMapsApi = new Loader({
    apiKey: API_KEY,
    version: "weekly",
    libraries: ["places", "routes"]
})
