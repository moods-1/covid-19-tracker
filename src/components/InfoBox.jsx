import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import '../styles/InfoBox.css';
import numeral from 'numeral';

function InfoBox({ title, active, isGreen, cases, total, ...props }) {
	return (
		<Card
			onClick={props.onClick}
			className={`info-box ${active && 'info-box-selected'} ${
				isGreen && 'info-box-green'
			}`}
		>
			<CardContent>
				<Typography color='textSecondary' className='info-box-title'>
					{title}
				</Typography>
				<h2 className={`info-box-cases ${isGreen && 'info-box-cases-green'}`}>
					{numeral(cases).format('0,0')}
				</h2>
				<Typography color='textSecondary' className='info-box-total'>
					{numeral(total).format('0,0') + ' Total'}
				</Typography>
			</CardContent>
		</Card>
	);
}
export default InfoBox;
