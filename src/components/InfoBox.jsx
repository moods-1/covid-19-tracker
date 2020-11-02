import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import '../styles/InfoBox.css';
import numeral from 'numeral';

function InfoBox({title, active, isGreen, cases, total, ...props}) {
    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && 'infoBox--selected'} ${isGreen && 'infoBox--green'}`}>
            <CardContent>
                <Typography color="textSecondary" className="infoBox__title">
                   {title} 
                </Typography>
                <h2 className={`infoBox__cases ${isGreen && 'infoBox__cases--green'}`}>{numeral(cases).format('0,0')}</h2>
                <Typography 
                    color="textSecondary" 
                    className="infoBox__total">
                   {numeral(total).format('0,0') +" Total"} 
                </Typography>
            </CardContent>
            
        </Card>
    )
}
export default InfoBox