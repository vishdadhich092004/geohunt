import { popularAreas as africa } from "../africa/africa";
import { popularAreas as asia } from "../asia/asia";
import { popularAreas as europe } from "../europe/europe";
import { popularAreas as north_america } from "../north-america/north-america";
import { popularAreas as oceania } from "../oceania/oceania";
import { popularAreas as south_america } from "../south-america/south-america";

// Instead of concatenating arrays, we'll create a single array that includes
// locations from all continents
export const popularAreas = [
  ...africa,
  ...asia,
  ...europe,
  ...north_america,
  ...oceania,
  ...south_america,
];
