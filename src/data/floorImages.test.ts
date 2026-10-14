import { describe, expect, it } from "vitest";
import {
  floorAssetKey,
  bundledFloorImages,
  expectedFloorImageName,
  activeFloorRevisions,
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
    expect(Object.keys(bundledFloorImages)).toEqual(["CB-1", "CB-2", "CB-3", "CB-4", "CSB-1", "CSB-2", "CSB-3", "CSB-4", "PB-1", "PB-2", "PB-3"]);
    expect(bundledFloorImages["CB-1"]).toBeTruthy();
    expect(bundledFloorImages["CB-2"]).toBeTruthy();
    expect(bundledFloorImages["CB-3"]).toBeTruthy();
    expect(bundledFloorImages["CB-4"]).toBeTruthy();
    expect(bundledFloorImages["CSB-1"]).toBeTruthy();
    expect(bundledFloorImages["CSB-2"]).toBeTruthy();
    expect(bundledFloorImages["CSB-3"]).toBeTruthy();
    expect(bundledFloorImages["CSB-4"]).toBeTruthy();
    expect(bundledFloorImages["PB-1"]).toBeTruthy();
    expect(bundledFloorImages["PB-2"]).toBeTruthy();
    expect(bundledFloorImages["PB-3"]).toBeTruthy();
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


describe("floor revision selection", () => {
  it("replaces only PB floors 1 through 3 while retaining original floor metadata", () => {
    expect(activeFloorRevisions).toEqual({ "PB-1": "/src/assets/floor-layout-revisions/PB-1-v2.png", "PB-2": "/src/assets/floor-layout-revisions/PB-2-v2.png", "PB-3": "/src/assets/floor-layout-revisions/PB-3-v2.png" });
    expect(bundledFloorImages["PB-1"]).toContain("PB-1-v2.png");
    expect(bundledFloorImages["PB-2"]).toContain("PB-2-v2.png");
    expect(buildings.find(b => b.id === "PB")!.floors.map(f => f.status)).toEqual(["confirmed", "pending", "pending"]);
  });
});
