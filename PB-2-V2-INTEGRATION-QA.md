# Phase 3 — PB ชั้น 2 v2 Integration QA

วันที่ตรวจสอบ: 14 ตุลาคม 2026

## สภาพระบบก่อนแก้ไข

Branch ปัจจุบัน `feature/ini-building-layout`, HEAD `563918f14a714a46d8303276db0e33d87fd4425b` Working Tree มีงานภาพ CB/CSB และ PB ที่ยังไม่ Commit จากรอบก่อน รักษางานทั้งหมดไว้ ตรวจโครงสร้าง React/TypeScript/Vite เดิมและระบบ `floorImages.ts` ซึ่งแยกภาพต้นฉบับกับ Revision โดยเลือกผ่าน `activeFloorRevisions`

พบ `src/assets/floor-layouts/PB-2-v2.png` บน GitHub ภาพหัวข้อ “แผนผังอาคาร PB ชั้น 2” ตรงกับชั้นที่เลือก เป็น PNG RGBA 6049 × 6144 พิกเซล decode ได้ครบ SHA256: `76bb54b3ab7e28ff7c79301672fea28c33aaaf5637b21ccb8a7276be12825d3d`

## ภาพ Before / After และ Backup

| รายการ | Before | After |
| --- | --- | --- |
| ไฟล์ | src/assets/floor-layouts/pb-2.png | src/assets/floor-layout-revisions/PB-2-v2.png |
| ขนาด | 2100 × 1350 RGB | 6049 × 6144 RGBA |
| Backup | src/assets/floor-layout-backups/pb-2-before-v2.png | ไม่แก้ pixels ต้นฉบับใหม่ |

เก็บภาพใหม่ในโฟลเดอร์ Revision แยกตามระบบ PB ชั้น 1 แทนวางปะปนใน glob ภาพเดิม เพื่อไม่เกิด Unknown Filename/Duplicate Floor การคัดลอกจาก GitHub เป็น bytes เดิมทุก byte ไม่ลบหรือเขียนทับต้นฉบับเก่า Backup เท่ากับต้นฉบับเก่าทุก byte

เพิ่มเฉพาะ key PB-2 ใน activeFloorRevisions โดยคง key PB-1 เดิม ไม่มีการเปลี่ยนอ้างอิง CB/CSB ภาพ PB ชั้น 1 ใหม่ตรงกับ GitHubทุก byte และทดสอบสลับกลับชั้น 1 ยังใช้ PB-1-v2

## ขอบเขตและข้อมูล

ใช้ขอบเขตตามแปลนใหม่ที่ผู้ใช้อนุมัติ ไม่เพิ่มพื้นที่ลานจอดรถจากภาพเดิมหรือ Master ภาพมีทางลาด/พื้นที่แรเงาประกอบ ไม่มีส่วนที่ระบุเป็นที่จอดรถอย่างชัดเจน จึงไม่ Crop เพิ่มโดยคาดเดาและขอให้ตรวจรับขอบเขต Before/After ไม่อ้างว่าตรวจยืนยันทางวิศวกรรมว่าทางลาดทุกส่วนเป็นภายในอาคารแล้ว

ไม่เปลี่ยนความละเอียดหรืออัตราส่วน ไม่บิด/ยืดหรือตัดข้อมูล Viewer อ่าน natural dimensions จริง 6049/6144 ที่ Reset 100% แสดงครบทั้งภาพ เมื่อ Zoom ใช้ Pan สำรวจรายละเอียดนอก viewport ได้ ภาพที่ฝังใน Standalone ตรงกับไฟล์ใหม่ทุก byte

ชื่อและหมายเลขห้องเป็นส่วนหนึ่งของภาพที่ได้รับ ไม่เพิ่มข้อมูลห้องหรือ Room Hotspots เอง UI เพิ่มสถานะภาพแปลนฉบับปรับปรุงยืนยันแล้ว พร้อม “PTT Innovation Institute / อาคาร PB — ชั้น 2” สถานะนี้ยืนยันภาพที่เลือก ไม่เปลี่ยน metadata Layout PB ชั้น 2 ที่ยังรอยืนยันตามข้อมูลเดิม และข้อความในภาพ “อาคาร PB | 4 ชั้น” ไม่ใช้เปลี่ยนจำนวนชั้นยืนยันเดิม 3 ชั้น

ตรวจ Master Map, Hotspots 21 จุด, fixture พิกัดและข้อมูล CB/CSB/PB ตรงกับ HEAD ทุก byte ตรวจภาพ CB/CSB ทั้ง 8 ชั้นและภาพ PB เก่าที่เก็บไว้ตรงกับ GitHubทุก byte ไม่พบไฟล์ต้นฉบับถูกลบ

## สถานะภาพทุกชั้น

