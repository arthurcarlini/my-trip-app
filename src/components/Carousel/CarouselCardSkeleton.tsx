export default function CarouselCardSkeleton() {
    return (
        <div className="absolute inset-0 rounded-md z-10 bg-slate-400">
            <div className="animate-pulse">
                <div className="absolute top-2 right-2 w-11 h-7 rounded-md bg-slate-300"></div>
                <div className="absolute right-0 left-0 bottom-2 w-60 h-11 mx-2 rounded-md bg-slate-300"></div>
            </div>
        </div>
    )
}