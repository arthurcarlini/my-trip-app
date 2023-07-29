'use client'
import { useState } from "react"
import AccordionPanel from "./AccordionPanel"
import imageTest from "../../../public/porto-alegre-3.jpg"

export default function AccordionRoot() {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const image = imageTest
    return (
        <div className="mt-2 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-2">
            <AccordionPanel
                isActive={activeIndex === 0}
                show={() => setActiveIndex(0)}
                img={image}
                title={"Praça"}
                text={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor ipsam asperiores alias illum hic consequatur molestiae quia doloribus architecto minima minus velit, libero ullam enim tenetur perspiciatis sunt labore quidem."}
            />
            <AccordionPanel
                isActive={activeIndex === 1}
                show={() => setActiveIndex(1)}
                img={image}
                title={"Cinema"}
                text={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor ipsam asperiores alias illum hic consequatur molestiae quia doloribus architecto minima minus velit, libero ullam enim tenetur perspiciatis sunt labore quidem."}
            />
            <AccordionPanel
                isActive={activeIndex === 2}
                show={() => setActiveIndex(2)}
                img={image}
                title={"Cinema"}
                text={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor ipsam asperiores alias illum hic consequatur molestiae quia doloribus architecto minima minus velit, libero ullam enim tenetur perspiciatis sunt labore quidem."}
            />
            <AccordionPanel
                isActive={activeIndex === 3}
                show={() => setActiveIndex(3)}
                img={image}
                title={"Cinema"}
                text={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor ipsam asperiores alias illum hic consequatur molestiae quia doloribus architecto minima minus velit, libero ullam enim tenetur perspiciatis sunt labore quidem."}
            />
        </div>
    )
}