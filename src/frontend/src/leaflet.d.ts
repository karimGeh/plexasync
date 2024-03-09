import "leaflet";

declare module "leaflet" {
  export function heatLayer(
    latlngs: Array<[number, number]> | Array<[number, number, number]>,
    options?: HeatMapOptions
  ): Layer;

  interface HeatMapOptions {
    minOpacity?: number;
    maxZoom?: number;
    max?: number;
    radius?: number;
    blur?: number;
    gradient?: { [key: number]: string };
  }
}
