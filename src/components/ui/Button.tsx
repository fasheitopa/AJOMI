import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'accent' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#055926] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          {
            'bg-[#055926] text-white hover:bg-[#04481f] shadow-sm shadow-[#055926]/20': variant === 'default',
            'bg-[#1F2937] text-white hover:bg-[#111827] shadow-sm': variant === 'secondary',
            'bg-[#D4A72C] text-[#172018] font-semibold hover:bg-[#bb8d1e] shadow-sm shadow-[#D4A72C]/25': variant === 'accent',
            'border border-gray-200 bg-white text-[#172018] hover:bg-[#f0f7f2] hover:text-[#055926] hover:border-[#badebe] shadow-xs': variant === 'outline',
            'text-[#172018] hover:bg-gray-100 hover:text-[#055926]': variant === 'ghost',
            'text-[#055926] font-medium underline-offset-4 hover:underline': variant === 'link',
            'h-10 px-5 py-2.5': size === 'default',
            'h-9 rounded-lg px-3.5 text-xs': size === 'sm',
            'h-12 rounded-2xl px-8 text-base': size === 'lg',
            'h-10 w-10 rounded-xl': size === 'icon',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
