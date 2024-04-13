import React from 'react'

type CardWrapperProps = {
    children: React.ReactNode,
    addClassName?: string
}

function CardWrapper({children, addClassName}: CardWrapperProps) {
    return (
        <div className={`p-6 border rounded-md ${addClassName}`}>
            {children}
        </div>
    )
}

export default CardWrapper