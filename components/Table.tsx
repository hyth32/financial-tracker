import React from 'react'
import Title from '@/ui/Title'
import TableRow from '@/ui/TableRow'
import {Row} from '@/data/types'

type TableProps = {
    title: string,
    rows: Row[],
    onDelete?: (id: number) => void
}

function Table({title, rows, onDelete}: TableProps) {
    return (
        <div>
            <Title type={'h2'} content={title} addClassName={'mb-2'}/>
            {title.toLowerCase() !== 'statistics' && <TableRow type={title.toLowerCase()}/>}
            {rows.length === 0 && <p className={'py-4'}>No data</p>}
            {rows.map(row => (
                <TableRow key={row.id} {...row} onDelete={() => onDelete!(row.id)}/>
            ))}
        </div>
    )
}

export default Table