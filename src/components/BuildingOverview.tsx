import {
  ArrowRight,
  Building2,
  ChevronRight,
  FileImage,
  Layers,
} from "lucide-react";
import type { CatalogBuilding } from "../data/buildingCatalog";
import { isFloorCountConfirmed } from "../data/buildingCatalog";
import { expectedFloorImageName } from "../data/floorImages";
export default function BuildingOverview({
  building,
  readyFloors,
  onFloor,
  onMaster,
}: {
  building: CatalogBuilding;
  readyFloors: number[];
  onFloor: (number: number) => void;
  onMaster: () => void;
}) {
  return (
    <section
      className="building-overview"
      aria-label={`ภาพรวม ${building.title}`}
    >
      <button className="button secondary back-to-campus" onClick={onMaster}>
        <ArrowRight size={16} className="back-arrow" />
        Back to Master Layout
      </button>
      <div className="building-overview-heading">
        <div className="detail-symbol">
          <Building2 size={28} />
        </div>
        <div>
          <span className="eyebrow">BUILDING OVERVIEW</span>
          <h2>ภาพรวม {building.title}</h2>
          <p>
            {building.floors.length} ชั้น
            {isFloorCountConfirmed(building.id)
              ? " · จำนวนชั้นยืนยันแล้ว"
              : " · จำนวนชั้นที่แจ้งไว้ยังรอยืนยัน"}
          </p>
        </div>
      </div>
      <p className="floor-overview-intro">
        เลือกชั้นเพื่อเปิด Floor Layout · แสดงเฉพาะภาพจริงที่ได้รับ
        ไม่มีแปลนหรือตำแหน่งห้องสมมติ
      </p>
      <div className="floor-overview-grid">
        {building.floors.map((floor) => (
          <button
            className="floor-overview-card"
            key={floor.number}
            aria-label={`เปิด Floor Layout ${building.id} ชั้น ${floor.number}`}
            onClick={() => onFloor(floor.number)}
          >
            <div className="floor-card-top">
              <Layers size={21} />
              <span>F{String(floor.number).padStart(2, "0")}</span>
              <ChevronRight size={18} />
            </div>
            <h3>ชั้น {floor.number}</h3>
            <span
              className={`status ${readyFloors.includes(floor.number) ? "confirmed" : "pending"}`}
            >
              <span />
              {readyFloors.includes(floor.number)
                ? "มีภาพแปลนแล้ว"
                : "รอภาพ Floor Layout จริง"}
            </span>
            <p>
              {floor.status === "confirmed"
                ? "ข้อมูล Layout ยืนยันแล้ว"
                : "ข้อมูล Layout ยังรอการยืนยัน"}
            </p>
            {floor.scope === "building-only" && (
              <small>เฉพาะตัวอาคาร ไม่รวมลานจอดรถ</small>
            )}
            <div className="floor-card-file">
              <FileImage size={14} />
              <span>
                {expectedFloorImageName(building.id, floor.number) ??
                  "รอข้อมูลไฟล์แปลน"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
