# Phase 3 — CSB ชั้น 2 Floor Layout Integration

วันที่ตรวจสอบ: 13 ตุลาคม 2026

## ภาพจริง

พบ `src/assets/floor-layouts/CSB-2.png` ใน GitHub Branch `feature/ini-building-layout` นำเข้าเฉพาะชั้น 2 เพิ่มจาก CSB ชั้น 1 โดยไม่เริ่มชั้น 3–4 ภาพเปิดอ่านและ decode ได้ครบ ตรวจหัวภาพด้วยสายตาระบุ “แผนผังอาคาร CSB ชั้น 2” ตรงกับหน้า UI

ภาพ PNG RGB ขนาด **1672 × 940** พิกเซล (ต่างจากชั้น 1 ที่สูง 941 พิกเซล) Viewer ใช้ natural dimensions จริงของภาพแต่ละชั้น จึงรักษาอัตราส่วนได้โดยไม่เปลี่ยนต้นฉบับ SHA256: `922c099a740d975d80950a0f31e90e4316b42b9ce0d0cc82c44e9a37188373a4`

ไฟล์ใน Workspace และ bytes ของภาพที่ฝังใน Standalone ตรงกับ GitHub ทุก byte ไม่มีการครอบตัดหรือบิดภาพต้นฉบับ ที่ Reset 100% แสดงครบทั้งภาพ; เมื่อ Zoom ใช้ Pan สำรวจส่วนที่อยู่นอก viewport ได้ ใช้โครงสร้างนำเข้าภาพถาวรและ Viewer เดิมไม่เปลี่ยนข้อมูลอาคาร

## การรักษาข้อมูล

ภาพ CB ชั้น 1–4 และ CSB ชั้น 1 คงเดิมและตรงกับ GitHub ทุก byte Master Map, Hotspots 21 จุด, fixture พิกัด และข้อมูล CB/CSB/PB ตรงกับ Commit ฐาน `563918f14a714a46d8303276db0e33d87fd4425b` ทุก byte ไม่พบไฟล์ต้นฉบับถูกลบหรือชื่อ/ตำแหน่งห้องสมมติ

KPI ภาพพร้อมแสดงเป็น 6/11 ชั้น ข้อมูลยืนยันเดิมคง 3 อาคาร, 11 ชั้น และ Layout ยืนยัน 9 ชั้น ชื่อห้องที่เห็นเป็นส่วนหนึ่งของภาพต้นฉบับ ไม่มี room hotspots ที่สร้างขึ้นเอง

## การทดสอบ

ผลรอบนี้: Build ผ่าน, Unit Tests 13/13 และ Browser Tests 34/34 ผ่าน (Chromium Offline 17 + Edge Offline 17) ไม่พบ flaky test หรือ skipped test

Browser Tests ตรวจ CSB ชั้น 1–2 แยกกรณี: exact embedded bytes, aspect ratio ตามขนาดจริงของแต่ละชั้นที่ Desktop 1600/Tablet 1024, Zoom 150/200%, Pan, Reset, กลับหน้าอาคารและเปิดชั้นเดิม, สลับชั้น 1–2 เทียบ bytes ของชั้นที่เลือก, ชั้น 3–4 ยังคง Placeholder และกลับ Master มี Hotspots 21 จุด ตรวจย้อนหลัง CB ทั้ง 4 ชั้นและชุด Master Map ทุกจุดที่ Zoom 100/150/200%

Standalone เปิดด้วย Microsoft Edge 155.0.4283.45 บน Linux ผ่าน `file://` จริงใน Offline context ภาพ CSB-2 decode ได้ อัตราส่วนตรง 1672/940 และ bytes ตรงต้นฉบับ ไม่พบ JavaScript errors หรือ HTTP(S) requests จากแอป HTML รวม CSS/JS/Fonts/ภาพภายในไฟล์เดียว ไม่ใช้ CDN หรือ Server

ข้อจำกัด: ยังไม่ได้ตรวจ Microsoft Edge บน Windows ของบริษัทโดยตรง ชุด Chromium ใน cloud ถูกนโยบายบล็อก `file://` จึงตรวจ inline HTML แบบ Offline ส่วน Edge ใช้ `file://` จริง

## ไฟล์ตรวจรับ

- `ini-building-layout-standalone.html`
- `/workspace/shared/ini-preview/csb2-real-1600.png`
- `/workspace/shared/ini-preview/csb2-real-1024.png`
- `/workspace/shared/ini-preview/csb2-offline-verification.json`

ยังไม่ Commit, Push หรือ Merge รักษางานก่อนหน้าทั้งหมด หยุดรอการตรวจรับ CSB ชั้น 2 ก่อนเริ่มชั้น 3 ภาพ CSB ชั้น 3–4 มีบน GitHubแล้ว ส่วน PB ชั้น 1–3 ยังไม่มีภาพจริง คงเงื่อนไข PB ชั้น 1 เฉพาะตัวอาคารไม่รวมลานจอดรถ และ PB ชั้น 2–3 รอยืนยัน Layout
