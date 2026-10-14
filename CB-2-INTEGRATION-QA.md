# CB ชั้น 2 — Floor Layout Integration

วันที่ตรวจสอบ: 13 ตุลาคม 2026

## สถานะภาพและ Source Code

พบภาพจริง `src/assets/floor-layouts/CB-2.png` ใน GitHub Branch `feature/ini-building-layout` Commit `a2f6062` นำภาพจาก Commit นี้ลง Workspace โดยไม่ Merge, Commit หรือ Push งานรอบนี้ ฐาน Source Code ที่ Commit ใน Workspace ยังเป็น `563918f14a714a46d8303276db0e33d87fd4425b`

- ภาพ PNG RGB 1672 × 941 พิกเซล อัตราส่วนเดิม ไม่มีการแก้ไขหรือครอบตัดต้นฉบับ
- SHA256: `81b31f81d3f412cc96c494d9b9f5935a11db3da5f2ab55f67a1babef8e92540d`
- ตรวจภาพใน Workspace และภาพที่ฝังใน Standalone ตรงกับ GitHub ทุก byte
- ระบบนำเข้าภาพถาวรเดิมเชื่อม CB ชั้น 2 อัตโนมัติ ไม่ต้องเปลี่ยน App หรือโครงสร้างข้อมูลอาคาร
- Master Map, Hotspots 21 จุด, ข้อมูล CB/CSB/PB และภาพ CB ชั้น 1 ตรงกับ Commit ฐานทุก byte ไม่มีไฟล์ต้นฉบับถูกลบ
- ไม่มีการเพิ่มชื่อห้องหรือพิกัดห้องเป็นข้อมูล Interactive ข้อความชื่อห้องที่เห็นมาจากภาพต้นฉบับเท่านั้น
- KPI ภาพพร้อมแสดงเป็น 2/11 ชั้น; จำนวนอาคารยืนยัน 3 แห่ง จำนวนชั้นยืนยัน 11 ชั้น และ Layout ยืนยัน 9 ชั้นคงเดิม

## การทดสอบ

Build ผ่าน, Unit Tests 13/13 และ Browser Tests 26/26 ผ่าน (Chromium Offline 13 + Edge Offline 13) ชุด Browser Tests เพิ่มการตรวจ CB ชั้น 2: ภาพที่แสดงตรงกับ bytes ต้นฉบับ, ไม่เกิด room hotspots, อัตราส่วนถูกต้องที่ Desktop 1600 และ Tablet 1024, Zoom 150%/200%, Pan, Reset, กลับหน้าอาคารแล้วเปิดชั้น 2, กลับ Master Layout และ CB ชั้น 3 ยังคงเป็น Placeholder

Standalone เปิดด้วย Microsoft Edge 155.0.4283.45 บน Linux ผ่าน `file://` ใน Offline context แสดงภาพจริง CB ชั้น 2 ได้ ไม่พบ page errors หรือ HTTP(S) requests จากแอป

ข้อจำกัด: ยังไม่ได้ทดสอบนโยบาย Microsoft Edge บน Windows ของบริษัทโดยตรง ชุด Chromium ใน cloud ถูกนโยบายบล็อก `file://` จึงตรวจ inline HTML แบบ Offline ส่วน Edge ตรวจด้วย `file://` จริง สำหรับตรวจรับ Windows ให้คัดลอก HTML ไปยังเครื่อง ปิด Internet และดับเบิลคลิกเปิดด้วย Edge ไม่ต้องติดตั้ง Node/Git หรือใช้ Server

## ไฟล์ตรวจรับ

- `ini-building-layout-standalone.html` ฝัง Master Map, CB-1, CB-2 และ CSS/JavaScript/Fonts ในไฟล์เดียว ไม่มี CDN หรือ Server ภายนอก
- `/workspace/shared/ini-preview/cb2-real-1600.png`
- `/workspace/shared/ini-preview/cb2-real-1024.png`

ภาพที่ยังขาด: CB ชั้น 3–4, CSB ชั้น 1–4 และ PB ชั้น 1–3 รวม 9 ภาพ คงเงื่อนไข PB ชั้น 1 เฉพาะตัวอาคารไม่รวมที่จอดรถ และ PB ชั้น 2–3 ยังรอยืนยัน Layout

รอบนี้ยังไม่ Commit, Push หรือ Merge รอการตรวจรับก่อนดำเนินการบันทึก
