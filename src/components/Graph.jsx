import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { options, plugins } from '../utilities';
import '../styles/Graph.css';

function Graph({ period, graphType, casesType }) {
	const [data, setData] = useState([]);

	const buildChartData = (data, casesType) => {
		let chartData = [];
		let lastDataPoint;
		for (let date in data.cases) {
			if (lastDataPoint) {
				const newDataPoint = {
					x: date,
					// Difference between current date and the previous date/day
					y: data[casesType][date] - lastDataPoint,
				};
				chartData.push(newDataPoint);
			}
			lastDataPoint = data[casesType][date];
		}
		return chartData;
	};
	useEffect(() => {
		const fetchData = async () => {
			await fetch(
				`https://disease.sh/v3/covid-19/historical/all?lastdays=${period}`
			)
				.then((res) => res.json())
				.then((data) => {
					let chartData = buildChartData(data, casesType);
					setData(chartData);
				})
				.catch((err) => console.log(err));
		};
		fetchData();
	}, [casesType, period]);

	let body;
	if (graphType === 'line') {
		body = (
			<Line
				options={options}
				plugins={plugins}
				data={{
					datasets: [
						{
							data: data,
							backgroundColor:
								casesType !== 'recovered' ? 'rgba(204,16,52, 0.5)' : '#7dd71d',
							borderColor: casesType !== 'recovered' ? '#CC1034' : 'green',
							borderWidth: 1,
							fill: true,
							pointStyle: 'star',
							pointRadius: 2.5,
						},
					],
				}}
			/>
		);
	} else if (graphType === 'bar') {
		body = (
			<Bar
				options={options}
				plugins={plugins}
				data={{
					datasets: [
						{
							data: data,
							backgroundColor:
								casesType !== 'recovered' ? 'rgba(204,16,52, 0.5)' : '#7dd71d',
							borderColor: casesType !== 'recovered' ? '#CC1034' : 'green',
							borderWidth: 1,
						},
					],
				}}
			/>
		);
	}
	return <div className='graph'>{body}</div>;
}

export default Graph;
