import React, { Component } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';

class ExpenseBarGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expense: [],
			newExpenseArr: []
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
			const expenseArr = data.map(({ expense, time: x, expense: y, ...rest}) => ({x, y, ...rest}));
			
			this.setState({
				expense: expenseArr,
			})

			this.state.expense.map(i => {
				i.x = new Date((i.x).split('/').reverse().join(', '));
				return 0;
			}).sort((a,b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0))

			this.setState({
				newExpenseArr: this.state.expense
			})
			console.log(this.state.newExpenseArr)
		})
	}
	
	render() {
		const options = {
            exportEnabled: true,
            theme: "dark1",
			title: {
				text: "Expense"
			},
			data: [
			{
				type: "column",
				dataPoints: this.state.newExpenseArr
			}
			]
		}
        return (
            <div>
                <CanvasJSChart options = {options} />
            </div>
		);
	}
}

export default ExpenseBarGraph;