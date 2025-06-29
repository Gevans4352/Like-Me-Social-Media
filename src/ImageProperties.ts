export interface ImageProperties {
  zoom: number;
  rotation: number;
  croppedAreaPixels: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
}