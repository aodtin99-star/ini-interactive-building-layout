// Rectangles surround the printed label boxes in the unchanged 1672 × 941 PNG.
// They are label hit areas, not building footprints or room coordinates.
// Obtain the user's numbered screenshot review before committing.
export const campusReference = { width: 1672, height: 941 } as const;
export interface CampusLabel {
  id: string;
  name: string;
  kind: "building" | "facility" | "area";
  bounds: { x: number; y: number; width: number; height: number };
}
const label = (
  name: string,
  kind: CampusLabel["kind"],
  x: number,
  y: number,
  width: number,
  height: number,
): CampusLabel => ({
  id: name,
  name,
  kind,
  bounds: { x, y, width, height },
});
// Ordered to match the user's requested review list. Numbers are index + 1.
export const campusLabels: CampusLabel[] = [
  label("PB", "building", 239, 253, 62, 33),
  label("UB", "building", 37, 302, 65, 33),
  label("ALB", "building", 129, 304, 76, 33),
  label("CSB", "building", 274, 327, 70, 33),
  label("CB", "building", 414, 318, 60, 33),
  label("FLB", "building", 300, 397, 66, 33),
  label("TCB", "building", 633, 328, 62, 32),
  label("LSB", "building", 225, 543, 68, 34),
  label("EAL", "building", 979, 708, 62, 32),
  label("BPU", "building", 283, 756, 70, 31),
  label("FUES", "building", 164, 620, 73, 32),
  label("Chemical Blending", "facility", 107, 499, 99, 50),
  label("Fuel Blending", "facility", 188, 359, 65, 38),
  label("SUB 115 KV", "facility", 37, 523, 55, 39),
  label("Gas Mixing", "facility", 851, 704, 72, 43),
  label("Waste Storage", "facility", 66, 147, 66, 40),
  label("Parking", "facility", 384, 534, 87, 30),
  label("GH", "building", 1185, 544, 41, 26),
  label("POND 1", "area", 842, 448, 93, 30),
  label("POND 2", "area", 1096, 361, 95, 29),
  label("POND 3", "area", 1027, 187, 99, 30),
];
export const campusLabelById = (id: string | null) =>
  campusLabels.find((label) => label.id === id);
export const labelPercent = (bounds: CampusLabel["bounds"]) => ({
  left: `${(bounds.x / campusReference.width) * 100}%`,
  top: `${(bounds.y / campusReference.height) * 100}%`,
  width: `${(bounds.width / campusReference.width) * 100}%`,
  height: `${(bounds.height / campusReference.height) * 100}%`,
});

export const campusTypeLabels = {
  building: "Building",
  facility: "Facility",
  area: "Area",
} as const;
export const campusTypeThai = {
  building: "อาคาร",
  facility: "ส่วนสนับสนุน",
  area: "พื้นที่",
} as const;
