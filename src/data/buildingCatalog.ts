import {
  buildings as verifiedBuildings,
  type Building,
  type Floor,
} from "./buildings";

export interface CatalogBuilding extends Building {
  awaitingLayout?: boolean;
}
// Floor counts explicitly supplied by the user. No floor plans or room positions
// have been supplied for these buildings; every new floor remains pending.
export const additionalFloorCounts = {
  FLB: 4,
  ALB: 2,
  UB: 2,
  TCB: 4,
  LSB: 4,
  FUES: 4,
  EAL: 4,
  "Fuel Blending": 1,
  "Chemical Blending": 2,
  "SUB 115 KV": 1,
  "Waste Storage": 1,
  Parking: 1,
  GH: 1,
  BPU: 1,
} as const;
export const buildings: CatalogBuilding[] = [
  ...verifiedBuildings,
  ...Object.entries(additionalFloorCounts).map(([id, count]) => ({
    id,
    title: id.length <= 4 ? `อาคาร ${id}` : id,
    subtitle: id,
    awaitingLayout: true,
    floors: Array.from({ length: count }, (_, index): Floor => ({
      number: index + 1,
      status: "pending",
      scope: "floor",
      areas: [],
    })),
  })),
];

// Only CB/CSB/PB have confirmed building and floor-count records.
// Counts in additionalFloorCounts were supplied earlier, but remain excluded
// from confirmed KPIs pending the user's explicit data confirmation.
export const confirmedBuildings = verifiedBuildings;
export const isFloorCountConfirmed = (id: string) =>
  confirmedBuildings.some((building) => building.id === id);
export const confirmedFloors = confirmedBuildings.flatMap(
  (building) => building.floors,
);
