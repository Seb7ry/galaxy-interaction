export interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
  ring: number;
  speedSec?: number;
  sizeScale?: number;
  texture?: "soft" | "banded" | "rings" | "speckle" | "customImg";
  textureImg?: string;
  labelOffset?: number;
  body?: string;
  bullets?: string[];
  images?: string[];
}
