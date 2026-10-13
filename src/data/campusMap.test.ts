import { describe, expect, it } from "vitest";
import {
  campusLabels,
  campusReference,
  labelPercent,
  campusLabelById,
} from "./campusMap";
import { buildings as original } from "./buildings";
import {
  buildings,
  additionalFloorCounts,
  confirmedBuildings,
  confirmedFloors,
  isFloorCountConfirmed,
} from "./buildingCatalog";
import verifiedPositions from "../../tests/fixtures/verified-hotspots.json";
describe("campus hotspots and destinations", () => {
  it("covers exactly the 21 printed labels requested, without duplicate destinations", () => {
    expect(campusLabels.map((label) => label.name)).toEqual([
      "PB",
      "UB",
      "ALB",
      "CSB",
      "CB",
      "FLB",
      "TCB",
      "LSB",
      "EAL",
      "BPU",
      "FUES",
      "Chemical Blending",
      "Fuel Blending",
      "SUB 115 KV",
      "Gas Mixing",
      "Waste Storage",
      "Parking",
      "GH",
      "POND 1",
      "POND 2",
      "POND 3",
    ]);
    expect(new Set(campusLabels.map((label) => label.id)).size).toBe(21);
    for (const label of campusLabels)
      expect(campusLabelById(label.id)).toBe(label);
    expect(campusLabelById(null)).toBeUndefined();
  });
  it("distinguishes Building, Facility and Area without inventing counts for Gas Mixing or ponds", () => {
    expect(campusLabels.filter((l) => l.kind === "building")).toHaveLength(12);
    expect(
      campusLabels.filter((l) => l.kind === "facility").map((l) => l.id),
    ).toEqual([
      "Chemical Blending",
      "Fuel Blending",
      "SUB 115 KV",
      "Gas Mixing",
      "Waste Storage",
      "Parking",
    ]);
    expect(
      campusLabels.filter((l) => l.kind === "area").map((l) => l.id),
    ).toEqual(["POND 1", "POND 2", "POND 3"]);
    for (const label of campusLabels) {
      if (label.kind === "area" || label.id === "Gas Mixing")
        expect(buildings.find((b) => b.id === label.id)).toBeUndefined();
      else expect(buildings.find((b) => b.id === label.id)).toBeDefined();
    }
  });
  it("counts only the confirmed CB/CSB/PB records in KPIs", () => {
    expect(confirmedBuildings.map((b) => [b.id, b.floors.length])).toEqual([
      ["CB", 4],
      ["CSB", 4],
      ["PB", 3],
    ]);
    expect(confirmedFloors).toHaveLength(11);
    expect(
      confirmedFloors.filter((f) => f.status === "confirmed"),
    ).toHaveLength(9);
    expect(confirmedFloors.filter((f) => f.status === "pending")).toHaveLength(
      2,
    );
    for (const id of Object.keys(additionalFloorCounts))
      expect(isFloorCountConfirmed(id)).toBe(false);
  });
  it("preserves every visually reviewed hotspot coordinate exactly", () => {
    expect(campusLabels.map(({ id, bounds }) => ({ id, bounds }))).toEqual(
      verifiedPositions,
    );
  });
  it("retains the original verified CB/CSB/PB data and uses only user-supplied new floor counts", () => {
    for (const building of original)
      expect(buildings.find((b) => b.id === building.id)).toBe(building);
    expect(buildings.length).toBe(17);
    for (const [id, count] of Object.entries(additionalFloorCounts)) {
      const building = buildings.find((b) => b.id === id)!;
      expect(building.floors.map((f) => f.number)).toEqual(
        Array.from({ length: count }, (_, i) => i + 1),
      );
      expect(building.awaitingLayout).toBe(true);
      for (const floor of building.floors) {
        expect(floor.status).toBe("pending");
        expect(floor.image).toBeUndefined();
        expect(floor.areas).toEqual([]);
      }
    }
    expect(Object.entries(additionalFloorCounts)).toEqual([
      ["FLB", 4],
      ["ALB", 2],
      ["UB", 2],
      ["TCB", 4],
      ["LSB", 4],
      ["FUES", 4],
      ["EAL", 4],
      ["Fuel Blending", 1],
      ["Chemical Blending", 2],
      ["SUB 115 KV", 1],
      ["Waste Storage", 1],
      ["Parking", 1],
      ["GH", 1],
      ["BPU", 1],
    ]);
  });
  it("keeps all label rectangles inside the original image and independently clickable without overlap", () => {
    for (const { bounds } of campusLabels) {
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.y).toBeGreaterThanOrEqual(0);
      expect(bounds.width).toBeGreaterThan(0);
      expect(bounds.height).toBeGreaterThan(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(
        campusReference.width,
      );
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(
        campusReference.height,
      );
      const percent = labelPercent(bounds);
      expect(
        (parseFloat(percent.left) * campusReference.width) / 100,
      ).toBeCloseTo(bounds.x);
      expect(
        (parseFloat(percent.top) * campusReference.height) / 100,
      ).toBeCloseTo(bounds.y);
    }
    for (let i = 0; i < campusLabels.length; i++)
      for (let j = i + 1; j < campusLabels.length; j++) {
        const a = campusLabels[i].bounds,
          b = campusLabels[j].bounds;
        expect(
          a.x + a.width <= b.x ||
            b.x + b.width <= a.x ||
            a.y + a.height <= b.y ||
            b.y + b.height <= a.y,
        ).toBe(true);
      }
  });
});
