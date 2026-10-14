# Phase 5 — CSB ชั้น 4 Integration และ Regression QA

วันที่ตรวจสอบ: 13 ตุลาคม 2026

## ภาพจริง

พบ `src/assets/floor-layouts/CSB-4.png` บน GitHub Branch `feature/ini-building-layout` ตรวจภาพด้วยสายตาหัวข้อ “แผนผังอาคาร CSB ชั้น 4” ตรงกับหน้า UI ไฟล์ PNG RGB 1672 × 941 พิกเซล เปิดและ decode ใน Edge ได้ครบ

SHA256: `40895a413be47b4db0e889c81e876bd7b120cb0054a13e72abae3dd9aa596a31`

ระบบนำเข้าภาพถาวรเดิมเชื่อม CSB ชั้น 4 อัตโนมัติ ไม่ต้องแก้ App, Viewer หรือข้อมูลอาคาร bytes ภาพใน Workspace และภาพที่ฝังใน Standalone ตรงกับ GitHub ทุก byte ไม่ลดความละเอียด ไม่แก้ไข pixels ไม่ครอบตัดข้อมูลหรือบิดภาพต้นฉบับ อัตราส่วนตรง natural dimensions ที่ Desktop 1600 และ Tablet 1024 ที่ Reset 100% แสดงครบทั้งภาพ ส่วนเมื่อ Zoom ใช้ Pan สำรวจรายละเอียดนอก viewport ได้

## ภาพจริงและตัวนับ

| อาคาร | ภาพที่เชื่อม | จำนวนภาพจริง |
| --- | --- | --- |
| CB | CB-1 ถึง CB-4 | 4 |
| CSB | CSB-1 ถึง CSB-4 | 4 |
| PB | ยังไม่มีภาพจริงในเวอร์ชันนี้ | 0 |
| รวม | CB และ CSB | 8/11 ชั้น |

ตรวจ KPI เริ่มต้น 8/11 และยังเป็น 8/11 หลังสลับภาพครบทั้ง 8 ชั้นและกลับ Master รวมตรวจ PB ทั้ง 3 ชั้นยังเป็น Placeholder ตัวนับนับชั้นที่มีภาพจริง ไม่รวม Placeholder และไม่เพิ่มจำนวนเมื่อดูชั้นเดิมซ้ำ การนำเข้าภาพชั่วคราวทับชั้นที่มีภาพแล้วไม่เพิ่มจำนวน แต่เพิ่มภาพ PB ชั้น 1 ใน test context แล้วตัวนับเป็น 9/11 ตามจำนวนชั้นที่พร้อมแสดงจริง

จำนวนอาคารยืนยัน 3 แห่ง จำนวนชั้นยืนยัน 11 ชั้น และ Layout ยืนยัน 9 ชั้นยังคงเดิม ไม่มีชื่อ/ตำแหน่งห้องสมมติหรือ room hotspots ที่สร้างขึ้นเอง ชื่อห้องที่เห็นเป็นส่วนหนึ่งของภาพต้นฉบับ

## การรักษาข้อมูลและ Regression Tests

ผลรอบนี้: Build ผ่าน, Unit Tests 13/13 และ Browser/Regression Tests 38/38 ผ่าน (Chromium Offline 19 + Edge Offline 19) ไม่มี skipped หรือ flaky test

ตรวจ Master Map, Hotspots 21 จุด, fixture พิกัดและข้อมูล CB/CSB/PB ตรงกับ Commit ฐาน `563918f14a714a46d8303276db0e33d87fd4425b` ทุก byte ภาพจริง CB และ CSB ครบ 8 ไฟล์ตรงกับ GitHub ล่าสุดทุก byte ไม่พบไฟล์ต้นฉบับถูกลบ รักษางานก่อนหน้าที่ยังไม่ Commit ทั้งหมด

Browser Tests ตรวจ CSB ชั้น 1–4 แยกกรณี: embedded bytes ตรงต้นฉบับ, อัตราส่วนตามแต่ละภาพที่ Desktop/Tablet (CSB ชั้น 2 สูง 940 พิกเซล), Zoom 150/200%, Pan/Reset, กลับหน้าอาคารและเปิดชั้นเดิม, สลับ 1 → 2 → 3 → 4 → 3 → 2 → 1 → 4 เทียบ bytes ของภาพที่เลือก และกลับ Master มี Hotspots 21 จุด รวม Regression CB ทั้ง 4 ชั้นและ Master Map ทุกจุดที่ Zoom 100/150/200%

Standalone เปิด Offline ใน Microsoft Edge 155.0.4283.45 บน Linux ผ่าน `file://` จริง ตรวจครบ 8 ภาพ decode ได้และ embedded bytes ตรงต้นฉบับ อัตราส่วนถูกต้องทั้ง Desktop/Tablet ไม่พบ JavaScript errors หรือ HTTP(S) requests จากแอป รวม CSS/JS/Fonts/ภาพใน HTML เดียว ไม่มี CDN หรือ Server

ข้อจำกัด: ยังไม่ได้ตรวจ Microsoft Edge บน Windows ของบริษัทโดยตรง ชุด Chromium ใน cloud ถูกนโยบายบล็อก `file://` จึงตรวจ inline HTML แบบ Offline ส่วน Edge ใช้ `file://` จริง

## ไฟล์ตรวจรับ

- `ini-building-layout-standalone.html`
- `/workspace/shared/ini-preview/csb4-real-1600.png`
- `/workspace/shared/ini-preview/csb4-real-1024.png`
- `/workspace/shared/ini-preview/csb4-offline-verification.json`

ยังไม่ Commit, Push หรือ Merge หยุดรอการตรวจรับก่อนเริ่ม PB ชั้น 1 คงเงื่อนไข PB ชั้น 1 เฉพาะตัวอาคารไม่รวมลานจอดรถ และ PB ชั้น 2–3 รอยืนยัน Layout
