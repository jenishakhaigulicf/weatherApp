import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherCard from "./WeatherCard";

function Temp() {

	//handling key press
  const handleKeypress = (e) => {
	//it triggers by pressing the enter key
    if (e.nativeEvent.code === "Enter") {
      getWeatherInfo();
    }
  };

  const [searchValue, setSearchValue] = useState("Kathmandu");
  const [weatherVariables, setWeatherVariables] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=1f88db6112274b5a4d9bca8e6ed7c290`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const { main: description } = data.weather[0];
      const { temp, humidity, pressure } = data.main;
      const { speed } = data.wind;
      const { sunset, country } = data.sys;
      const { timezone, name } = data;

      setWeatherVariables({ temp, humidity, pressure, speed, sunset, timezone, name, country, description});
    } catch (e) {
			alert(`City Not Found`)
      console.log(e);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => handleKeypress(e)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      <WeatherCard weatherVariables={weatherVariables} />
    </>
  );
}

export default Temp;
