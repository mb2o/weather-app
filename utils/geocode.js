const request = require("request");

const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5vbm1hZXMiLCJhIjoiY2pzcnU3ZGxoMWg5YzQ5bzRkdm13eHhkdCJ9.aTEfrE3MgTfjrafgzY0yCQ`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      cb("Unable to connect to Geocoding services!");
    } else if (body.features.length === 0) {
      cb(`Unable to find location. Try another search.`);
    } else {
      cb(undefined, {
        lon: body.features[0].center[0],
        lat: body.features[0].center[1],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
