import React from 'react'
import Title from '@/ui/Title'
import TableRow from '@/ui/TableRow'
import {Row} from '@/data/types'
import Button from '@/ui/Button'

type TableProps = {
    title: string,
    rows: Row[],
    onAdd?: (type: string) => void,
    onDelete?: (id: number) => void
}

function Table({title, rows, onAdd, onDelete}: TableProps) {
    const rowTitle = title.toLowerCase()
    const isStats = rowTitle === 'statistics'
    const type = rowTitle.slice(0, title.length - 1)

    return (
        <div>
            <Title type={'h2'} content={title} addClassName={'mb-4'}/>
            {!isStats &&
                <>
                    <Button onClick={() => onAdd ? onAdd(type) : undefined}
                            addClassName={'absolute right-6 top-6 py-1 px-3 rounded-lg'}>
                        Add
                    </Button>
                    <TableRow type={title.toLowerCase()}/>
                </>
            }
            {rows.length > 0 ?
                rows.map(row => (
                    <TableRow key={row.id} {...row} onDelete={() => onDelete!(row.id)}/>
                ))
                :
                <p className={'py-4'}>No data</p>
            }
        </div>
    )
}

export default Table