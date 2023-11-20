const request = require("request");

const geoCode = (address, callback) => {
  const geoURL = `http://api.positionstack.com/v1/forward?access_key=507fe4fee0be2ed4461dd0486f312c61&query=${encodeURIComponent(
    address
  )}`;
  request({ url: geoURL, json: true }, (error, response) => {
    if (error) {
      callback("Geo Coding service not avaialable");
    } else if (response.body.error) {
      //callback(response.body.error.message);
      callback(
        "Unable to find out the weather for this location. Please try again with another location"
      );
    } else {
      //console.log(response.body.data[0]);
      callback(undefined, {
        latitude: response.body.data[0].latitude,
        longitude: response.body.data[0].longitude,
        locality: response.body.data[0].locality,
      });
    }
  });
};

module.exports = geoCode;
