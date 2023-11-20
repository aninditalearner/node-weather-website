const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode.js");
const getWeatherData = require("./utils/weatherInfo.js");

const app = express();
//Setting paths for express config
const pathOfPublicFolder = path.join(__dirname, "../public");
const viewsPathForHbs = path.join(__dirname, "../templates/views");
const partialsPathForHbs = path.join(__dirname, "../templates/partials");

//Setting up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", path.join(viewsPathForHbs));
hbs.registerPartials(partialsPathForHbs);

//Setup static directory location
app.use(express.static(pathOfPublicFolder));

// No longer it is used because of app.use method
// app.get("", (req, res) => {
//   res.send("Hello express");
// });

//This is becuase of hbs templates
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Anindta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Anindita Rakshit",
    message:
      "If you are unable to get the weather data, please try again later and also check you internet connection.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Anindita Rakhit",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter an address",
    });
  }

  geoCode(req.query.address, (error, data) => {
    if (error) {
      res.send({
        error: error,
      });
    } else {
      getWeatherData(data, (error, weatherInfo) => {
        if (error) {
          res.send({
            error: error,
          });
        } else {
          res.send({
            //address: req.query.address,
            location: weatherInfo.locality,
            forecast: `${weatherInfo.description}. It is currently ${
              weatherInfo.actualTemp
            }, but it feels like ${weatherInfo.feelslike} in ${
              weatherInfo.locality ? weatherInfo.locality : req.query.address
            }.`,
          });
        }
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("page_404", {
    title: "404",
    error: "Help article not found",
    name: "Anindita Rakshit",
  });
});

app.get("*", (req, res) => {
  res.render("page_404", {
    title: "404",
    error: "Page not found",
    name: "Anindita Rakshit",
  });
});

app.listen(3000, () => {
  console.log("Server is started!");
});
