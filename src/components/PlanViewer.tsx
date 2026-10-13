import { useRef, useState } from "react";
import {
  Image,
  Minus,
  Plus,
  RotateCcw,
  Move,
  Maximize,
  Upload,
} from "lucide-react";
import type { Area, Floor } from "../data/buildings";
export default function PlanViewer({
  floor,
  image,
  onArea,
  onImport,
}: {
  floor: Floor;
  image?: string;
  onArea: (area: Area) => void;
  onImport: () => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [failed, setFailed] = useState(false);
  const drag = useRef<{
    x: number;
    y: number;
    px: number;
    py: number;
    moved: boolean;
  } | null>(null);
  const changeZoom = (delta: number) =>
    setZoom((z) =>
      Math.max(0.5, Math.min(3, Math.round((z + delta) * 100) / 100)),
    );
  return (
    <div className="viewer-shell">
      <div
        className="plan-canvas"
        onPointerDown={(e) => {
          if (e.button !== 0 || (e.target as HTMLElement).closest("button"))
            return;
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = {
            x: e.clientX,
            y: e.clientY,
            px: pan.x,
            py: pan.y,
            moved: false,
          };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (d) {
            if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 4)
              d.moved = true;
            setPan({ x: d.px + e.clientX - d.x, y: d.py + e.clientY - d.y });
          }
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onWheel={(e) => {
          if (e.ctrlKey) {
            changeZoom(e.deltaY > 0 ? -0.1 : 0.1);
          }
        }}
      >
        <div className="canvas-tag">
          <span className="dot" />{" "}
          {image ? "ภาพแปลนที่นำเข้า" : "PLACEHOLDER · ยังไม่มีภาพแปลนจริง"}
        </div>
        {image && !failed ? (
          <div
            className="plan-image"
            style={{
              transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`,
            }}
          >
            <img
              src={image}
              alt={`ภาพแปลนจริง ชั้น ${floor.number}`}
              draggable={false}
              onError={() => setFailed(true)}
            />
            {floor.areas.map((area) => (
              <button
                className="area-hotspot"
                key={area.id}
                style={{
                  left: `${area.x}%`,
                  top: `${area.y}%`,
                  width: `${area.width}%`,
                  height: `${area.height}%`,
                }}
                aria-label={`รายละเอียด ${area.name}`}
                onClick={() => onArea(area)}
              >
                {area.name}
              </button>
            ))}
          </div>
        ) : (
          <div
            className="canvas-placeholder"
            style={{
              transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})`,
            }}
          >
            <div className="placeholder-icon">
              <Image size={34} strokeWidth={1.3} />
            </div>
            <span className="eyebrow">
              {floor.status === "pending"
                ? "LAYOUT PENDING"
                : "PLAN IMAGE PENDING"}
            </span>
            <h3>
              {failed
                ? "ไม่สามารถแสดงภาพแปลนได้"
                : floor.status === "pending"
                  ? "รอข้อมูล Layout"
                  : "พื้นที่สำหรับภาพแปลนจริง"}
            </h3>
            <p>
              {floor.status === "pending"
                ? "ยังไม่ได้รับการยืนยันข้อมูล Layout ของชั้นนี้"
                : "ข้อมูลชั้นได้รับการยืนยันแล้ว · ยังไม่ได้อัปโหลดภาพ"}
            </p>
            <p className="placeholder-note">ไม่มีการจำลองแปลนหรือตำแหน่งห้อง</p>
            <button className="button secondary" onClick={onImport}>
              <Upload size={16} />
              นำเข้าภาพแปลน
            </button>
          </div>
        )}
        <div className="canvas-hint">
          <Move size={14} /> ลากเพื่อเลื่อนมุมมอง
        </div>
      </div>
      <div className="viewer-toolbar">
        <span>
          <Move size={15} /> Pan & zoom
        </span>
        <div className="zoom-controls">
          <button
            title="ย่อ"
            aria-label="ย่อ"
            onClick={() => changeZoom(-0.1)}
            disabled={zoom <= 0.5}
          >
            <Minus size={17} />
          </button>
          <output aria-live="polite">{Math.round(zoom * 100)}%</output>
          <button
            title="ขยาย"
            aria-label="ขยาย"
            onClick={() => changeZoom(0.1)}
            disabled={zoom >= 3}
          >
            <Plus size={17} />
          </button>
          <i />
          <button
            className="reset"
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
          >
            <RotateCcw size={15} /> Reset view
          </button>
          <Maximize size={16} />
        </div>
      </div>
    </div>
  );
}
