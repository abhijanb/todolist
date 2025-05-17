import * as React from "react"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <div className="flex h-9 w-full items-center rounded-md border border-input bg-transparent text-base shadow-xs transition-[color,box-shadow] focus-within:ring-2 focus-within:ring-ring/50 focus-within:border-ring overflow-hidden">
      <span className="flex h-full items-center justify-center px-3 text-muted-foreground">
        <Search className="h-4 w-4" />
      </span>
      <input
        type={type}
        data-slot="input"
        className={cn(
          "flex-1 bg-transparent px-3 py-1 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

export default  Input 
