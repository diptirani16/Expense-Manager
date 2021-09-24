import React, { Component } from 'react';
import IncomeBarGraph from './bargraphs/IncomeBarGraph';
import ExpenseBarGraph from './bargraphs/ExpenseBarGraph';
import { Grid, Container } from '@mui/material'
import Header from '../Header';


class BarChart extends Component {
    render() {
        return (
            <>
            <Header />
            <Container>
                <Grid container spacing={12}>
                    <Grid item xs={6} md={6}>
                        <IncomeBarGraph />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <ExpenseBarGraph />
                    </Grid>
                </Grid>
            </Container>
            </>
        )
    }
}

export default BarChart;