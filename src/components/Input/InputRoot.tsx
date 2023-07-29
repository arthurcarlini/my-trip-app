import { ReactNode } from "react"

interface InputRoot {
    children: ReactNode
}

export default function InputRoot({ children }: InputRoot) {
    return (
        <div className="w-11/12 lg:w-1/2 h-14 md:h-20 rounded-xl absolute top-7 lg:top-auto lg:-bottom-10 flex items-center bg-white shadow">
            {children}
        </div>
    )
}