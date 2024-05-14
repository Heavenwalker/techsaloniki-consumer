const axios = require('axios');

async function getWeatherData(city, state, country, units) {

    const params = [];
    if (city === null || city === undefined) {
        throw new Error('City is required');
    }
    params.push(`city=${city}`);
    if (state !== null && state !== undefined) params.push(`state=${state}`);
    if (country !== null && country !== undefined) params.push(`country=${country}`);
    if (units !== null && units !== undefined) params.push(`units=${units}`);


    const queryString = params.join('&');
    const response = await axios.get(`http://quarkus-app:8080/openweather/byCity?${queryString}`);
    const data = response.data;

    return {
        location: `${data.name}, ${data.sys.country}`,
        temperature: data.main.temp,
        minTemperature: data.main.temp_min,
        maxTemperature: data.main.temp_max,
        weather: data.weather[0].description,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        visibility: data.visibility,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleString()
    };

}

module.exports = getWeatherData;