import React from 'react'

type TitleProps = {
    content: string,
    type: string,
    addClassName: string
}

function Title({content, type, addClassName}: TitleProps) {
    switch (type) {
        case 'h2':
            return <h2 className={`font-semibold text-xl ${addClassName}`}>{content}</h2>
        case 'h3':
            return <h3 className={`${addClassName}`}>{content}</h3>
        default:
            return <h1 className={`${addClassName}`}>{content}</h1>
    }
}

export default Title