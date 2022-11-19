import React, { useEffect, useState } from 'react';
import { Map as Maps, TileLayer } from 'react-leaflet';
import '../styles/Map.css';
import { showDataOnMap } from '../utilities';

function Map({ countries, casesType, center, zoom }) {
	// The hooks fixes incorrect panning to countries
	const [center1, setCenter1] = useState(center);
	useEffect(() => setCenter1(center), [center]);
	return (
		<div className='map'>
			<Maps center={center1} zoom={zoom}>
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="http://osm.org/copyright">
                OpenStreetMap</a> contributors'
				/>
				{showDataOnMap(countries, casesType)}
			</Maps>
		</div>
	);
}
export default Map;
