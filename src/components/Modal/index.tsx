import { ReactNode } from "react"

import { CloseIcon } from "../ui/icons"

interface ModalType {
    show: boolean
    setShow: (value: boolean) => void
    title: string
    children: ReactNode
}

export default function Modal({ show, setShow, title, children }: ModalType) {

    if (show) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "auto"
    }

    return (
        <div className={`${show ? "block" : "hidden"} fixed inset-0 p-20 bg-transparent backdrop-blur-md`}>
            <div className="bg-white rounded-lg p-5">
                <div className="w-full grid">
                    <button
                        className="w-7 h-7 justify-self-end"
                        onClick={() => setShow(false)}>
                        <CloseIcon />
                    </button>
                </div>

                <div>
                    <h2 className="text-center">{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    )
}