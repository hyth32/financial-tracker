'use client'
import React from 'react'
import Title from '@/ui/Title'
import TableRow from '@/ui/TableRow'
import {Row} from '@/data/types'
import Button from '@/ui/Button'

type TableProps = {
    title: string,
    rows: Row[],
    onAdd?: (type: string) => void,
    onDelete?: (id: number) => void,
    onEdit?: ({id, field, value}: { id: number, field: string, value: string }) => void,
    onCategory?: ({id, type, category}: {id: number, type: string, category: string}) => void
}

function Table({title, rows, onAdd, onDelete, onEdit, onCategory}: TableProps) {
    const rowTitle = title.toLowerCase()
    const isStats = rowTitle === 'statistics'
    const type = rowTitle.slice(0, title.length - 1)

    return (
        <div>
            <Title type={'h2'} content={title} addClassName={'mb-4'}/>
            {!isStats &&
                <>
                    <Button onClick={() => onAdd ? onAdd(type) : undefined}
                            addClassName={'py-1 px-3 rounded-lg absolute right-6 top-6'}>
                        Add
                    </Button>
                    <TableRow type={title.toLowerCase()}/>
                </>
            }
            {rows.length > 0 ?
                rows.map(row => (
                    <TableRow key={row.id} {...row} onDelete={() => onDelete!(row.id)}
                              onEdit={onEdit}
                              onCategory={onCategory}
                    />
                ))
                :
                <p className={'py-4'}>No data</p>
            }
        </div>
    )
}

export default Table