/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class App extends Component {

	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);

	}

	toggleDataSeries(e) {
		if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	componentDidMount = () => {

	}
	render() {
		const options = {
			animationEnabled: true,
			colorSet: "colorSe4",
			title: {
				text: this.props.title
			},
			axisX: {
				valueFormatString: "D MMM"
			},
			axisY: {
				// prefix: "$",
				// labelFormatter: this.addSymbols
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries,
				verticalAlign: "top"
			},
			data: [{
				type: this.props.type,
				name: "diastolic(lower)",
				showInLegend: true,
				yValueFormatString: this.props.title === "Blood Pressure" ? "#,##0 mm Hg" : this.props.title === "Temprature" ? `#,##0 C` : "#,##0 mg/dL (3.9 mmol/L)",
				dataPoints: this.props.Data1
			}, {
				type: "line",
				name: "systolic",
				showInLegend: true,
				yValueFormatString: this.props.title === "Blood Pressure" ? "#,##0 mm Hg" : this.props.title === "Temprature" ? "#,##0 C" : "#,##0 mg/dL (3.9 mmol/L)",
				dataPoints: this.props.Data2

			}]
		}
		return (
			<div className='w-full h-full '>
				<CanvasJSChart options={options}
					onRef={ref => this.chart = ref}
				/>
				{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
			</div>
		);
	}
}
export default App;