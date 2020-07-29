import Countries from "../cache/Countries";

class GameType {
  constructor(name, imageFile, countryFilter) {
    this.name = name;
    this.imageFile = imageFile;
    this.countryFilter = countryFilter;
  }

  getCountries() {
    return Countries.get().filter(this.countryFilter);
  }
}

export const GameTypes = [
  new GameType(
      "The Whole Wide World",
      "world.jpg",
      () => true
  ),
  new GameType(
      "Europe",
      "europe.jpg",
      (country) => country.continentCode === "EU"
  ),
  new GameType(
      "Africa",
      "africa.jpg",
      (country) => country.continentCode === "AF"
  ),
  new GameType(
      "Americas",
      "americas.jpg",
      (country) => country.continentCode === "NA" || country.continentCode === "SA"
  ),
  new GameType(
      "Asia",
      "asia.jpg",
      (country) => country.continentCode === "AS"
  ),
  new GameType(
      "Oceania",
      "oceania.jpg",
      (country) => country.continentCode === "OC"
  ),
];