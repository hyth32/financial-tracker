import React, {useEffect, useState} from 'react'
import Button from '@/ui/Button'
import useSWR from 'swr'
import {getCategories} from '@/app/api/get-categories/getCategories'

type TableRowProps = {
    id?: number,
    name?: string,
    amount?: number,
    category_id?: number | null,
    type?: string,
    onDelete?: (id: number) => void,
    onEdit?: ({id, field, value}: { id: number, field: string, value: string }) => void,
    onCategory?: ({id, type, category}: { id: number, type: string, category: string }) => void
}

function TableRow({id, name, amount, type, category_id, onDelete, onEdit, onCategory}: TableRowProps) {
    const {data} = useSWR<{ id: number, type: string, name: string }[]>('api/get-categories', getCategories)
    const expenseCategories = data ? data.filter(r => r.type === 'expense') : []
    const incomeCategories = data ? data.filter(r => r.type === 'income') : []
    const categories = type === 'expense' ? expenseCategories : incomeCategories
    const [categoryName, setCategoryName] = useState('')

    useEffect(() => {
        categories.map(cat => {
            if (cat.id === category_id) {
                setCategoryName(cat.name)
            }
        })
    }, [categories, category_id])

    const isStats = type === 'statistics'
    const [newField, setNewField] = useState({
        name: name,
        amount: amount,
    })
    const [action, setAction] = useState({
        isEditing: false,
        isOpened: false,
    })

    const handleBlur = async (e: React.ChangeEvent) => {
        setAction(a => ({...a, isEditing: false}))
        const newText = e.currentTarget.textContent
        const fieldName = e.target.id
        if (newText) {
            const truncatedText = newText.replace(/\s+/g, '').slice(0, newText.length - 2)
            const isNameValid = newText && fieldName === 'name' && newText !== '' && newText !== name
            const isAmountValid = newText && fieldName === 'amount' && newText !== '' && Number(truncatedText) !== amount
            if ((isAmountValid || isNameValid) && id && onEdit) {
                const newValue = newText.includes(' ₽') ? truncatedText : newText
                const updatedRow = {
                    id: id,
                    field: fieldName,
                    value: newValue,
                }
                onEdit({...updatedRow})
            } else {
                fieldName === 'name' ?
                    setNewField(f => ({...f, name: name}))
                    :
                    setNewField(f => ({...f, amount: amount}))
            }
        }
    }

    useEffect(() => {
        setNewField(f => ({...f, amount: amount}))
    }, [amount])

    if (!name) {
        return (
            <div className={'flex justify-between py-4'}>
                <p className={'text-zinc-400'}>{type === 'expenses' ? 'Category' : 'Source'}</p>
                <p className={'text-zinc-400'}>Amount</p>
            </div>
        )
    }

    const categoriesSelect =
        <>
            {categories.map((category, index) => (
                <Button key={category.id}
                        addClassName={`${categoryName !== '' && categoryName === category.name ? 'bg-zinc-400 text-white' : 'bg-zinc-200'} px-2 py-1 rounded-md`}
                        onClick={() => handleCategorySelect(category.name)}>
                    <p>{category.name}</p>
                </Button>
            ))}
        </>


    const handleCategorySelect = (name: string) => {
        if (id && type) {
            onCategory ? onCategory({id: id, type: type, category: name}) : undefined
        }
    }

    return (
        <div className={`hover:bg-zinc-100 transition-all`}>
            <div className={`${isStats ? '' : 'border-b py-4 px-1'}`}>
                {isStats ?
                    <div className={'flex justify-between'}>
                        <p>{name}</p>
                        <p>{amount && amount > 0 ? `${amount.toLocaleString('ru-RU')} ₽` : 'Empty'}</p>
                    </div>
                    :
                    <>
                        <div className={'flex gap-4'}>
                            <div className={'flex justify-between w-full'}>
                                <p id={'name'} contentEditable={action.isEditing}
                                   onClick={() => setAction(a => ({...a, isEditing: true}))}
                                   suppressContentEditableWarning
                                   onBlur={handleBlur}>{newField.name} {id}</p>
                                <p id={'amount'} contentEditable={action.isEditing}
                                   onMouseEnter={() => setAction(a => ({...a, isEditing: true}))}
                                   suppressContentEditableWarning
                                   onBlur={handleBlur}
                                >
                                    {newField.amount && newField.amount > 0 ? `${newField.amount.toLocaleString('ru-RU')} ₽` : 'Empty'}
                                </p>
                            </div>
                            <p className={'px-2 bg-zinc-200 hover:bg-zinc-300 rounded-md cursor-pointer'}
                               onClick={() => setAction(a => ({...a, isOpened: !a.isOpened}))}>
                                {!action.isOpened ? '⌄' : '⌃'}
                            </p>
                        </div>
                        {action.isOpened &&
                            <div className={'mt-4 flex justify-between'}>
                                <div className={'flex w-1/2 flex-wrap gap-2'}>
                                    {action.isOpened && categoriesSelect}
                                </div>
                                <Button addClassName={'bg-zinc-200 px-2 py-1 rounded-md self-start'}
                                        onClick={() => onDelete && id && !isStats ? onDelete(id) : undefined}>
                                    Delete
                                </Button>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default TableRow