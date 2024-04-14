import React from 'react'

type CardWrapperProps = {
    children: React.ReactNode,
    addClassName?: string
}

function TableWrapper({children, addClassName}: CardWrapperProps) {
    return (
        <div className={`relative p-6 border rounded-md ${addClassName}`}>
            {children}
        </div>
    )
}

export default TableWrapper