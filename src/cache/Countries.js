let countries;

function get() {
  if (countries) {
    return Promise.resolve(countries);
  }

  console.log("Fetching countries...");

  return fetch("data/countries_geo_minified.json")
  .then(response => response.json())
  .then((countriesJson) => {
    console.log("No. of countries: " + countriesJson.features.length);
    countries = countriesJson.features;
    return countries;
  });
}

export default {
  get
};

