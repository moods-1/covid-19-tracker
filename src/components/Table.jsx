import React, { useState } from 'react';
import numeral from 'numeral';
import '../styles/Table.css';

function Table({ countries }) {
	const [countryFilter, setCountryFilter] = useState('');
	const filterCountries = countries.filter(({ country }) =>
		country.toLowerCase().includes(countryFilter.toLowerCase())
	);
	
	return (
		<div>
			<div className='table-search-div'>
				<input
					className='table-search-input'
					placeholder='Search by country'
					value={countryFilter || ''}
					onChange={(e) => setCountryFilter(e.target.value.toLowerCase())}
				/>
				<div className='table-search-icon-box'>
					{countryFilter ? (
						<i
							role='button'
							className='fas fa-trash trash'
							onClick={() => setCountryFilter('')}
						/>
					) : (
						<i className='fas fa-search search' />
					)}
				</div>
			</div>
			<div className='table-box'>
				<table className='table'>
					<tbody className='table-body'>
						{filterCountries.map(({ country, cases }) => (
							<tr className='table-row' key={country}>
								<td>{country}</td>
								<td>{numeral(cases).format('0,0')}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
export default Table;
