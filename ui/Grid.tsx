import React from 'react'

type GridProps = {
    children: React.ReactNode,
    addClassName?: string
}

function Grid({children, addClassName}: GridProps) {
    return (
        <div className={`grid gap-4 grid-cols-1 md:grid-cols-2 ${addClassName}`}>
            {children}
        </div>
    )
}

export default Grid