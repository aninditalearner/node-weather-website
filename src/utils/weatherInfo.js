const request = require("request");

const getWeatherData = (coOrdinates, callback) => {
  const locality = coOrdinates.locality;
  const weatherURL = `http://api.weatherstack.com/current?access_key=6fe52c30cf74b467d9919bbf3220e7cb&query=${coOrdinates.latitude},${coOrdinates.longitude}`;
  request({ url: weatherURL, json: true }, (error, response) => {
    if (error) {
      callback("Weather service not available");
    } else if (response.body.error) {
      callback(
        "Unable to find out the weather for this location. Please try again with another location"
      );
    } else {
      const data = {
        description: response.body.current.weather_descriptions[0],
        actualTemp: response.body.current.temperature,
        feelslike: response.body.current.feelslike,
        locality: locality,
      };
      callback(undefined, data);
    }
  });
};

module.exports = getWeatherData;
