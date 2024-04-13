import React from 'react'

type TableRowProps = {
    name?: string,
    amount?: number,
    type?: string
}

function TableRow({name, amount, type}: TableRowProps) {
    const mainRow =
        !name && !amount &&
        <>
            <p className={'text-zinc-400'}>{type === 'expenses' ? 'Category' : 'Source'}</p>
            <p className={'text-zinc-400'}>Amount</p>
        </>

    return (
        <div className={type !== 'statistics' ? 'border-b py-4' : ''}>
            <div className={'flex justify-between'}>
                {name && amount ?
                    <>
                        <p className={type === 'statistics' ? 'font-medium' : ''}>{name}</p>
                        <p>{amount.toLocaleString('ru-RU')} ₽</p>
                    </>
                    :
                    mainRow
                }
            </div>
        </div>
    )
}

export default TableRow