import React from 'react'
import Title from '@/ui/Title'
import TableRow from '@/ui/TableRow'

type TableProps = {
    rows: {
        type: string,
        name: string,
        amount: number
    }[],
}

function Table({rows}: TableProps) {
    const tableTitle = rows[0].type.charAt(0).toUpperCase() + rows[0].type.slice(1)

    return (
        <div>
            <Title type={'h2'} content={tableTitle} addClassName={'mb-2'}/>
            {rows[0].type !== 'statistics' && <TableRow type={rows[0].type}/>}
            {rows.map(row => (
                <TableRow key={row.name} {...row}/>
            ))}
        </div>
    )
}

export default Table