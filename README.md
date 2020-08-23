# Country Quiz

Test and improve your terrible geography skills.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Credits

* GeoJSON country highlighting heavily inspired by https://oramind.com/country-border-highlighting-with-leaflet-js/
* World borders dataset http://thematicmapping.org/downloads/world_borders.php
* Shapefile -> GeoJSON conversion via GDAL package http://www.gdal.org/
* Country -> Continent data taken from https://datahub.io/JohnSnowLabs/country-and-continent-codes-list

## TODO

- Deal with long country names in option buttons
- Improve zoom level resolver on mobile screen
- Add map style selector in menu
- Add close button to drawer menu
- Use sticky header for drawer menu
- Break up GeoJSON into separate files

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.