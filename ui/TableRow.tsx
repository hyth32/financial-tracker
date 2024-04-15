import React from 'react'

type TableRowProps = {
    id?: number,
    name?: string,
    amount?: number,
    type?: string,
    onDelete?: (id: number) => void
}

function TableRow({id, name, amount, type, onDelete}: TableRowProps) {
    const isStats = type === 'statistics'

    return (
        <div
            className={`rounded-md cursor-pointer hover:bg-zinc-100 transition-all`}
            onClick={() => onDelete && id && !isStats ? onDelete(id) : undefined}
        >
            <div className={`${isStats ? '' : 'border-b py-4 px-1'} flex justify-between`}>
                {name ?
                    <>
                        <p>{name}</p>
                        <p>{amount && amount > 0 ? `${amount.toLocaleString('ru-RU')} ₽` : 'Empty'}</p>
                    </>
                    :
                    <>
                        <p className={'text-zinc-400'}>{type === 'expenses' ? 'Category' : 'Source'}</p>
                        <p className={'text-zinc-400'}>Amount</p>
                    </>
                }
            </div>
        </div>
    )
}

export default TableRow