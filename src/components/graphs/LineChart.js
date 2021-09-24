import React, { Component } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { Container } from '@mui/material';
import Header from '../Header'

class LineChart extends Component {	
	constructor(props) {
		super(props);
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
				dataPoints: [
                    { x: new Date(2017, 0, 1), y: 19034.5 },
					{ x: new Date(2017, 1, 1), y: 20015 },
					{ x: new Date(2017, 2, 1), y: 27342 },
					{ x: new Date(2017, 3, 1), y: 20088 },
					{ x: new Date(2017, 4, 1), y: 20234 },
					{ x: new Date(2017, 5, 1), y: 29034 },
					{ x: new Date(2017, 6, 1), y: 30487 },
                ]
            },
            {
                type: "line",
				name: "Expense",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: [
                    { x: new Date(2017, 0, 1), y: 120 },
					{ x: new Date(2017, 1, 1), y: 135 },
					{ x: new Date(2017, 2, 1), y: 144 },
					{ x: new Date(2017, 3, 1), y: 103 },
					{ x: new Date(2017, 4, 1), y: 93 },
					{ x: new Date(2017, 5, 1), y: 129 },
					{ x: new Date(2017, 6, 1), y: 143 },
                ]
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