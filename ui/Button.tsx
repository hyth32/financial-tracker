import React, {ButtonHTMLAttributes} from 'react'

type ButtonProps = {
    children: React.ReactNode,
    addClassName?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

function Button({children, addClassName, ...props}: ButtonProps) {
    return (
        <button {...props} className={`font-medium bg-zinc-100 hover:bg-zinc-200 transition-all ${addClassName}`}>
            {children}
        </button>
    )
}

export default Button