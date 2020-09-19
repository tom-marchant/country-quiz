const countriesGeoData = require("../../public/data/countries_geo_minified");
const fs = require('fs');

/* Breaks up monster GeoJSON file with all country features into separate file per feature. */
function generate() {
  countriesGeoData.features.forEach((feature) => {
    const fileName = `${feature.properties.ISO3}.json`;
    fs.writeFile(
        `./public/data/country_features/${fileName}`,
        JSON.stringify(feature, null, '\t'),
        () => console.log(`Generated ${fileName} successfully`)
    );
  });
}

generate();