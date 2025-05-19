import { cn } from "@/lib/utils"

interface TiltedScrollItem {
  id: string;
  text: string;
  description?: string;
}

interface TiltedScrollProps {
  items?: TiltedScrollItem[];
  className?: string;
  showDescriptions?: boolean;
}

export function TiltedScroll({
  items = defaultItems,
  className,
  showDescriptions = true
}: TiltedScrollProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_5rem),linear-gradient(to_left,transparent,black_5rem),linear-gradient(to_bottom,transparent,black_5rem),linear-gradient(to_top,transparent,black_5rem)]">
        <div className="grid h-[400px] w-[400px] gap-5 animate-skew-scroll grid-cols-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col cursor-pointer rounded-md border border-light_blue/20 bg-gradient-to-b from-isabelline/80 to-light_blue/10 p-5 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-xl hover:border-light_blue/40"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircleIcon className="h-6 w-6 mr-2 stroke-prussian_blue/60 transition-colors group-hover:stroke-prussian_blue" />
                <h3 className="text-prussian_blue font-semibold transition-colors group-hover:text-prussian_blue">
                  {item.text}
                </h3>
              </div>
              {showDescriptions && item.description && (
                <p className="text-sm text-prussian_blue/70 pl-8 mt-1 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

const defaultItems: TiltedScrollItem[] = [
  { id: "1", text: "Item 1" },
  { id: "2", text: "Item 2" },
  { id: "3", text: "Item 3" },
  { id: "4", text: "Item 4" },
  { id: "5", text: "Item 5" },
  { id: "6", text: "Item 6" },
  { id: "7", text: "Item 7" },
  { id: "8", text: "Item 8" },
]
