import React from 'react'

type TableRowProps = {
    id?: number,
    name?: string,
    amount?: number,
    type?: string,
    onDelete?: (id: number) => void
}

function TableRow({id, name, amount, type, onDelete}: TableRowProps) {
    const mainRow =
        !name && !amount &&
        <>
            <p className={'text-zinc-400'}>{type === 'expenses' ? 'Category' : 'Source'}</p>
            <p className={'text-zinc-400'}>Amount</p>
        </>

    return (
        <div
            className={`rounded-md border border-transparent cursor-pointer hover:border-zinc-200 hover:bg-zinc-100 transition-all ${type !== 'statistics' ? 'border-b py-4 px-4' : ''}`}
            onClick={() => onDelete && id ? onDelete(id) : undefined}
        >
            <div className={'flex justify-between'}>
                {name ?
                    <>
                        <p className={type === 'statistics' ? 'font-medium' : ''}>{name} {id}</p>
                        <p>{amount && amount > 0 ? `${amount.toLocaleString('ru-RU')} ₽` : 'Empty'}</p>
                    </>
                    :
                    mainRow
                }
            </div>
        </div>
    )
}

export default TableRow