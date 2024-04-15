import React, {useState} from 'react'

type TableRowProps = {
    id?: number,
    name?: string,
    amount?: number,
    type?: string,
    onDelete?: (id: number) => void,
    onEdit?: ({id, field, value}: { id: number, field: string, value: string }) => void
}

function TableRow({id, name, amount, type, onDelete, onEdit}: TableRowProps) {
    const isStats = type === 'statistics'
    const [newName, setNewName] = useState(name)
    const [newAmount, setNewAmount] = useState(amount)
    const handleBlur = async (e: React.ChangeEvent) => {
        const newText = e.currentTarget.textContent
        const fieldName = e.target.id
        const isNameValid = fieldName === 'name' && newText && newText !== '' && newText !== name
        const isAmountValid = fieldName === 'amount' && newText && newText !== '' && Number(newText) !== amount
        if ((isAmountValid || isNameValid) && id && onEdit) {
            const updatedRow = {
                id: id,
                field: fieldName,
                value: newText.includes(' ₽') ? newText.slice(0, newText.length - 2) : newText,
            }
            onEdit({...updatedRow})
        } else {
            fieldName === 'name' ?
                setNewName(name)
                :
                setNewAmount(amount)
        }
    }

    return (
        <div
            className={`rounded-md cursor-pointer hover:bg-zinc-100 transition-all`}
            // onClick={() => onDelete && id && !isStats ? onDelete(id) : undefined}
        >
            <div className={`${isStats ? '' : 'border-b py-4 px-1'} flex justify-between`}>
                {name ?
                    isStats ?
                        <>
                            <p>{name}</p>
                            <p>{amount}</p>
                        </>
                        :
                        <>
                            <p id={'name'} contentEditable suppressContentEditableWarning
                               onBlur={handleBlur}>{newName}</p>
                            <p id={'amount'} contentEditable suppressContentEditableWarning
                               onBlur={handleBlur}>{newAmount && newAmount > 0 ? `${newAmount.toLocaleString('ru-RU')} ₽` : 'Empty'}</p>
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