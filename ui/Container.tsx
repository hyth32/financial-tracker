import React from 'react'

function Container({children}: {children: React.ReactNode}) {
    return (
        <div className={'p-8'}>
            {children}
        </div>
    )
}

export default Container