import { buildings, floorKey } from "./buildings";

// Real images only. File names identify existing floors; no room geometry is added.
export function expectedFloorImageName(
  id: string,
  number: number,
): string | undefined {
  const building = buildings.find((item) => item.id === id);
  return building?.floors.some((floor) => floor.number === number)
    ? `${id}-${number}.png`
    : undefined;
}

export function floorAssetKey(path: string): string | undefined {
  const match = path.match(/\/([^/]+)-(\d+)\.(png|jpe?g|webp)$/i);
  if (!match) return undefined;
  const building = buildings.find(
    (item) => item.id.toUpperCase() === match[1].toUpperCase(),
  );
  const number = Number(match[2]);
  return building?.floors.some((floor) => floor.number === number)
    ? floorKey(building.id, number)
    : undefined;
}
const assets = import.meta.glob<string>(
  "/src/assets/floor-layouts/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);
export const bundledFloorImages: Record<string, string> = {};
for (const [path, image] of Object.entries(assets)) {
  const key = floorAssetKey(path);
  if (!key) throw new Error(`Unknown floor image filename: ${path}`);
  if (bundledFloorImages[key])
    throw new Error(`Duplicate floor image for ${key}`);
  bundledFloorImages[key] = image;
}
