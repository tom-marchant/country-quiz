import countries from "../data/countries"

let countriesGeoData;

function get() {
  return countries;
}

function getAllGeoData() {
  if (countriesGeoData) {
    return Promise.resolve(countriesGeoData);
  }

  console.log("Fetching polyline data for all countries...");

  return fetch("data/countries_geo_minified.json")
  .then(response => response.json())
  .then((countriesJson) => {
    countriesGeoData = countriesJson.features;
    return countriesGeoData;
  });
}

function getGeoData(countryIsoCode) {
  return fetch(`data/country_features/${countryIsoCode}.json`)
  .then(response => response.json())
  .then(json => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(json), 2000);
    })
  })
}

export default {
  get,
  getAllGeoData,
  getGeoData
};

