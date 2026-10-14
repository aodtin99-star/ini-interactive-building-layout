# CB ชั้น 1–3 — Verification และเตรียมภาพชั้น 3

วันที่ตรวจสอบ: 13 ตุลาคม 2026

## ภาพจริงและความครบถ้วน

ตรวจ GitHub Branch `feature/ini-building-layout` พบภาพ `CB-3.png` ใน Commit `70b66f6` จึงนำภาพจริงมาเชื่อมกับ CB ชั้น 3 ด้วยระบบ `floorImages.ts` เดิม ไม่ต้องเปลี่ยน App หรือข้อมูล Layout อาคาร

ภาพ PNG RGB ขนาด 1672 × 941 พิกเซล SHA256 `937ff67c64b90f6ce3824cbee458539d54e40bad7c301c8443b45dff67c1e7b0`

ตรวจภาพ CB ชั้น 1, 2 และ 3 ใน Workspace ตรงกับไฟล์ GitHub ทุก byte และตรวจภาพทั้งสามที่ฝังใน Standalone ตรงกับต้นฉบับด้วย อัตราส่วนตรง 1672/941 ที่ Desktop 1600 และ Tablet 1024 ไม่มีการบิดภาพหรือแก้ไข pixels ต้นฉบับ

Master Map, พิกัด Hotspots 21 จุด, fixture พิกัด, ข้อมูลอาคาร CB/CSB/PB และภาพ CB ชั้น 1 ตรงกับ Commit ฐานเดิมทุก byte ไม่มีไฟล์ต้นฉบับถูกลบหรือสร้างชื่อ/ตำแหน่งห้องสมมติ KPI ภาพพร้อมแสดงเป็น 3/11 ส่วนข้อมูลยืนยันเดิมยังเป็น 3 อาคาร, 11 ชั้น และ Layout ยืนยัน 9 ชั้น

พบ `CB-4.png` บน GitHub เช่นกัน แต่ยังไม่นำเข้า Workspace หรือ Standalone ในงานรอบนี้ซึ่งกำหนดขอบเขตเฉพาะชั้น 3 หน้า CB ชั้น 4 ในเวอร์ชันตรวจรับนี้ยังเป็น Placeholder จึงไม่ต้องอัปโหลด CB-3 เพิ่มอีก

## ระบบและการทดสอบ

Master → CB เปิดชั้น 1 → เลือกชั้น 2 หรือ 3 → กลับหน้าอาคาร → เปิดชั้นเดิม → กลับ Master ได้ ใช้ Viewer เดียวกันสำหรับทุกชั้น รองรับ Zoom, Pan และ Reset โดยไม่เพิ่ม Hotspots ภายในภาพ

ผลตรวจรอบนี้: Build ผ่าน, Unit Tests 13/13 และ Browser Tests 28/28 ผ่าน (Chromium Offline 14 + Edge Offline 14) ตรวจใหม่ทั้งชุด รวมการคลิก Hotspots 21 จุด, Zoom Master 100/150/200%, Desktop/Tablet, Floor Selection, กลับหน้าอาคาร/Master และการนำเข้าภาพจากเครื่องแบบ Offline

เพิ่ม Browser Test สำหรับ CB ชั้น 3 โดยตรวจ bytes ของภาพจริง, อัตราส่วนเมื่อ Resize, Zoom 150/200%, Pan/Reset และ Back Navigation ส่วน CB ชั้น 2 ยังมี test แบบเดียวกัน ภาพชั้น 1 ตรวจการแสดงภาพจริงและการย้อนกลับเดิม

ตรวจ Standalone โดย Microsoft Edge 155.0.4283.45 บน Linux เปิด `file://` ใน Offline context: ภาพ CB ชั้น 1–3 ถูกต้อง ไม่พบ JavaScript errors หรือ HTTP(S) requests จากแอป CSS/JavaScript/Fonts/ภาพฝังใน HTML เดียว ไม่มี CDN หรือ Server

ข้อจำกัด: ยังไม่ได้ทดสอบ Edge บน Windows ของบริษัทโดยตรง ชุด Chromium ใน cloud ถูกนโยบายบล็อก `file://` จึงทดสอบ inline HTML แบบ Offline ส่วน Edge ทดสอบ `file://` จริง

## ไฟล์ตรวจรับและสถานะ Git

- `ini-building-layout-standalone.html`
- `/workspace/shared/ini-preview/cb3-real-1600.png`
- `/workspace/shared/ini-preview/cb3-real-1024.png`
- `/workspace/shared/ini-preview/cb3-offline-verification.json`

Source Code ฐานใน Workspace ยังเป็น Commit `563918f14a714a46d8303276db0e33d87fd4425b` รักษาการเปลี่ยนแปลง CB ชั้น 2 ที่ยังไม่ Commit ทั้งหมด เพิ่มงานชั้น 3 ต่อจากงานนั้น ไม่ Commit, Push หรือ Merge รอบนี้ รอคำสั่งต่อไป

ภาพที่ยังไม่เชื่อมในเวอร์ชันนี้: CB ชั้น 4 (พบไฟล์บน GitHub แล้ว), CSB ชั้น 1–4 และ PB ชั้น 1–3 (ยังไม่มีภาพจริงใน repository ที่ตรวจ) คงเงื่อนไข PB ชั้น 1 เฉพาะตัวอาคารไม่รวมลานจอดรถ และ PB ชั้น 2–3 รอยืนยัน Layout
