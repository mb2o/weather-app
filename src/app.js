const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("../utils/geocode");
const forecast = require("../utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars egine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weer App",
    name: "Mark Boomaars"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mark Boomaars"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Er is zo weinig tijd dus leef want jij bent vrij",
    name: "Mark Boomaars"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Je moet een locatie opgeven!"
    });
  }

  geocode(req.query.location, (error, { lon, lat, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lon, lat, (error, data) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location: req.query.location,
        place: location,
        forecast: data
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help not found",
    errorMessage: "Uhh Ooooh! Help article not found!",
    name: "Mark Boomaars"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found",
    errorMessage: "Uhh Ooooh! Pagina niet gevonden!",
    name: "Mark Boomaars"
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server luistert op poort ${port}`);
});
