import { popularAreas as africa } from "../africa/africa";
import { popularAreas as asia } from "../asia/asia";
import { popularAreas as europe } from "../europe/europe";
import { popularAreas as north_america } from "../north-america/north-america";
import { popularAreas as oceania } from "../oceania/oceania";
import { popularAreas as south_america } from "../south-america/south-america";

console.log("Africa:", africa);
console.log("Asia:", asia);
console.log("Europe:", europe);
console.log("North America:", north_america);
console.log("Oceania:", oceania);
console.log("South America:", south_america);

export const popularAreas = [
  ...africa,
  ...asia,
  ...north_america,
  ...south_america,
  ...oceania,
  ...europe,
];
