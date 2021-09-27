import React, { Component } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';

class IncomeBarGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			income: [],
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
			
			this.setState({
				income: incomeArr,
			})

			this.state.income.map(i => {
				i.x = new Date((i.x).split('/').reverse().join(', '))
			}).sort((a,b) => (a.x > b.x) ? 1 : ((b.x > a.x) ? -1 : 0))

			this.setState({
				newIncomeArr: this.state.income
			})
			console.log(this.state.newIncomeArr)
		})
	}

	render() {
		const options = {
            exportEnabled: true,
            theme: "dark1",
			title: {
				text: "Income"
			},
			data: [
			{
				type: "column",
				dataPoints: this.state.newIncomeArr
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

export default IncomeBarGraph;