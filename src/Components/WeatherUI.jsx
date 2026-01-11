import React, { useState } from "react";
import Axios from "axios";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow
} from "react-icons/wi";

const WeatherUI = () => {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("Delhi");
  const [temp, setTemp] = useState(25);
  const [humidity, setHumidity] = useState(60);
  const [wind, setWind] = useState(12);
  const [feelsLike, setFeelsLike] = useState(30);
  const [condition, setCondition] = useState("");
  const [bg, setBg] = useState("sunny");

  const apiKey = "c02350867fe24177a6f51244252604";

  const weatherDetails = async () => {
    if (!cityInput) return;

    const res = await Axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}&aqi=no`
    );

    const {
      location: { name },
      current: {
        temp_c,
        humidity,
        wind_kph,
        feelslike_c,
        condition: { text }
      }
    } = res.data;

    setCity(name);
    setTemp(temp_c);
    setHumidity(humidity);
    setWind(wind_kph);
    setFeelsLike(feelslike_c);
    setCondition(text);
    setCityInput("");

    //  BACKGROUND CHANGE LOGIC
    if (text.includes("Sunny") || text.includes("Clear")) setBg("sunny");
    else if (text.includes("Cloud")) setBg("cloudy");
    else if (text.includes("Rain")) setBg("rainy");
    else if (text.includes("Snow")) setBg("snow");
    else if (text.includes("Thunder")) setBg("storm");
    else setBg("sunny");
  };

  const getWeatherIcon = () => {
    if (!condition) return <WiCloudy size={90} />;
    if (condition.includes("Sunny") || condition.includes("Clear"))
      return <WiDaySunny size={90} />;
    if (condition.includes("Cloud")) return <WiCloudy size={90} />;
    if (condition.includes("Rain")) return <WiRain size={90} />;
    if (condition.includes("Thunder"))
      return <WiThunderstorm size={90} />;
    if (condition.includes("Snow")) return <WiSnow size={90} />;
  };

  return (
    <div className={`app ${bg}`}>
      <div className="weather-card glass">

        <div className="search-box">
          <input
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Search city..."
          />
          <button onClick={weatherDetails}>🔍</button>
        </div>

        <h2 className="city">{city}</h2>

        <div className="icon">{getWeatherIcon()}</div>

        <h1 className="temp">{temp}°C</h1>
        <p className="condition">{condition}</p>

        <div className="details">
          <div>
            <span>Humidity</span>
            <h4>{humidity}%</h4>
          </div>
          <div>
            <span>Wind</span>
            <h4>{wind} km/h</h4>
          </div>
          <div>
            <span>Feels Like</span>
            <h4>{feelsLike}°C</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherUI;
