class Services {
    getWeather(accessKey, location, unit) {
        return fetch(`http://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly,alerts&appid=${accessKey}&${location}&units=${unit}`)
            .then(res => res.json())
            .then(data => {
                const windSpeedUnit = unit === 'imperial' ? 'miles/hour' : 'metre/sec';
                const tempUnit = unit === 'standard' ? '°K' : (unit === 'metric' ? '°C' : '°F');
                const forecast = data.daily.map(day => {
                    return {
                        date: day.dt,
                        tempMin: Math.round(day.temp.min),
                        tempMax: Math.round(day.temp.max),
                        humidity: day.humidity,
                        main: day.weather[0].main,
                        icon: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
                    }
                }).slice(0, -1);
                return {
                    current: {
                        date: data.current.dt,
                        temperature: Math.round(data.current.temp),
                        tempUnit: tempUnit,
                        icon: `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`,
                        main: data.current.weather[0].main,
                        description: data.current.weather[0].description,
                        windSpeed: `${data.current.wind_speed} ${windSpeedUnit}`,
                        humidity: `${data.current.humidity}%`,
                        precipitation: `${data.daily[0].pop} mm`,
                        clouds: `${data.current.clouds}%`
                    },
                    forecast: forecast
                }
            });
    };
} 

export default Services;