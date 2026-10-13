import { useEffect, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  FileImage,
  Grid2X2,
  Info,
  Layers,
  Map,
  Search,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { buildings, floorKey, floorStatus, type Area } from "./data/buildings";
import PlanViewer from "./components/PlanViewer";
export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [floorNumber, setFloorNumber] = useState(1);
  const [images, setImages] = useState<Record<string, string>>({});
  const [importing, setImporting] = useState(false);
  const [help, setHelp] = useState(false);
  const [area, setArea] = useState<Area | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const urls = useRef<string[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const building = buildings.find((b) => b.id === selected);
  const floor = building?.floors.find((f) => f.number === floorNumber);
  const key = building && floor ? floorKey(building.id, floor.number) : "";
  const image = images[key] ?? floor?.image;
  const allFloors = buildings.flatMap((b) => b.floors);
  const visibleAreas = images[key] ? [] : (floor?.areas ?? []);
  const uploaded = buildings.reduce(
    (n, b) =>
      n +
      b.floors.filter((f) => images[floorKey(b.id, f.number)] || f.image)
        .length,
    0,
  );
  const openBuilding = (id: string) => {
    setSelected(id);
    setFloorNumber(1);
    setArea(null);
    setQuery("");
  };
  useEffect(() => () => urls.current.forEach(URL.revokeObjectURL), []);
  useEffect(() => {
    if (importing || help) {
      dialog.current?.showModal();
    } else dialog.current?.close();
  }, [importing, help]);
  const closeModal = () => {
    setImporting(false);
    setHelp(false);
    setError("");
    setConfirmed(false);
  };
  const openImport = () => {
    setError("");
    setConfirmed(false);
    setImporting(true);
  };
  async function upload(file?: File) {
    if (!file || !building || !floor) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("รองรับเฉพาะไฟล์ PNG, JPG และ WebP");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("ไฟล์ต้องมีขนาดไม่เกิน 20 MB");
      return;
    }
    if (building.id === "PB" && floor.number === 1 && !confirmed) {
      setError("กรุณายืนยันว่าภาพไม่รวมลานจอดรถ");
      return;
    }
    const url = URL.createObjectURL(file);
    const decoded = new window.Image();
    decoded.src = url;
    try {
      await decoded.decode();
    } catch {
      URL.revokeObjectURL(url);
      setError("ไฟล์ภาพเสียหายหรือไม่สามารถเปิดได้");
      return;
    }
    urls.current.push(url);
    setImages((old) => ({ ...old, [key]: url }));
    closeModal();
  }
  return (
    <div className="app">
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSelected(null);
          }}
        >
          <div className="brand-mark">
            InI
            <span />
          </div>
          <div>
            <strong>INNOVATION INSTITUTE</strong>
            <small>สถาบันนวัตกรรม ปตท.</small>
          </div>
        </a>
        <div className="workspace-label">
          WORKSPACE <span>01</span>
        </div>
        <button
          className={`nav-item ${!selected ? "active" : ""}`}
          onClick={() => {
            setSelected(null);
            setArea(null);
          }}
        >
          <Grid2X2 size={19} />
          Master Layout
          <ChevronRight size={15} />
        </button>
        <div className="sidebar-label">อาคาร / BUILDINGS</div>
        <nav aria-label="เลือกอาคาร">
          {buildings.map((b) => (
            <button
              key={b.id}
              className={`nav-item building-nav ${selected === b.id ? "active" : ""}`}
              onClick={() => openBuilding(b.id)}
            >
              <Building2 size={19} />
              <span>
                อาคาร {b.id}
                <small>{b.floors.length} ชั้น</small>
              </span>
              <ChevronRight size={15} />
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="system-card">
            <span className="system-dot" /> Building layout system
            <small>ข้อมูลพื้นที่จากแปลนที่ยืนยันแล้ว</small>
          </div>
          <button className="help-link" onClick={() => setHelp(true)}>
            <CircleHelp size={18} />
            คู่มือการใช้งาน
            <ArrowRight size={15} />
          </button>
          <div className="sidebar-footer">
            PTT Innovation Institute<span>INTERNAL WORKSPACE · V1.0</span>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            Workspace
            <ChevronRight size={14} />
            <span>{building ? `อาคาร ${building.id}` : "Master Layout"}</span>
          </div>
          <div className="header-actions">
            <span className="internal-badge">
              <ShieldCheck size={14} />
              Internal workspace
            </span>
            <span className="language">
              TH <ChevronDown size={13} />
            </span>
            <div className="avatar">InI</div>
          </div>
        </header>
        <main>
          <div className="page-heading">
            <div>
              <div className="eyebrow">INI INTERACTIVE BUILDING LAYOUT</div>
              <h1>
                {building ? `อาคาร ${building.id}` : "Master Layout"}
                <span className="title-dot">.</span>
              </h1>
              <p>
                {building
                  ? "สำรวจแปลนรายชั้นและรายละเอียดพื้นที่ภายในอาคาร"
                  : "ภาพรวมอาคารและสถานะข้อมูลพื้นที่ สถาบันนวัตกรรม ปตท."}
              </p>
            </div>
            <button className="button secondary" onClick={() => setHelp(true)}>
              <CircleHelp size={16} />
              วิธีใช้งาน
            </button>
          </div>
          <div className="stats-grid">
            <div className="stat">
              <div>
                <span>อาคารทั้งหมด</span>
                <strong>
                  {String(buildings.length).padStart(2, "0")}
                  <small>อาคาร</small>
                </strong>
              </div>
              <Building2 />
            </div>
            <div className="stat">
              <div>
                <span>ชั้นทั้งหมด</span>
                <strong>
                  {String(allFloors.length).padStart(2, "0")}
                  <small>ชั้น</small>
                </strong>
              </div>
              <Layers />
            </div>
            <div className="stat">
              <div>
                <span>ข้อมูล Layout ยืนยันแล้ว</span>
                <strong>
                  {String(
                    allFloors.filter((f) => f.status === "confirmed").length,
                  ).padStart(2, "0")}
                  <small>ชั้น</small>
                </strong>
              </div>
              <ShieldCheck />
            </div>
            <div className="stat">
              <div>
                <span>ภาพแปลนที่พร้อมแสดง</span>
                <strong>
                  {String(uploaded).padStart(2, "0")}
                  <small>/ {allFloors.length} ชั้น</small>
                </strong>
              </div>
              <FileImage />
            </div>
          </div>
          {!building ? (
            <>
              <section className="section-heading">
                <div>
                  <h2>
                    สำรวจอาคาร <span>BUILDING DIRECTORY</span>
                  </h2>
                  <p>เลือกอาคารเพื่อดูข้อมูลและแปลนแต่ละชั้น</p>
                </div>
                <span className="subtle">
                  <Grid2X2 size={15} />
                  {buildings.length} อาคาร
                </span>
              </section>
              <div className="building-grid">
                {buildings.map((b, index) => (
                  <button
                    className="building-card"
                    key={b.id}
                    onClick={() => openBuilding(b.id)}
                  >
                    <div className={`building-art art-${index}`}>
                      <span className="card-index">
                        0{index + 1} / BUILDING
                      </span>
                      <Building2 size={75} strokeWidth={0.85} />
                      <span className="art-code">{b.id}</span>
                      <div className="floor-badge">
                        <Layers size={13} />
                        {b.floors.length} FLOORS
                      </div>
                    </div>
                    <div className="building-card-body">
                      <div className="card-heading">
                        <div>
                          <h3>{b.title}</h3>
                          <span>{b.subtitle}</span>
                        </div>
                        <div className="arrow-circle">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                      <div className="card-divider" />
                      <div className="card-status">
                        <span
                          className={`status ${b.floors.some((f) => f.status === "pending") ? "pending" : "confirmed"}`}
                        >
                          <span />
                          {b.floors.every((f) => f.status === "confirmed")
                            ? "ยืนยันข้อมูล Layout แล้ว"
                            : b.floors.every((f) => f.status === "pending")
                              ? "รอข้อมูล Layout"
                              : "ยืนยันบางชั้น"}
                        </span>
                      </div>
                      <p>
                        {
                          b.floors.filter((f) => f.status === "confirmed")
                            .length
                        }{" "}
                        ชั้นยืนยันแล้ว ·{" "}
                        {b.floors.filter((f) => f.status === "pending").length >
                        0
                          ? `${b.floors.filter((f) => f.status === "pending").length} ชั้นรอข้อมูล`
                          : "รอภาพแปลนจริง"}
                      </p>
                      <div className="floor-mini">
                        {b.floors.map((f) => (
                          <span
                            key={f.number}
                            className={
                              f.status === "pending" ? "pending-floor" : ""
                            }
                          >
                            F{f.number}
                            <span className="dot" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="overview-note">
                <div className="note-icon">
                  <Map size={23} />
                </div>
                <div>
                  <h3>ภาพรวมที่อ้างอิงข้อมูลจริง</h3>
                  <p>
                    การ์ดด้านบนเป็นรายการอาคาร ไม่ได้แสดงตำแหน่ง ขนาด
                    หรือระยะห่างจริงของอาคาร
                  </p>
                </div>
                <span className="outline-badge">NO SIMULATED LAYOUT</span>
              </div>
              <section className="status-section">
                <div className="section-heading">
                  <div>
                    <h2>สถานะความพร้อมของข้อมูล</h2>
                    <p>ติดตามข้อมูลแปลนก่อนเริ่มสำรวจพื้นที่</p>
                  </div>
                  <span className="subtle">DATA READINESS</span>
                </div>
                <div className="readiness-row">
                  <div>
                    <span className="legend-dot green" />
                    <strong>ยืนยันข้อมูล Layout</strong>
                    <small>
                      {allFloors.filter((f) => f.status === "confirmed").length}{" "}
                      ชั้น
                    </small>
                  </div>
                  <div>
                    <span className="legend-dot amber" />
                    <strong>รอข้อมูล Layout</strong>
                    <small>
                      {allFloors.filter((f) => f.status === "pending").length}{" "}
                      ชั้น
                    </small>
                  </div>
                  <div>
                    <span className="legend-dot silver" />
                    <strong>รอภาพแปลนจริง</strong>
                    <small>{allFloors.length - uploaded} ชั้น</small>
                  </div>
                </div>
              </section>
            </>
          ) : (
            floor && (
              <>
                <div className="floor-section">
                  <div>
                    <h2>
                      แปลนอาคาร{" "}
                      <span>
                        {building.id} / FLOOR{" "}
                        {floor.number.toString().padStart(2, "0")}
                      </span>
                    </h2>
                    <p>เลือกชั้นที่ต้องการสำรวจ</p>
                  </div>
                  <button className="button primary" onClick={openImport}>
                    <Upload size={16} />
                    นำเข้าภาพแปลน
                  </button>
                </div>
                <div
                  className="floor-tabs"
                  role="tablist"
                  aria-label="เลือกชั้น"
                >
                  {building.floors.map((f) => (
                    <button
                      role="tab"
                      aria-selected={floorNumber === f.number}
                      className={floorNumber === f.number ? "selected" : ""}
                      key={f.number}
                      onClick={() => {
                        setFloorNumber(f.number);
                        setArea(null);
                        setQuery("");
                      }}
                    >
                      <Layers size={16} />
                      ชั้น {f.number}
                      <span
                        className={`dot ${f.status === "pending" ? "amber" : ""}`}
                      />
                    </button>
                  ))}
                </div>
                <div className="layout-grid">
                  <section className="plan-panel">
                    <div className="panel-heading">
                      <h3>
                        อาคาร {building.id} · ชั้น {floor.number}
                      </h3>
                      <span
                        className={`status ${floor.status === "pending" && !image ? "pending" : "confirmed"}`}
                      >
                        <span />
                        {floorStatus(floor, Boolean(image))}
                      </span>
                    </div>
                    <PlanViewer
                      key={`${key}-${image ?? ""}`}
                      floor={{ ...floor, areas: visibleAreas }}
                      image={image}
                      onArea={setArea}
                      onImport={openImport}
                    />
                  </section>
                  <aside className="details-panel">
                    <div className="panel-heading">
                      <h3>รายละเอียดพื้นที่</h3>
                      <Info size={17} />
                    </div>
                    <div className="details-body">
                      {area ? (
                        <>
                          <span className="eyebrow">AREA DETAILS</span>
                          <h3>{area.name}</h3>
                          <p>{area.description}</p>
                          <button
                            className="button secondary"
                            onClick={() => setArea(null)}
                          >
                            กลับไปข้อมูลชั้น
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="detail-symbol">
                            <Building2 size={27} />
                          </div>
                          <h3>
                            อาคาร {building.id} · ชั้น {floor.number}
                          </h3>
                          <p>ข้อมูลอาคารและสถานะแปลน</p>
                          <dl>
                            <div>
                              <dt>อาคาร</dt>
                              <dd>{building.id}</dd>
                            </div>
                            <div>
                              <dt>ชั้น</dt>
                              <dd>
                                {floor.number} / {building.floors.length}
                              </dd>
                            </div>
                            <div>
                              <dt>ข้อมูล Layout</dt>
                              <dd>
                                {floor.status === "confirmed"
                                  ? "ยืนยันแล้ว"
                                  : "รอข้อมูล"}
                              </dd>
                            </div>
                            <div>
                              <dt>ภาพแปลน</dt>
                              <dd>
                                {image ? "นำเข้าแล้ว" : "ยังไม่ได้อัปโหลด"}
                              </dd>
                            </div>
                          </dl>
                          {floor.scope === "building-only" && (
                            <div className="scope-notice">
                              <Info size={16} />
                              <span>
                                แสดงเฉพาะตัวอาคาร
                                <br />
                                ไม่รวมพื้นที่ลานจอดรถ
                              </span>
                            </div>
                          )}
                          <div className="area-list">
                            <h4>
                              พื้นที่ภายในชั้น{" "}
                              <span>{image ? visibleAreas.length : 0}</span>
                            </h4>
                            {image && visibleAreas.length > 0 ? (
                              <>
                                <label className="area-search">
                                  <Search size={14} />
                                  <input
                                    placeholder="ค้นหาพื้นที่"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                  />
                                </label>
                                {visibleAreas
                                  .filter((a) => a.name.includes(query))
                                  .map((a) => (
                                    <button
                                      key={a.id}
                                      onClick={() => setArea(a)}
                                    >
                                      {a.name}
                                      <ChevronRight size={14} />
                                    </button>
                                  ))}
                                {!visibleAreas.some((a) =>
                                  a.name.includes(query),
                                ) && <p>ไม่พบพื้นที่ที่ค้นหา</p>}
                              </>
                            ) : (
                              <p>
                                ยังไม่มีข้อมูลตำแหน่งห้องหรือพื้นที่
                                <br />
                                จะแสดงเมื่อได้รับข้อมูลที่ยืนยันแล้ว
                              </p>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </aside>
                </div>
                <div className="inline-note">
                  <Info size={16} />
                  {images[key]
                    ? "ภาพที่นำเข้าใช้แสดงตัวอย่างในเซสชันนี้เท่านั้น รีเฟรชหน้าแล้วจะต้องนำเข้าใหม่"
                    : image
                      ? "แสดงภาพแปลนจากข้อมูลอาคาร พื้นที่คลิกได้เฉพาะตำแหน่งที่ยืนยันแล้ว"
                      : "Placeholder นี้ไม่ใช่แปลนอาคารจริง และไม่มีตำแหน่งห้องที่สมมติขึ้น"}
                </div>
              </>
            )
          )}
          <footer className="main-footer">
            <span>InI Interactive Building Layout</span>
            <span>
              สถาบันนวัตกรรม ปตท. <span className="footer-separator">/</span>{" "}
              PTT Innovation Institute
            </span>
          </footer>
        </main>
      </div>
      <dialog
        ref={dialog}
        onCancel={closeModal}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="modal">
          <button className="modal-close" aria-label="ปิด" onClick={closeModal}>
            <X size={20} />
          </button>
          {help ? (
            <>
              <div className="modal-icon">
                <CircleHelp size={28} />
              </div>
              <h2>วิธีใช้งาน</h2>
              <p>สำรวจอาคารและแปลนพื้นที่ภายในสถาบัน</p>
              <ol>
                <li>เลือกอาคาร CB, CSB หรือ PB จาก Sidebar หรือการ์ด</li>
                <li>เลือกชั้น และนำเข้าภาพแปลนจริงเมื่อพร้อม</li>
                <li>
                  ใช้ปุ่ม + / − เพื่อซูม ลากภาพเพื่อเลื่อน และ Reset view
                  เพื่อกลับมุมมองเริ่มต้น
                </li>
                <li>คลิกพื้นที่ที่มีข้อมูลยืนยันแล้ว เพื่อดูรายละเอียดห้อง</li>
              </ol>
              <div className="scope-notice">
                <Info size={16} />
                <span>
                  ยังไม่มีภาพแปลนหรือข้อมูลตำแหน่งห้องในระบบเริ่มต้น
                  การนำเข้าเป็นตัวอย่างในเบราว์เซอร์เท่านั้น
                </span>
              </div>
              <button className="button primary" onClick={closeModal}>
                เข้าใจแล้ว
                <Check size={16} />
              </button>
            </>
          ) : (
            <>
              <div className="modal-icon">
                <ArrowDownToLine size={28} />
              </div>
              <span className="eyebrow">IMPORT FLOOR PLAN</span>
              <h2>นำเข้าภาพแปลนจริง</h2>
              <p>
                อาคาร {building?.id} · ชั้น {floor?.number}
              </p>
              {floor?.status === "pending" && (
                <div className="scope-notice">
                  <Info size={16} />
                  <span>
                    ชั้นนี้ยังรอข้อมูล Layout
                    การนำเข้าภาพไม่เปลี่ยนสถานะการยืนยันข้อมูล
                  </span>
                </div>
              )}
              {floor?.scope === "building-only" && (
                <label className="confirmation">
                  <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                  />
                  ยืนยันว่าภาพแสดงเฉพาะตัวอาคาร ไม่รวมลานจอดรถ
                </label>
              )}
              <input
                ref={fileInput}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={(e) => {
                  void upload(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
              <button
                className="upload-zone"
                disabled={floor?.scope === "building-only" && !confirmed}
                onClick={() => fileInput.current?.click()}
              >
                <Upload size={28} />
                <strong>เลือกภาพแปลนจากอุปกรณ์</strong>
                <span>PNG, JPG หรือ WebP · ขนาดสูงสุด 20 MB</span>
              </button>
              {error && (
                <p className="error" role="alert">
                  {error}
                </p>
              )}
              <p className="import-note">
                ภาพใช้แสดงตัวอย่างเฉพาะเซสชันนี้ ไม่อัปโหลดไปยังเซิร์ฟเวอร์
                <br />
                สำหรับภาพถาวรและตำแหน่งพื้นที่ ดูวิธีตั้งค่าใน README
              </p>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
