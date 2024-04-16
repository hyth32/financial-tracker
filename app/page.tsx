import React from 'react'
import TableWrapper from '@/ui/TableWrapper'
import Table from '@/components/Table'
import Container from '@/ui/Container'
import Grid from '@/ui/Grid'

function Page() {
    return (
        <Container>
            <TableWrapper addClassName={'w-1/3'}>
                <Table title={'Statistics'}/>
            </TableWrapper>
            <Grid addClassName={'mt-4'}>
                <TableWrapper>
                    <Table title={'Expenses'}/>
                </TableWrapper>
                <TableWrapper>
                    <Table title={'Incomes'}/>
                </TableWrapper>
            </Grid>
        </Container>
    )
}

export default Page