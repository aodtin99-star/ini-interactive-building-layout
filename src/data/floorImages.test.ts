import { describe, expect, it } from "vitest";
import {
  floorAssetKey,
  bundledFloorImages,
  expectedFloorImageName,
} from "./floorImages";
import { buildings } from "./buildings";
describe("real floor image readiness", () => {
  it("accepts only existing CB/CSB/PB floor targets", () => {
    for (const building of buildings)
      for (const floor of building.floors)
        expect(
          floorAssetKey(
            `/src/assets/floor-layouts/${building.id}-${floor.number}.png`,
          ),
        ).toBe(`${building.id}-${floor.number}`);
    expect(floorAssetKey("/src/assets/floor-layouts/cb-1.JPG")).toBe("CB-1");
    for (const path of [
      "PB-4.png",
      "CB-0.png",
      "CB-5.png",
      "CSB-5.png",
      "FLB-1.png",
      "CB-1.svg",
    ])
      expect(
        floorAssetKey(`/src/assets/floor-layouts/${path}`),
      ).toBeUndefined();
  });
  it("derives required filenames from confirmed floor records, without inventing missing floors", () => {
    expect(expectedFloorImageName("CB", 1)).toBe("CB-1.png");
    expect(expectedFloorImageName("CSB", 4)).toBe("CSB-4.png");
    expect(expectedFloorImageName("PB", 3)).toBe("PB-3.png");
    expect(expectedFloorImageName("PB", 4)).toBeUndefined();
    expect(expectedFloorImageName("FLB", 1)).toBeUndefined();
  });
  it("does not invent any image or modify verified floor metadata", () => {
    expect(bundledFloorImages).toEqual({});
    for (const building of buildings)
      for (const floor of building.floors) {
        expect(floor.image).toBeUndefined();
        expect(floor.areas).toEqual([]);
      }
    expect(
      buildings.find((b) => b.id === "PB")!.floors.map((f) => f.status),
    ).toEqual(["confirmed", "pending", "pending"]);
  });
});
