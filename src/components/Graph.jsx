import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { options } from "../utilities";
import "../styles/Graph.css";

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
      await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=${period}`)
        .then((res) => res.json())
        .then((data) => {
          console.log({data})
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [casesType, period]);

  return (
    <div className="graph">
      {data?.length > 0 && graphType ==="line" && (
        <Line
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: casesType !== "recovered"? "rgba(204,16,52, 0.5)":"#7dd71d",
                borderColor: casesType !== "recovered"? "#CC1034":"green",
                borderWidth: 1,
                fill: true,
                pointStyle: 'star',
                pointRadius: 2.5
              },
            ],
          }}
        />
      )}
      {data?.length > 0 && graphType ==="bar" && (
        <Bar
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: casesType !== "recovered"? "rgba(204,16,52, 0.5)":"#7dd71d",
                borderColor:casesType !== "recovered"? "#CC1034":"green",
                borderWidth: 1
              },
            ],
          }}
        />
      )}   
    </div>
  );
}

export default Graph;
