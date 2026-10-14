# Phase 4 — CSB ชั้น 3 Floor Layout Integration

วันที่ตรวจสอบ: 13 ตุลาคม 2026

## ภาพจริงและระบบ

พบ `src/assets/floor-layouts/CSB-3.png` ใน GitHub Branch `feature/ini-building-layout` นำเข้าเฉพาะชั้น 3 เพิ่มจากชั้น 1–2 ไม่เริ่มชั้น 4 ตรวจภาพด้วยสายตาหัวภาพระบุ “แผนผังอาคาร CSB ชั้น 3” ตรงกับ UI ไฟล์ PNG RGB 1672 × 941 พิกเซลเปิดและ decode ได้ครบ

SHA256: `85b02b25335f69ea62d5ca0cad1571fe8fd89464c9c1e56e1ccec3fa26940c8e`

ภาพใน Workspace และภาพที่ฝังใน Standalone ตรงกับ GitHub ทุก byte ไม่เปลี่ยน pixels ครอบตัดหรือบิดต้นฉบับ Viewer เดิมอ่าน natural dimensions ของแต่ละภาพ จึงรักษาอัตราส่วนได้ทั้ง Desktop 1600 และ Tablet 1024 ที่ Reset 100% แสดงครบทั้งภาพ; เมื่อ Zoom ใช้ Pan สำรวจรายละเอียดนอก viewport ได้ ไม่ต้องเปลี่ยน App หรือข้อมูลอาคาร

## ข้อมูลเดิมและสถานะ

ภาพ CB ชั้น 1–4 และ CSB ชั้น 1–2 คงเดิม ตรงกับไฟล์ GitHub ทุก byte Master Map, Hotspots 21 จุด, fixture พิกัด และข้อมูลอาคาร CB/CSB/PB ตรงกับ Commit ฐาน `563918f14a714a46d8303276db0e33d87fd4425b` ทุก byte ไม่มีไฟล์ต้นฉบับถูกลบหรือสร้างชื่อ/ตำแหน่งห้องสมมติ

KPI ภาพพร้อมแสดง 7/11 ชั้น จำนวนอาคารยืนยัน 3 แห่ง จำนวนชั้นยืนยัน 11 ชั้น และ Layout ยืนยัน 9 ชั้นคงเดิม ชื่อห้องที่เห็นเป็นส่วนหนึ่งของภาพจริง ไม่มี room hotspots ที่สร้างขึ้นเอง CSB ชั้น 4 มีไฟล์บน GitHub แต่ยังไม่รวมใน Standalone และคง Placeholder รอบนี้

## การทดสอบ

ผลรอบนี้: Build ผ่าน, Unit Tests 13/13 และ Browser Tests 36/36 ผ่าน (Chromium Offline 18 + Edge Offline 18) ไม่มี skipped หรือ flaky test

Browser Tests ตรวจ CSB ชั้น 1–3 แยกกรณี: exact embedded bytes, อัตราส่วนตามขนาดแต่ละภาพที่ Desktop/Tablet, Zoom 150/200%, Pan/Reset, กลับหน้าอาคารและเปิดชั้นเดิม, สลับ 1 → 2 → 3 → 2 → 1 → 3 เทียบภาพกับไฟล์ของชั้นที่เลือก และ CSB ชั้น 4 ยังคง Placeholder ก่อนกลับ Master มี Hotspots 21 จุด ตรวจย้อนหลัง CB ทั้ง 4 ชั้นและ Master Map ที่ Zoom 100/150/200%

Standalone เปิด Offline ใน Microsoft Edge 155.0.4283.45 บน Linux ผ่าน `file://` จริง ภาพ CSB-3 decode ได้และ bytes ตรงต้นฉบับ ไม่พบ JavaScript errors หรือ HTTP(S) requests จากแอป รวม CSS/JS/Fonts/ภาพใน HTML เดียว ไม่ใช้ CDN หรือ Server

ข้อจำกัด: ยังไม่ได้ทดสอบ Edge บน Windows ของบริษัทโดยตรง Chromium ใน cloud ถูกนโยบายบล็อก `file://` จึงตรวจ inline HTML แบบ Offline ส่วน Edge ใช้ `file://` จริง

## ไฟล์ตรวจรับ

- `ini-building-layout-standalone.html`
- `/workspace/shared/ini-preview/csb3-real-1600.png`
- `/workspace/shared/ini-preview/csb3-real-1024.png`
- `/workspace/shared/ini-preview/csb3-offline-verification.json`

ยังไม่ Commit, Push หรือ Merge งานรอบนี้ รักษางานก่อนหน้าทั้งหมด และหยุดรอการตรวจรับก่อนเริ่ม CSB ชั้น 4 ส่วน PB ชั้น 1–3 ยังไม่มีภาพจริง คงเงื่อนไข PB ชั้น 1 เฉพาะตัวอาคารไม่รวมลานจอดรถ และ PB ชั้น 2–3 รอยืนยัน Layout