| อาคาร | ชั้น | ภาพที่ใช้งาน |
| --- | --- | --- |
| CB | 1–4 | CB-1.png ถึง CB-4.png เดิม ครบ 4 ภาพ |
| CSB | 1–4 | CSB-1.png ถึง CSB-4.png เดิม ครบ 4 ภาพ |
| PB | 1 | PB-1-v2.png คงเดิม |
| PB | 2 | PB-2-v2.png ใหม่ |
| PB | 3 | Placeholder; พบภาพบน GitHub แต่ยังไม่เริ่มงาน |

ตัวนับภาพพร้อมแสดงคง 10/11 เพราะ Revision เปลี่ยนภาพของชั้นเดิม ไม่เพิ่มจำนวนชั้น ข้อมูลยืนยัน 3 อาคาร, 11 ชั้น และ Layout ยืนยัน 9 ชั้นคงเดิม

## การทดสอบ

ผลรอบแก้ไขเครื่องมือทดสอบ: Build ผ่าน, Unit Tests 14/14 และ Browser/Regression Tests 42/42 ผ่าน (Chromium Offline 21 + Edge Offline 21) ไม่มี skipped หรือ flaky test

รอบแรกพบ Node test runner เกิน heap limit หลังผ่าน 41 กรณี เนื่องจาก assertion เก็บข้อมูล Base64/Buffer ความละเอียดสูงจำนวนมาก จึงเปลี่ยนการตรวจภาพเป็น SHA256 และเปรียบเทียบ src เป็น boolean แทนการส่ง Base64 ยาวเข้า assertion report ไม่เปลี่ยนภาพหรือการทำงานของแอป แล้วรัน Browser Tests ใหม่ทั้งชุด

Browser/Regression Tests ตรวจ PB ชั้น 2 ใหม่ exact embedded bytes, natural size, aspect ratio Desktop/Tablet, Zoom/Pan/Reset, กลับหน้าอาคารและ Master, Keyboard Enter เลือกชั้น 1 และ 2 เทียบกับ Revision ที่ถูกต้อง, PB ชั้น 3 เป็น Placeholder รวม Regression CB/CSB ทั้ง 8 ชั้นและ Master Hotspots 21 จุดที่ Zoom 100/150/200% ไม่พบ JavaScript errors หรือ HTTP(S) requests จากแอป

Standalone เปิดด้วย Microsoft Edge 155.0.4283.45 บน Linux ผ่าน file:// จริงใน Offline context decode ภาพใหม่ได้ครบและอัตราส่วนถูกต้อง ไม่มี CDN/Server รวม CSS/JS/Fonts/ภาพใน HTML เดียว Chromium ใน cloud ถูกนโยบายบล็อก file:// จึงใช้ inline HTML Offline เฉพาะโครงการนั้น

**ไม่ได้ทดสอบ Microsoft Edge บน Windows ของบริษัทโดยตรง จึงไม่รายงานว่าผ่าน Windows** ไฟล์ Standalone 67,124,136 bytes (ประมาณ 67.1 MB) เพราะรักษาภาพ Revision ความละเอียดเต็ม อาจใช้เวลาเปิดและหน่วยความจำมากกว่ารุ่นก่อน

## รายชื่อไฟล์งานรอบนี้

เพิ่ม:

- src/assets/floor-layout-revisions/PB-2-v2.png
- src/assets/floor-layout-backups/pb-2-before-v2.png
- PB-2-V2-INTEGRATION-QA.md

แก้ไข:

- src/data/floorImages.ts — เลือก Revision PB-2
- src/data/floorImages.test.ts — ตรวจ Revision และข้อมูลเดิม
- src/App.tsx — สถานะภาพใหม่ PB ชั้น 2
- tests/campus-hotspots.spec.ts — ภาพใหม่, สัดส่วน, Keyboard และ Regression
- ini-building-layout-standalone.html
- STANDALONE.md

ภาพ Before: /workspace/shared/ini-preview/pb2-real-1600.png

ภาพ After: /workspace/shared/ini-preview/pb2-v2-1600.png

ภาพ Tablet: /workspace/shared/ini-preview/pb2-v2-1024.png

## ประเด็นที่ยังรอ

รอการตรวจรับขอบเขตตัวอาคารและ Before/After PB ชั้น 2 ไม่มีตำแหน่งห้องที่ยืนยันสำหรับ Interactive Room Hotspots, ยังไม่เริ่ม PB ชั้น 3, Layout metadata PB ชั้น 2–3 ยังรอยืนยันตามข้อมูลเดิม และยังไม่ได้ตรวจบน Windows บริษัท

ยังไม่ Commit, Push, Force Push หรือ Merge ไม่เปลี่ยน main ไม่ใช้ reset --hard หรือ clean -fd หยุดรออนุมัติก่อนงาน PB ชั้น 3
