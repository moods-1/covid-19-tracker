import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./App.css";
import React, { useState, useEffect } from "react";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import { sortData, firstCap } from "./utilities";
import Graph from "./components/Graph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 30, lng: -80 });
  const [mapZoom, setMapZoom] = useState(4);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [graphType, setGraphType] = useState("bar");
  const [periodDays, setPeriodDays] = useState(30);
  const baseURL = "https://disease.sh/v3/covid-19/";

  useEffect(()=> window.innerWidth <= 1024 && setMapZoom(2.5),[]);
  
  useEffect(() => {
    fetch(`${baseURL}all`)
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getWorldData = async () => {
      await fetch(`${baseURL}countries`)
        .then((res) => res.json())
        .then((data) => {
          const world = data.map((country) => ({
            name: country.country, // Full country name
            value: country.countryInfo.iso2, // Country initials USA, CA, UK
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(world);
          setMapCountries(data);
        })
        .catch((err) => console.log(err));
    };
    getWorldData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? `${baseURL}all`
        : `${baseURL}countries/${countryCode}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        if(countryCode === "worldwide"){
          setMapCenter({ lat: 30, lng: -45 });
          setMapZoom(3);
        }else{
          setMapCenter({lat:Number(data.countryInfo.lat), lng:Number(data.countryInfo.long)});
          setMapZoom(5);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleGraph = e => e.target.checked? setGraphType("line"):setGraphType("bar"); 
  const handlePeriod = e => setPeriodDays(e.target.value);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Global</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
              className="app__dropdown_select"
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries?.map((country, index) => (
                <MenuItem value={country.value} key={index}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            active={casesType === 'cases'}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases + " Total"}
          />
          <InfoBox
            isGreen
            active={casesType === 'recovered'}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered + " Total"}
          />
          <InfoBox
            active={casesType === 'deaths'}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths + " Total"}
          />
        </div>
        <div className="app__map">
          <Map 
            countries={mapCountries} 
            casesType={casesType} 
            center={mapCenter}
            zoom={mapZoom}
          />
        </div>
      </div>
      <div className="app__right">
      <Card >
        <CardContent>
          <h3>Recorded Cases by Country</h3>
          <Table countries={tableData} />
          <h3 id="worldwide-h3">Worldwide New {firstCap(casesType)}</h3>
          <section id="bar-line">
            <label htmlFor="lineGraph">Line graph</label>
            <input 
              onChange={handleGraph}
              type="checkbox" 
              name="lineGraph" 
              id="lineGraph"/>
          </section>
          <section id="period">
            <label htmlFor="graph-range">Period (days)</label>
            <input 
              onChange={handlePeriod}
              type="range" 
              name="graph-range"
              min="7"
              max="120"
              id="range-slider"
              />
            <p>{periodDays}</p>  
          </section>
          <Graph  period={periodDays} graphType={graphType} casesType={casesType}/>
        </CardContent>
      </Card>
      </div>
      
    </div>
  );
}
export default App;