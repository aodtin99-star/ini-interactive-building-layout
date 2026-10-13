export interface Area {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface Floor {
  number: number;
  status: "confirmed" | "pending";
  scope: "building-only" | "floor";
  image?: string;
  areas: Area[];
}
export interface Building {
  id: string;
  title: string;
  subtitle: string;
  floors: Floor[];
}
const floors = (count: number): Floor[] =>
  Array.from({ length: count }, (_, i) => ({
    number: i + 1,
    status: "confirmed",
    scope: "floor",
    areas: [],
  }));
export const buildings: Building[] = [
  { id: "CB", title: "อาคาร CB", subtitle: "CB Building", floors: floors(4) },
  {
    id: "CSB",
    title: "อาคาร CSB",
    subtitle: "CSB Building",
    floors: floors(4),
  },
  {
    id: "PB",
    title: "อาคาร PB",
    subtitle: "PB Building",
    floors: [
      { number: 1, status: "confirmed", scope: "building-only", areas: [] },
      { number: 2, status: "pending", scope: "floor", areas: [] },
      { number: 3, status: "pending", scope: "floor", areas: [] },
    ],
  },
];
export const floorKey = (building: string, floor: number) =>
  `${building}-${floor}`;
export const floorStatus = (floor: Floor, hasImage = Boolean(floor.image)) =>
  hasImage
    ? "มีภาพแปลนแล้ว"
    : floor.status === "pending"
      ? "รอข้อมูล Layout"
      : "รอภาพแปลนจริง";
