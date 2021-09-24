import React, { Component } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Container } from '@mui/material';
import Header from '../Header';

class PieChart extends Component {
	render() {
		const options = {
			exportEnabled: true,
			animationEnabled: true,
            theme: "dark1",
			title: {
				text: "Income vs Expense"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: 78, label: "Income" },
                    { y: 22, label: "Expense" }
				]
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