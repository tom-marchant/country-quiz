const countriesGeoData = require("../../public/data/countries_geo_minified");
const countriesAndContinents = require("./countriesAndContinents");
const fs = require('fs');

function generate() {
  const countriesData = countriesGeoData.features.map((feature) => {
    const continentCode = countriesAndContinents.find(
        (countryAndContinent) =>
            countryAndContinent.Three_Letter_Country_Code === feature.properties.ISO3).Continent_Code;

    return {
      name: feature.properties.NAME,
      isoCode: feature.properties.ISO3,
      continentCode: continentCode
    }
  });

  fs.writeFile(
      './src/data/countries.json',
      JSON.stringify(countriesData, null, '\t'),
      () => console.log("Generated successfully")
  );
}

generate();