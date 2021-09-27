import React, { Component } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Container } from '@mui/material';
import Header from '../Header'

class LineChart extends Component {	
	constructor(props) {
		super(props);
		this.state = {
			income: [],
			expense: [],
			newExpenseArr: [],
			newIncomeArr: []
		}
	}

	componentDidMount() {
		let token = localStorage.getItem('token');

		fetch('https://expense.spacenditure.com/api/stats/perMonthExpenses', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		})
		.then((res) => res.json())
		.then((data) => {
			const incomeArr = data.map(({ expense, time: x, income: y, ...rest}) => ({x, y, ...rest}));
			const expenseArr = data.map(({ income, time: x, expense: y, ...rest}) => ({x, y, ...rest}));
			
			this.setState({
				income: incomeArr,
				expense: expenseArr
			})

			this.state.income.map(i => {
				i.x = new Date((i.x).split('/').reverse().join(', '))
				return 0;
			}).sort((a,b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0))

			this.state.expense.map(i => {
				i.x = new Date((i.x).split('/').reverse().join(', '))
				return 0;
			}).sort((a,b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0))

			this.setState({
				newExpenseArr: this.state.expense,
				newIncomeArr: this.state.income
			})
			console.log(this.state.newIncomeArr, this.state.newExpenseArr)
		})
	}

    render() {
		const options = {
			theme: "dark1",
			animationEnabled: true,
            exportEnabled: true,
			title:{
				text: "Income vs Expense"
			},
			subtitles: [{
				text: "Per month Line Chart"
			}],
			axisX: {
				title: "Date"
			},
            axisY: {
				title: "Income",
				titleFontColor: "#5e81ac",
				lineColor: "#5e81ac",
				labelFontColor: "#5e81ac",
				tickColor: "#5e81ac"
			},
			axisY2: {
				title: "Expense",
				titleFontColor: "#fa5252",
				lineColor: "#fa5252",
				labelFontColor: "#fa5252",
				tickColor: "#fa5252"
			},
			toolTip: {
				shared: true
			},
            data: [
            {
				type: "line",
				name: "Income",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0 .#",
				dataPoints: this.state.newIncomeArr
                
            },
            {
                type: "line",
				name: "Expense",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: this.state.newExpenseArr
            }]
        }
        return (
            <>
            <Header />
            <Container>
                <CanvasJSChart options = {options} onRef={ref => this.chart = ref} />
            </Container>
            </>
        );
    }
}

export default LineChart;