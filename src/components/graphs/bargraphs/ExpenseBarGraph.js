import React, { Component } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';

class ExpenseBarGraph extends Component {
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
				dataPoints: [
                    { x: new Date(2017, 0, 1), y: 120 },
					{ x: new Date(2017, 1, 1), y: 135 },
					{ x: new Date(2017, 2, 1), y: 144 },
					{ x: new Date(2017, 3, 1), y: 103 },
					{ x: new Date(2017, 4, 1), y: 93 },
					{ x: new Date(2017, 5, 1), y: 129 },
					{ x: new Date(2017, 6, 1), y: 143 },
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

export default ExpenseBarGraph;