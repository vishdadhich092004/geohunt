export const defaultCenter = {
  lat: 20.5,
  lng: 78.9,
};

export const defaultMapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  minZoom: 2,
  maxZoom: 24,
  restriction: {
    latLngBounds: {
      north: 85,
      south: -85,
      west: -180,
      east: 180,
    },
    strictBounds: true,
  },
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }, { color: "#3e606f" }, { weight: 2 }],
    },
  ],
};
