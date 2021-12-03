import request from "postman-request";

const weatherUrl =
  "http://api.weatherstack.com/current?access_key=a0d8537925a43dfd05640e2ba451dfcc&query=37.8267,-122.4233";

request({ url: weatherUrl, json: true }, (err, response) => {
  if (err) {
    console.log("Unable to connect with the weather service.");
  } else if (response.body.error) {
    console.log("Unable to find the location.");
  } else {
    const temp = response.body.current.temperature;
    const precip = response.body.current.precip;
    const str = `It is currently ${temp} degree out. There is a ${precip}% chance of rain.`;
    console.log(str);
  }
});

const geocode = (address, callback) => {
  const coordinateUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoidml2ZWtzYW5nd2FuIiwiYSI6ImNrd3B5azNxczBob3Uyd3FvOWRxdHV6ZmMifQ.TR6d2AdJuV4m8MnuwLrqaA&limit=1`;
  request({ url: coordinateUrl, json: true }, (err, response) => {
    if (err) {
      callback("Unable to connect to location services.", undefined);
    } else if (response.body.features.length === 0) {
      callback(
        "Unable to find the coordinates for location. Try another search.",
        undefined
      );
    } else {
      const latitude = response.body.features[0].geometry.coordinates[0];
      const longitude = response.body.features[0].geometry.coordinates[1];
      const location = response.body.features[0].place_name;
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: location,
      });
    }
  });
};

geocode("London", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

console.log("Staring");
console.log("Ending");
