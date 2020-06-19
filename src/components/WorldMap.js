import React, {useEffect, useState} from "react";
import {GeoJSON, Map, TileLayer} from "react-leaflet";
import MapConfig from "../config/MapConfig";
import Countries from "../cache/Countries";

// Credit to https://oramind.com/country-border-highlighting-with-leaflet-js/
// Shapefile compressed/converted to GeoJSON via https://gdal.org/
// ogr2ogr -f GeoJSON countries_geo.json TM_WORLD_BORDERS-0.3.shp -lco WRITE_BBOX=YES -lco COORDINATE_PRECISION=2
// https://gdal.org/drivers/vector/geojson.html

const INITIAL_START_POSITION = [51.505, 0];

export const WorldMap = ({selectedCountryName}) => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  useEffect(() => {
    Countries.getGeoData().then((geoData) => {
      if (selectedCountryName) {
        setSelectedFeature(geoData.find(
            country => country.properties.NAME === selectedCountryName))
      }
    });
  }, [selectedCountryName]);

  let viewport = null, boundingBox = null;

  if (selectedFeature) {
    boundingBox = convertBoundingBoxToLatLngBounds(selectedFeature.bbox);

    viewport = {
      center: [selectedFeature.properties.LAT, selectedFeature.properties.LON],
      zoom: getAppropriateZoomLevel(boundingBox)
    }
  } else {
    viewport = {
      center: INITIAL_START_POSITION,
      zoom: 2
    }
  }

  return <Map center={INITIAL_START_POSITION}
              animate={true}
              duration={1}
              useFlyTo={true}
              zoom={2}
              minZoom={1}
              maxZoom={10}
              viewport={viewport}
              className={"world-map"}>

    { MapConfig.hasAccessToken
        ? <TileLayer
            url={MapConfig.TILE_LAYER_URL}
            attribution={MapConfig.TILE_ATTRIBUTION}
            tileSize={512}
            zoomOffset={-1}
            id={MapConfig.TILE_LAYER_ID}/>
        : null }

    { selectedFeature
        ? <GeoJSON data={selectedFeature}
                   key={selectedFeature.properties.NAME}
                   style={{
                     "weight": 1,
                     "opacity": 0.9
                   }} />
        : null }
  </Map>
};

function getAppropriateZoomLevel(boundingBox) {

  const latDelta = Math.abs((boundingBox[0][0] - boundingBox[1][0]));
  const longDelta = Math.abs((boundingBox[0][1] - boundingBox[1][1]));

  const maxSize = Math.max(latDelta, longDelta).toFixed(1);

  const zoomLevel = 8 - Math.min(Math.max(maxSize,2.0) / 4, 6).toFixed(0);

  console.log("Lat Delta: " + latDelta + ", Long Delta: " + longDelta);
  console.log("Max size was: " + maxSize);
  console.log("Zoom was: " + zoomLevel);

  return zoomLevel;
}

function convertBoundingBoxToLatLngBounds(boundingBox) {
  return [
    [boundingBox[3], boundingBox[2]],
    [boundingBox[1], boundingBox[0]]];
}