import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Crosshair,
  Image,
  Info,
  Minus,
  Move,
  Plus,
  RotateCcw,
  Upload,
} from "lucide-react";
import {
  campusLabels,
  campusReference,
  labelPercent,
  campusTypeLabels,
  campusTypeThai,
} from "../data/campusMap";

// Vite includes the unchanged original asset as a data URL in standalone builds.
const originalImages = import.meta.glob<string>(
  "/src/assets/campus-original.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);
const originalImage = Object.values(originalImages)[0];
export default function CampusMap({
  onSelect,
  sessionImage,
  onImageSelected,
}: {
  onSelect: (id: string) => void;
  sessionImage?: string;
  onImageSelected: (image: string) => void;
}) {
  const [failed, setFailed] = useState(false);
  const image = failed ? undefined : (sessionImage ?? originalImage);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showBounds, setShowBounds] = useState(false);
  const [hoveredId, setHoveredId] = useState<string>();
  const [focusedId, setFocusedId] = useState<string>();
  const activeLabel = campusLabels.find(
    (label) => label.id === (hoveredId ?? focusedId),
  );
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const viewport = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const alive = useRef(true);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    px: number;
    py: number;
  } | null>(null);
  const reset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };
  const changeZoom = (amount: number) =>
    setZoom((value) =>
      Math.max(1, Math.min(4, Math.round((value + amount) * 100) / 100)),
    );
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  async function loadOriginal(file?: File) {
    if (!file) return;
    setError("");
    if (
      !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
      file.size > 30 * 1024 * 1024
    ) {
      setError("ใช้ภาพต้นฉบับ PNG, JPG หรือ WebP ขนาดไม่เกิน 30 MB");
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => {
      if (alive.current) setError("ไม่สามารถอ่านไฟล์ภาพได้");
    };
    reader.onload = async () => {
      const url = String(reader.result);
      const candidate = new window.Image();
      candidate.src = url;
      try {
        await candidate.decode();
      } catch {
        if (alive.current) setError("ไม่สามารถเปิดไฟล์ภาพได้");
        return;
      }
      if (!alive.current) return;
      if (
        Math.abs(
          candidate.naturalWidth / candidate.naturalHeight -
            campusReference.width / campusReference.height,
        ) > 0.015
      ) {
        setError(
          "อัตราส่วนภาพไม่ตรงกับภาพอ้างอิง กรุณาใช้แผนผังต้นฉบับครบทั้งภาพโดยไม่ครอป",
        );
        return;
      }
      setFailed(false);
      onImageSelected(url);
      reset();
      setNotice(
        "ใช้ภาพจากอุปกรณ์เฉพาะเซสชันนี้ โปรดตรวจว่าป้ายชื่อและ Hotspot ตรงกับภาพต้นฉบับ",
      );
    };
    reader.readAsDataURL(file);
  }
  return (
    <section className="campus-panel" aria-label="Interactive Campus Map">
      <div className="panel-heading">
        <div>
          <h2>Interactive Campus Map</h2>
          <p>คลิกป้ายชื่ออาคารหรือพื้นที่บนแผนที่เพื่อเปิดรายละเอียด</p>
        </div>
        <button
          className={`button secondary ${showBounds ? "bounds-active" : ""}`}
          aria-pressed={showBounds}
          onClick={() => setShowBounds((v) => !v)}
        >
          <Crosshair size={15} />
          ตรวจตำแหน่ง Hotspot
        </button>
      </div>
      <div
        ref={viewport}
        className="campus-viewport"
        tabIndex={0}
        role="region"
        aria-label="แผนที่ภาพรวม ใช้ปุ่มบวกหรือลบเพื่อซูม ปุ่มลูกศรเพื่อเลื่อน และเลขศูนย์เพื่อรีเซ็ต"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (
            [
              "ArrowLeft",
              "ArrowRight",
              "ArrowUp",
              "ArrowDown",
              "+",
              "=",
              "-",
              "0",
            ].includes(event.key)
          )
            event.preventDefault();
          if (event.key === "+" || event.key === "=") changeZoom(0.25);
          if (event.key === "-") changeZoom(-0.25);
          if (event.key === "0") reset();
          const movement: Record<string, { x: number; y: number }> = {
            ArrowLeft: { x: 40, y: 0 },
            ArrowRight: { x: -40, y: 0 },
            ArrowUp: { x: 0, y: 40 },
            ArrowDown: { x: 0, y: -40 },
          };
          const delta = movement[event.key];
          if (delta)
            setPan((value) => ({ x: value.x + delta.x, y: value.y + delta.y }));
        }}
        onPointerDown={(event) => {
          if (
            !image ||
            event.button !== 0 ||
            (event.target as Element).closest("button")
          )
            return;
          event.currentTarget.setPointerCapture(event.pointerId);
          drag.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            px: pan.x,
            py: pan.y,
          };
        }}
        onPointerMove={(event) => {
          const start = drag.current;
          if (start && start.id === event.pointerId)
            setPan({
              x: start.px + event.clientX - start.x,
              y: start.py + event.clientY - start.y,
            });
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        {image ? (
          <div
            className={`campus-image-frame ${showBounds ? "show-hotspots" : ""}`}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            }}
          >
            <img
              className="campus-image"
              src={image}
              width={campusReference.width}
              height={campusReference.height}
              alt="แผนผังภาพรวมสถาบันนวัตกรรม ปตท. แสดงชื่ออาคาร ถนน บ่อน้ำ และเส้นขอบเขตสีแดง"
              draggable={false}
              onError={() => {
                setError("ไม่สามารถแสดงไฟล์แผนที่ได้ กรุณาเลือกภาพต้นฉบับใหม่");
                setFailed(true);
              }}
            />
            {campusLabels.map((label, index) => (
              <button
                key={label.id}
                className={`campus-hotspot ${label.kind === "building" ? "available" : label.kind}`}
                data-building={label.id}
                style={labelPercent(label.bounds)}
                aria-label={`${campusTypeThai[label.kind]} ${label.name} เปิดรายละเอียด`}
                aria-describedby={
                  activeLabel?.id === label.id
                    ? "campus-active-tooltip"
                    : undefined
                }
                onMouseEnter={() => setHoveredId(label.id)}
                onMouseLeave={() => setHoveredId(undefined)}
                onBlur={() => setFocusedId(undefined)}
                onFocus={(event) => {
                  setFocusedId(label.id);
                  const view = viewport.current?.getBoundingClientRect();
                  const bounds = event.currentTarget.getBoundingClientRect();
                  if (!view) return;
                  const dx =
                    bounds.left < view.left
                      ? view.left - bounds.left + 12
                      : bounds.right > view.right
                        ? view.right - bounds.right - 12
                        : 0;
                  const dy =
                    bounds.top < view.top
                      ? view.top - bounds.top + 35
                      : bounds.bottom > view.bottom
                        ? view.bottom - bounds.bottom - 12
                        : 0;
                  if (dx || dy)
                    setPan((value) => ({ x: value.x + dx, y: value.y + dy }));
                }}
                onClick={() => onSelect(label.id)}
              >
                {showBounds && (
                  <span className="campus-review-number" aria-hidden="true">
                    {index + 1}
                  </span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="campus-missing">
            <div className="placeholder-icon">
              <Image size={30} />
            </div>
            <h3>รอไฟล์แผนผังต้นฉบับ</h3>
            <p>ไม่พบภาพแผนผังต้นฉบับ กรุณาเลือกภาพที่ยืนยันแล้ว</p>
            <p>
              เลือกภาพต้นฉบับครบทั้งภาพโดยไม่ครอป เพื่อให้ป้ายอาคารตรงกับ
              Hotspot
            </p>
            <button
              className="button primary"
              onClick={() => input.current?.click()}
            >
              <Upload size={16} />
              เลือกภาพแผนผังต้นฉบับ
            </button>
          </div>
        )}
      </div>
      <div className="campus-toolbar">
        <div className="campus-hover-caption">
          {activeLabel ? (
            <span
              className="campus-tooltip-dock"
              role="tooltip"
              id="campus-active-tooltip"
            >
              <strong>{activeLabel.name}</strong>
              <small>{campusTypeLabels[activeLabel.kind]}</small>
            </span>
          ) : (
            <span className="campus-pan-hint">
              <Move size={15} />
              ลากเพื่อเลื่อน · Tab เพื่อเลือกอาคาร · Enter เพื่อเปิด
            </span>
          )}
        </div>
        <div className="zoom-controls">
          <button
            aria-label="ย่อแผนที่"
            onClick={() => changeZoom(-0.25)}
            disabled={zoom <= 1}
          >
            <Minus size={17} />
          </button>
          <output aria-label="ระดับซูมแผนที่" aria-live="polite">
            {Math.round(zoom * 100)}%
          </output>
          <button
            aria-label="ขยายแผนที่"
            onClick={() => changeZoom(0.25)}
            disabled={zoom >= 4}
          >
            <Plus size={17} />
          </button>
          <i />
          <button className="reset" onClick={reset}>
            <RotateCcw size={15} />
            Reset view
          </button>
        </div>
      </div>
      <div className="campus-legend">
        <span>
          <Building2 size={15} />
          Building · อาคาร
        </span>
        <span>Facility · ส่วนสนับสนุน</span>
        <span>Area · พื้นที่</span>
        <button className="campus-load" onClick={() => input.current?.click()}>
          <Upload size={13} />
          เลือกภาพต้นฉบับจากเครื่อง
        </button>
      </div>
      {showBounds && (
        <div
          className="campus-review-directory"
          aria-label="รายชื่อจุดตรวจสอบ Hotspot"
        >
          <p>
            ตรวจสอบกรอบหมายเลขบนป้ายต้นฉบับ — Navy: Building · Silver: Facility
            · Slate: Area
          </p>
          <ol>
            {campusLabels.map((label, index) => (
              <li key={label.id}>
                <span>{index + 1}</span>
                <strong>{label.name}</strong>
                <small>{campusTypeLabels[label.kind]}</small>
              </li>
            ))}
          </ol>
        </div>
      )}
      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={(event) => {
          void loadOriginal(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      {error && (
        <p className="campus-feedback error" role="alert">
          {error}
        </p>
      )}
      {notice && (
        <p className="campus-feedback" role="status">
          <Info size={15} />
          {notice}
        </p>
      )}
    </section>
  );
}
