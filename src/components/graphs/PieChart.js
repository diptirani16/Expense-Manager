import React, { Component } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Container } from '@mui/material';
import Header from '../Header';

class PieChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryData: [],
			newObj: [],
			sum: 0,
			resultData: []
		}
	}
	
	componentDidMount() {
		let token = localStorage.getItem('token');

		fetch('https://expense.spacenditure.com/api/stats/categoryDistribution', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		})
			.then((res) => res.json())
			.then((data) => {
				let sum = 0;
				console.log(data)
				this.setState({
					categoryData: data,
					newObj: data.map(({
						amount: y,
						category: label,
						...rest
					}) => ({
						y,
						label,
						...rest
					})),
				})
				this.state.newObj.map(i => {
					sum = i.y + sum;
					return 0; 
				   })
				this.state.newObj.map(i => {
					i.y = ((i.y * 100) / sum).toFixed(2);
					return 0;
				})
				this.setState({
					resultData: this.state.newObj
				})
			})    
			       
	}

	render() {

		const options = {
			exportEnabled: true,
			animationEnabled: true,
            theme: "dark1",
			title: {
				text: "Category Distribution"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: this.state.resultData
			}]
		}


		return (
            <>
                <Header />
                <Container>
                    <CanvasJSChart options = {options} />
                </Container>
            </>
		);
	}
}

export default PieChart;