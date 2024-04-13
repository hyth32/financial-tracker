import React from 'react'
import Title from '@/ui/Title'
import TableRow from '@/ui/TableRow'

type TableProps = {
    title: string,
    rows: {
        type: string,
        name: string,
        amount: number
    }[]
}

function Table({title, rows}: TableProps) {
    return (
        <div>
            <Title type={'h2'} content={title} addClassName={'mb-2'}/>
            {title.toLowerCase() !== 'statistics' && <TableRow type={title.toLowerCase()}/>}
            {rows.length === 0 && <p className={'py-4'}>No data</p>}
            {rows.map((row, index) => (
                    <TableRow key={index} {...row}/>
                ))}
        </div>
    )
}

export default Table