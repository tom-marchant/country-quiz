import countries from "../data/countries"

let countriesGeoData;

function get() {
  return countries;
}

function getGeoData() {
  if (countriesGeoData) {
    return Promise.resolve(countriesGeoData);
  }

  console.log("Fetching country polyline data...");

  return fetch("data/countries_geo_minified.json")
  .then(response => response.json())
  .then(json => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(json), 300);
    })
  })
  .then((countriesJson) => {
    countriesGeoData = countriesJson.features;
    return countriesGeoData;
  });
}

export default {
  get,
  getGeoData
};

