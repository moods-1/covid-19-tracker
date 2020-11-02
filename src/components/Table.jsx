import React from "react";
import numeral from 'numeral';
import '../styles/Table.css';

function Table({ countries }) {
  return (
    <div className="table__box" >
      <table  className="table">
        <tbody className="table_body">
          {countries?.map(({ country, cases }) => (
              <tr className="table_row" key={country}>
                <td>{country}</td>
                <td>
                  <strong>{numeral(cases).format('0,0')}</strong>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;