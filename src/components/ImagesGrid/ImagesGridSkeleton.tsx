export default function GridImageSkeleton() {
    return (
        <div className="animate-pulse relative grid grid-cols-2 grid-rows-2 gap-0.5 h-96">
            <div className="relative col-span-2 lg:col-span-1 lg:row-span-2">
                <div className="bg-slate-400 h-full"></div>
            </div>
            <div className="relative">
                <div className="bg-slate-400 h-full"></div>
            </div>
            <div className="relative">
                <div className="bg-slate-400 h-full"></div>
            </div>
        </div>
    )
}
