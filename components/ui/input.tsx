import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, endIcon, ...props }, ref) => {
    if (icon || endIcon) {
      return (
        <div className="relative flex items-center w-full">
          {icon && (
            <div className="pointer-events-none absolute left-3.5 flex items-center text-white/40 [&_svg]:size-4">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-xl border border-white/10 bg-white/3 px-3.5 text-sm text-white placeholder:text-white/35 transition-colors duration-200 outline-none focus:border-white/30 focus:bg-white/6 focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              endIcon && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3 flex items-center">
              {endIcon}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-white/10 bg-white/3 px-3.5 text-sm text-white placeholder:text-white/35 transition-colors duration-200 outline-none focus:border-white/30 focus:bg-white/6 focus:ring-2 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
