import numeral from "numeral";
import React from "react";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
  const sortedData = [...data];
  // -1 = false / 1 = tru
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: (tooltipItem) => numeral(tooltipItem.value).format("+0,0"),
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: (value) => numeral(value).format("0a"),
        },
      },
    ],
  },
};

// Draw circles on the map with tooltips
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 275,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 275,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 500,
  },
};

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country,index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-cases">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
