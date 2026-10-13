# Phase 2 Recovery และ Final Verification

วันที่ตรวจสอบ: 13 ตุลาคม 2026

## สถานะ Source Code

โค้ด Phase 2 ล่าสุดยังอยู่ครบใน Workspace ไม่ได้สร้างโครงการใหม่ หลัง Recovery ตรวจสอบ Git Status, Diff และ Commit History แล้ว

- Branch: `feature/ini-building-layout`
- Commit ฐาน: `4e1a4e15afacb59c639040f688a0baaecedd04a0`
- ผู้ใช้อนุมัติให้ Commit และ Push Phase 2 ไปยัง Branch นี้หลังตรวจรับ โดยห้าม Force Push หรือ Merge เข้า main
- ไม่พบไฟล์ต้นฉบับถูกลบ ไม่ได้เปลี่ยนภาพ Master Layout หรือข้อมูล Layout เดิม
- `buildings.ts`, `buildingCatalog.ts`, `campusMap.ts` และ fixture พิกัด Hotspots ตรงกับ Commit ฐานทุก byte
- Hotspots 21 จุดคงพิกัดเดิม จำนวนชั้นยืนยัน CB 4, CSB 4 และ PB 3 ชั้น
- SHA256 ของภาพ Master ต้นฉบับและสำเนาใน source: `10995e5dcf25ab1e46394a7878d7884f3b584c68b86b86bf33343127dd5dfcbb`

## ระบบต้นแบบ CB ชั้น 1

Master Layout → CB เปิดชั้น 1 เป็นค่าเริ่มต้น → กลับไปหน้าอาคาร CB → เลือกชั้นจากหน้า Overview → กลับ Master Layout ได้ รองรับ Zoom, Pan, Reset และแสดงภาพจริงโดยรักษาอัตราส่วนบน Desktop/Tablet

หน้า CB ชั้น 1 แสดง Placeholder พร้อมชื่อไฟล์ที่ต้องใช้ ไม่มีแปลน ตำแหน่งห้อง หรือชื่อห้องสมมติ ระบบนำเข้าภาพจากเครื่องผู้ใช้ไม่ส่งข้อมูลไป Server และเก็บภาพชั่วคราวเฉพาะระหว่างเปิดแอป การกลับหน้าอาคารแล้วเปิดชั้นเดิมยังคงภาพชั่วคราวไว้

โครงสร้างภาพถาวรแยกจาก UI ใน `src/data/floorImages.ts` และ `src/assets/floor-layouts/` รองรับการเพิ่มภาพของชั้นที่มีข้อมูลยืนยัน โดยไม่ต้องเปลี่ยนหน้า Viewer

## ผลการทดสอบหลัง Recovery

| การตรวจสอบ | ผล |
| --- | --- |
| TypeScript และ Vite production build | ผ่าน |
| Unit Tests | 13 ผ่าน |
| Browser Tests | 24 ผ่าน |
| คลิก Hotspots ทั้ง 21 จุดและตรวจชื่อรายละเอียด | ผ่าน |
| Master → CB ชั้น 1 → หน้าอาคาร → Master | ผ่าน |
| Master Zoom 100%, 150%, 200%, Pan/Reset | ผ่าน |
| Floor Viewer Zoom/Pan/Reset และรักษาอัตราส่วนภาพนำเข้า | ผ่าน |
| Desktop/Tablet, Resize และ Touch Navigation | ผ่าน |
| Standalone Offline, Back Navigation, Local Import | ผ่าน |
| JavaScript errors / HTTP(S) requests จากแอป | ไม่พบ |
| Git Diff whitespace / ไฟล์ต้นฉบับถูกลบ | ไม่พบ |

ทดสอบ Microsoft Edge 155.0.4283.45 บน Linux โดยเปิด Standalone ผ่าน `file://` จริงใน browser context แบบ Offline ไม่ใช้ Server ชุด Chromium ถูกนโยบาย cloud บล็อก `file://` จึงใช้ inline HTML แบบ Offline สำหรับโครงการทดสอบนั้น ไม่ได้แก้ไขนโยบายผู้ดูแล ยังไม่ได้ทดสอบนโยบาย Edge บน Windows ของบริษัทโดยตรง

