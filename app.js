import { geocode } from "./utils/geocode.js";
import { forecast } from "./utils/forecast.js";

const location = process.argv[2];
if (!location) {
  console.log("Please provide a location.");
} else {
  geocode(location, (err, data) => {
    if (err) {
      return console.log(err);
    }
    forecast(data.latitude, data.longitude, (err, forecastData) => {
      if (err) {
        return console.log(err);
      }
      console.log(data.location);
      console.log(forecastData);
    });
  });
}
