# Phase 3 — CSB ชั้น 1 Floor Layout Integration

วันที่ตรวจสอบ: 13 ตุลาคม 2026

## ขอบเขตและภาพจริง

ตรวจ GitHub Branch `feature/ini-building-layout` พบ `CSB-1.png`, `CSB-2.png`, `CSB-3.png`, `CSB-4.png` ครบทั้ง 4 ไฟล์ นำเข้าเฉพาะ `src/assets/floor-layouts/CSB-1.png` ตามคำขอ ชั้น 2–4 ยังไม่เชื่อมและยังเป็น Placeholder ใน Standalone รอบนี้ รอการตรวจรับชั้น 1 ก่อนเริ่มชั้น 2

ภาพชั้น 1 เป็น PNG RGB 1672 × 941 พิกเซล เปิดและ decode ได้ครบ ตรวจหัวภาพด้วยสายตาระบุ “แผนผังอาคาร CSB ชั้น 1” ตรงกับหน้า UI ใช้โครงสร้างนำเข้าภาพถาวรและ Viewer เดียวกับ CB โดยไม่เปลี่ยน App หรือข้อมูลอาคาร

SHA256: `d4a3eab7955ebb2729227841ec25ba9cead694bd61196510fc4e087185ad34d0`

ไฟล์ใน Workspace และภาพที่ฝังใน Standalone ตรงกับ GitHub ทุก byte อัตราส่วนตรง 1672/941 ทั้ง Desktop 1600 และ Tablet 1024 ไม่แก้ไข pixels ไม่ครอบตัดรายละเอียดหรือบิดภาพต้นฉบับ ที่ Reset 100% แสดงครบทั้งภาพ; เมื่อ Zoom ใช้ Pan สำรวจส่วนที่อยู่นอก viewport ได้

## ข้อมูลเดิม

รักษาภาพ CB ชั้น 1–4 และตรวจตรงกับไฟล์ GitHub ทุก byte Master Map, พิกัด Hotspots 21 จุด, fixture พิกัดและข้อมูลอาคาร CB/CSB/PB ตรงกับ Commit ฐาน `563918f14a714a46d8303276db0e33d87fd4425b` ทุก byte ไม่มีไฟล์ต้นฉบับถูกลบ

KPI ภาพพร้อมแสดงเป็น 5/11 ชั้น จำนวนอาคารยืนยัน 3 แห่ง จำนวนชั้นยืนยัน 11 ชั้น และ Layout ยืนยัน 9 ชั้นคงเดิม ไม่มีชื่อห้องหรือพิกัดห้องสมมติ ชื่อห้องที่เห็นเป็นส่วนหนึ่งของภาพจริงเท่านั้น ยังไม่มี room hotspots

## การทดสอบ

เพิ่ม Browser Test เฉพาะ CSB ชั้น 1: เปรียบเทียบ embedded image bytes, อัตราส่วนเมื่อ Resize Desktop/Tablet, Zoom 150/200%, Pan, Reset, กลับหน้าอาคารและเปิดชั้น 1 อีกครั้ง, ตรวจ CSB ชั้น 2–4 เป็น Placeholder และกลับ Master Layout มี Hotspots 21 จุด

ผลรอบนี้: Build ผ่าน, Unit Tests 13/13 และ Browser Tests 32/32 ผ่าน (Chromium Offline 16 + Edge Offline 16) ทดสอบใหม่ทั้งชุด รวมการสลับภาพ CB ชั้น 1–4 และคลิก Hotspots ทุกจุดที่ Master Zoom 100/150/200%

Standalone เปิด Offline ด้วย Microsoft Edge 155.0.4283.45 บน Linux ผ่าน `file://` จริง ภาพ CSB-1 decode ได้และ bytes ตรงต้นฉบับ ไม่พบ JavaScript errors หรือ HTTP(S) requests จากแอป CSS/JS/Fonts/ภาพรวมใน HTML เดียว ไม่ใช้ CDN หรือ Server

ข้อจำกัด: ยังไม่ได้ตรวจ Edge บน Windows ของบริษัทโดยตรง Chromium ใน cloud ถูกนโยบายบล็อก `file://` จึงตรวจ inline HTML แบบ Offline เฉพาะโครงการนั้น ส่วน Edge ใช้ `file://` จริง

## ตรวจรับ

- `ini-building-layout-standalone.html`
- `/workspace/shared/ini-preview/csb1-real-1600.png`
- `/workspace/shared/ini-preview/csb1-real-1024.png`
- `/workspace/shared/ini-preview/csb1-offline-verification.json`

ยังไม่ Commit, Push หรือ Merge งานรอบนี้ รักษางาน CB ชั้น 2–4 ที่ยังไม่ Commit ทั้งหมด หยุดรอการตรวจรับ CSB ชั้น 1 ก่อนเริ่มชั้น 2 ภาพ CSB ชั้น 2–4 มีบน GitHubแล้ว ส่วน PB ชั้น 1–3 ยังไม่มีภาพจริง คงเงื่อนไข PB ชั้น 1 เฉพาะตัวอาคารไม่รวมลานจอดรถ และ PB ชั้น 2–3 รอยืนยัน Layout
