export default function PlaceDescriptionSkeleton() {
    return (
        <div className="lg:w-1/2 md:mr-20 p-5 rounded-md bg-slate-400">
            <div className="animate-pulse grid grid-cols-4 gap-4">
                <div className="h-5 bg-slate-300 rounded-md col-span-1 mb-2"></div>
                <div className="h-4 bg-slate-300 rounded col-span-4"></div>
                <div className="h-4 bg-slate-300 rounded col-span-3"></div>
                <div className="h-4 bg-slate-300 rounded col-span-4"></div>
                <div className="h-4 bg-slate-300 rounded col-span-2"></div>
            </div>
        </div>
    )
}