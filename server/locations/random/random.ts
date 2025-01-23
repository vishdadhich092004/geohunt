import { popularAreas as africa } from "../africa/africa";
import { popularAreas as asia } from "../asia/asia";
import { popularAreas as europe } from "../europe/europe";
import { popularAreas as north_america } from "../north-america/north-america";
import { popularAreas as oceania } from "../oceania/oceania";
import { popularAreas as south_america } from "../south-america/south-america";

export interface PopularAreasMap {
  africa: PopularAreaEntry[];
  asia: PopularAreaEntry[];
  oceania: PopularAreaEntry[];
  europe: PopularAreaEntry[];
  north_america: PopularAreaEntry[];
  south_america: PopularAreaEntry[];
}

export interface PopularAreaEntry {
  country: string;
  areas: {
    minLat: number;
    minLon: number;
    maxLat: number;
    maxLon: number;
  }[];
}

export const popularAreas: PopularAreasMap = {
  africa: africa,
  asia: asia,
  oceania: oceania,
  europe: europe,
  north_america: north_america,
  south_america: south_america,
};
