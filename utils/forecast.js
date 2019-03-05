const request = require("request");

const forecast = (lon, lat, cb) => {
  const url = `https://api.darksky.net/forecast/b8f3d524aac5782bb45d8c381446606b/${lat},${lon}?lang=nl&units=ca&exclude=hourly,flags`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      cb("Geen verbinding met de Darksky servers!");
    } else if (body.error) {
      cb(body.error);
    } else {
      cb(
        undefined,
        `${body.daily.data[0].summary}\nHet is momenteel ${
          body.currently.temperature
        } graden buiten.\nDe kans op regen is ${body.currently
          .precipProbability * 100}%.`
      );
    }
  });
};

module.exports = forecast;
