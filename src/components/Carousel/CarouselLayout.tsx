import { ReactNode } from "react"

interface CarouselLayout {
    children: ReactNode
    title: string
    description: string
}

export default function CarouselLayout({ children, title, description }: CarouselLayout) {
    return (
        <div className="mt-5 p-2 lg:px-12">
            <h2 className="font-bold text-2xl">{title}</h2>
            <p className="mb-5 lg:mb-0">{description}</p>
            {children}
        </div>
    )
}