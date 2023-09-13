"use client"

interface CityResume {
    placeAddress: string
}

export default function CityResume({ placeAddress }: CityResume) {

    return (
        <div className="">
            <h1 className="text-center font-semibold text-2xl mb-2">{placeAddress}</h1>
            <p className="text-center mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt facere beatae, iure dolorem modi ullam libero repellendus, eos deserunt cum quisquam nulla illum architecto. Eaque enim impedit consectetur pariatur veritatis!
            </p>
        </div>
    )
}