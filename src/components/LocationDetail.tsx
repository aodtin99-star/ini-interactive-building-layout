import { ArrowRight, Building2, Info, MapPin, Settings2 } from "lucide-react";
import {
  campusTypeLabels,
  campusTypeThai,
  type CampusLabel,
} from "../data/campusMap";
export default function LocationDetail({
  name,
  kind,
  onBack,
}: {
  name: string;
  kind: CampusLabel["kind"];
  onBack: () => void;
}) {
  const noun = campusTypeThai[kind];
  return (
    <section className="location-detail">
      <button className="button secondary back-to-campus" onClick={onBack}>
        <ArrowRight size={16} className="back-arrow" />
        Back to Master Layout
      </button>
      <div className="location-detail-card">
        <div className="detail-symbol">
          {kind === "area" ? (
            <MapPin size={28} />
          ) : kind === "facility" ? (
            <Settings2 size={28} />
          ) : (
            <Building2 size={28} />
          )}
        </div>
        <span className="eyebrow">
          {campusTypeLabels[kind].toUpperCase()} DETAIL
        </span>
        <h2>{name}</h2>
        <p>รายละเอียด{noun}ที่ระบุบนภาพ Master Layout</p>
        <dl>
          <div>
            <dt>ชื่อ</dt>
            <dd>{name}</dd>
          </div>
          <div>
            <dt>ประเภท</dt>
            <dd>
              {campusTypeLabels[kind]} · {noun}
            </dd>
          </div>
          <div>
            <dt>แหล่งอ้างอิง</dt>
            <dd>แผนผังภาพรวมสถาบันนวัตกรรม ปตท.</dd>
          </div>
        </dl>
        <div className="scope-notice">
          <Info size={17} />
          <span>
            {kind === "building"
              ? "อยู่ระหว่างจัดเตรียมข้อมูล Layout"
              : `อยู่ระหว่างจัดเตรียมข้อมูลรายละเอียด${noun}`}
          </span>
        </div>
        <p className="location-data-note">
          ยังไม่มีข้อมูลเพิ่มเติมที่ยืนยันแล้ว
          จึงไม่ระบุขนาดพื้นที่หรือข้อมูลภายใน
        </p>
      </div>
    </section>
  );
}
