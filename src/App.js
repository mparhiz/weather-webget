import React, { useState, useEffect } from 'react';
import './App.scss'
import WeatherWidget from './components/WeatherWidget';
import au_cities from './assets/au_cities.json';

function App() {
    const units = ['standard', 'metric', 'imperial'];
    const cities = au_cities.map(item => {
        return {
            city: item.city,
            lat: item.lat,
            lon: item.lng
        }
    });

    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState({});
    const [unit, setUnit] = useState(units[1]);

    async function getLocation() {
        setIsLoading(true);
        // get local IP
        const ip = await fetch(`https://api64.ipify.org`)
            .then(data => data.text());
        
        // get location by IP
        fetch(`http://ip-api.com/json/${ip}`)
            .then(res => res.json())
            .then(data => {
                setLocation({
                    city: data.city,
                    lat: data.lat,
                    lon: data.lon
                });
                setIsLoading(false);
            })
            .catch(e => console.log(e));
    }

    useEffect(() => {
        getLocation();
    }, []);
    
    const handelUnitSelect = (e) => {
        setUnit(e.target.value);
    }

    const handelCitySelect = (e) => {
        setLocation(JSON.parse(e.target.value));
    }
    
    return (
        <div className="App">
            <div className="left">
                <label htmlFor="city">City:</label>
                <select name="city" id="city" value={JSON.stringify(location)} onChange={handelCitySelect}>
                    {cities.map((item, i) => {
                        return <option value={JSON.stringify(item)} key={i}>{item.city}</option>
                    })}
                </select>

                <label htmlFor="unit">Unit:</label>
                <select name="unit" id="unit" value={unit} onChange={handelUnitSelect}>
                    {units.map((item, i) => {
                        return <option value={item} key={i}>{item}</option>
                    })}
                </select>
            </div>
            <div className="center">
                {isLoading ? <p>Loading...</p> :
                    <WeatherWidget
                        accessKey="c40b86d3e94fbed13e9c3ec609c17e0e"
                        location={location}
                        unit={unit}
                    />
                }
            </div>
        </div>
    )
};

export default App;