ภาพที่ใช้ทดสอบการ decode/resize/import เป็น fixture ชั่วคราวใน browser context เท่านั้น ไม่ได้บันทึกเป็น Floor Layout จริงหรือฝังลงข้อมูลชั้นของผลิตภัณฑ์

## ภาพจริงที่ยังขาด

ไม่พบ Floor Layout จริงใน Repository ปัจจุบัน โฟลเดอร์ภาพชั้นยังว่าง หน้า CB ชั้น 1 จึงยังเป็น Placeholder

ไฟล์ที่ต้องได้รับก่อน: **`CB-1.png`** ภาพแปลนจริงของ CB ชั้น 1 ใช้ JPG, JPEG หรือ WebP แทนได้ โดยคงชื่อฐาน `CB-1` และไม่แก้ไขภาพต้นฉบับ

- นำเข้าทดลอง: กดปุ่มนำเข้าภาพแปลนในหน้า CB ชั้น 1 เลือก PNG/JPG/JPEG/WebP ไม่เกิน 20 MB ภาพไม่ถูกอัปโหลด และไม่คงอยู่หลังปิด/โหลดแอปใหม่
- นำเข้าถาวรสำหรับผู้ดูแล: วางภาพใน `src/assets/floor-layouts/CB-1.png` แล้ว Build และสร้าง Standalone ใหม่ ภาพจะฝังใน HTML เดียว
- ภาพชั้นถัดไป: `CB-2`–`CB-4`, `CSB-1`–`CSB-4`, `PB-1`–`PB-3` ใช้นามสกุลที่รองรับข้างต้น
- PB ชั้น 1 ต้องเป็นเฉพาะตัวอาคาร ไม่รวมลานจอดรถ; PB ชั้น 2–3 ยังรอยืนยันข้อมูล Layout การเพิ่มภาพไม่เปลี่ยนสถานะการยืนยันเอง
- CB/CSB ชั้น 1–4 และ PB ชั้น 1 ยืนยันข้อมูล Layout แล้ว แต่ยังไม่มีภาพจริง รวม 9 ชั้น; จำนวนชั้นยืนยันทั้งหมด 11 ชั้น

## ไฟล์สำหรับตรวจรับ

`ini-building-layout-standalone.html` สร้างจาก Source Code Phase 2 ล่าสุด รวม CSS/JavaScript/Fonts และ Master Map ภายในไฟล์เดียว ไม่มี CDN หรือ Server ภายนอก ดาวน์โหลดหรือคัดลอกไฟล์นี้แล้วดับเบิลคลิกเปิดด้วย Edge ได้

ผู้ใช้ตรวจรับและอนุมัติให้บันทึก Phase 2 แล้ว รายงาน Commit Hash และผล Push จะตรวจสอบจาก GitHub หลังดำเนินการ ไม่มีการ Merge เข้า main จากนั้นหยุดรอภาพ CB ชั้น 1

ภาพตรวจรับอยู่ใน `/workspace/shared/ini-preview/`:

- `phase2-cb-floor1-desktop.png`: CB ชั้น 1 พร้อม Placeholder ที่ถูกต้อง
- `phase2-cb-floor1-tablet.png`: หน้าเดียวกันบน Tablet
- `phase2-cb-building-overview.png`: หน้าอาคาร CB และตัวเลือก 4 ชั้น

ไฟล์เปลี่ยนแปลง Phase 2: `src/App.tsx`, `src/components/BuildingOverview.tsx`, `src/components/PlanViewer.tsx`, `src/data/floorImages.ts`, `src/data/floorImages.test.ts`, `src/styles.css`, `tests/campus-hotspots.spec.ts`, `ini-building-layout-standalone.html`, `STANDALONE.md` และรายงานนี้
