const MAPBOX_ACCESS_TOKEN = "";

export default {
  hasAccessToken: Boolean(MAPBOX_ACCESS_TOKEN),

  TILE_LAYER_URL: "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" + MAPBOX_ACCESS_TOKEN,
  TILE_ATTRIBUTION: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, "
    + "<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, "
    + "Imagery &copy; <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  TILE_LAYER_ID: "tmarcho/ckaa467xe1zjj1iqp2puy1r6t"
}