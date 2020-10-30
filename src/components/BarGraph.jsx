import React, { useState, useEffect } from "react";
import { Bar} from "react-chartjs-2";
import { options } from "../utilities";
import "../styles/BarGraph.css";

function BarGraph({ casesType }) {
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
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((res) => res.json())
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          //console.log(data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [casesType]);

  return (
    <div className="bargraph">
      {data?.length > 0 && (
        <Bar
          options={options}
          data={{
            datasets: [
              {
                data: data,
                backgroundColor: casesType !== "recovered"? "rgba(204,16,52, 0.5)":"#7dd71d",
                borderColor: "#CC1034",
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default BarGraph;
