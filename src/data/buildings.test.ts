import { describe, expect, it } from "vitest";
import { buildings, floorKey, floorStatus } from "./buildings";
describe("verified building dataset", () => {
  it("has exactly 4 CB floors, 4 CSB floors and 3 PB floors", () => {
    expect(buildings.map((b) => [b.id, b.floors.length])).toEqual([
      ["CB", 4],
      ["CSB", 4],
      ["PB", 3],
    ]);
    expect(
      new Set(
        buildings.flatMap((b) => b.floors.map((f) => floorKey(b.id, f.number))),
      ).size,
    ).toBe(11);
  });
  it("contains no fabricated images or room locations", () => {
    for (const b of buildings)
      for (const f of b.floors) {
        expect(f.image).toBeUndefined();
        expect(f.areas).toEqual([]);
      }
  });
  it("keeps PB ground floor building-only and upper floors pending", () => {
    const pb = buildings.find((b) => b.id === "PB")!;
    expect(pb.floors[0].scope).toBe("building-only");
    expect(pb.floors.map((f) => f.status)).toEqual([
      "confirmed",
      "pending",
      "pending",
    ]);
    expect(floorStatus(pb.floors[1])).toBe("รอข้อมูล Layout");
    expect(pb.floors[1].status).toBe("pending");
    expect(floorStatus(pb.floors[1], true)).toBe("มีภาพแปลนแล้ว");
  });
  it("marks CB and CSB as confirmed while awaiting real images", () => {
    for (const b of buildings.slice(0, 2))
      for (const f of b.floors) {
        expect(f.status).toBe("confirmed");
        expect(floorStatus(f)).toBe("รอภาพแปลนจริง");
      }
  });
});
