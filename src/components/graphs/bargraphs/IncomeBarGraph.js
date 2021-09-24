import React, { Component } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';

class IncomeBarGraph extends Component {
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
				dataPoints: [
					{ x: new Date(2017, 0, 1), y: 19034.5 },
					{ x: new Date(2017, 1, 1), y: 20015 },
					{ x: new Date(2017, 2, 1), y: 27342 },
					{ x: new Date(2017, 3, 1), y: 20088 },
					{ x: new Date(2017, 4, 1), y: 20234 },
					{ x: new Date(2017, 5, 1), y: 29034 },
					{ x: new Date(2017, 6, 1), y: 30487 },
				]
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