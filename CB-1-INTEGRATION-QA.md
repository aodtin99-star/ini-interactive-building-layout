# CB ชั้น 1 — Real Floor Layout Integration

ตรวจสอบวันที่ 13 ตุลาคม 2026 บน Branch `feature/ini-building-layout`

## ภาพต้นฉบับและการเชื่อมระบบ

พบ `src/assets/floor-layouts/CB-1.png` ใน GitHub Commit `99b9a30` ซึ่งเพิ่มภาพเพียงไฟล์เดียวจากฐาน Phase 2 `5fc84f148f13504350d00bc8150972dc6aae6ac1` อ่านภาพลง Workspace โดยไม่ Merge หรือสร้าง Commit ใหม่

- PNG RGB ขนาด 1672 × 941 พิกเซล
- SHA256: `b38472ad53b18328031b6a86d54df28135b60978eff7ea0292e9f9b17e52069e`
- ไฟล์ใน Workspace และภาพที่ฝังใน Standalone ตรงกับ GitHub ทุก byte
- ระบบ `floorImages.ts` เดิมค้นพบภาพและเชื่อม CB ชั้น 1 อัตโนมัติ ไม่ต้องเปลี่ยนข้อมูล Layout หรือ Viewer
- KPI ภาพพร้อมแสดงเป็น 1/11; อาคารยืนยัน 3 แห่ง จำนวนชั้นยืนยัน 11 ชั้น และข้อมูล Layout ยืนยัน 9 ชั้นคงเดิม
- ไม่มีการสร้างชื่อห้อง พิกัดห้อง หรือ Hotspots ภายในภาพ แม้ภาพจะมีข้อความชื่อห้องจริงอยู่แล้ว
- ภาพ Master, ข้อมูล CB/CSB/PB และ fixture พิกัด Hotspots 21 จุดตรงกับฐานเดิม ไม่พบไฟล์ต้นฉบับถูกลบ

## การทดสอบ

Production Build, Unit Tests 13/13 และ Browser Tests 24/24 ผ่าน (Chromium Offline 12 + Edge Offline 12) ปรับ Browser Tests ให้คาดหวังภาพจริง CB ชั้น 1 และ KPI 1/11 แทน Placeholder เดิม โดยยังตรวจ Placeholder ของชั้นที่ไม่มีภาพ

ชุด Browser Tests ตรวจ Hotspots ทั้ง 21 จุดที่ Zoom 100%, 150%, 200%, การเลือกชั้น, การนำทางกลับ, Zoom/Pan/Reset และ Tablet ภาพจริง CB ชั้น 1 เปิดทันทีจาก Master → CB → ชั้น 1; กลับหน้าอาคารแล้วเปิดชั้น 1 ยังแสดงภาพจริง

ตรวจ Standalone เพิ่มด้วย Microsoft Edge 155.0.4283.45 บน Linux เปิด `file://` ใน context Offline: ภาพครบทุก byte, อัตราส่วนถูกต้องทั้ง viewport 1600 และ 1024, ย้อนกลับ Master เหลือ Hotspots ครบ 21 จุด, CB ชั้น 2 ยังเป็น Placeholder, ไม่พบ page error หรือ HTTP(S) requests

ข้อจำกัด: ไม่สามารถตรวจนโยบาย Edge บน Windows ของบริษัทโดยตรงในสภาพแวดล้อม Linux นี้ ชุด Chromium ของ cloud ถูกนโยบายบล็อก `file://` จึงตรวจ inline HTML แบบ Offline ส่วน Edge ใช้ `file://` จริง ผู้ตรวจรับ Windows ให้คัดลอก HTML ลงเครื่อง ปิด Internet และดับเบิลคลิกด้วย Edge แล้วตรวจการเลือก CB ชั้น 1 / Zoom / Pan / Reset / Back

## ไฟล์ตรวจรับ

- `ini-building-layout-standalone.html` ฝังภาพ CB-1 และ Master พร้อม CSS/JS/Fonts ไม่ใช้ CDN หรือ Server
- `/workspace/shared/ini-preview/cb1-real-1600.png`
- `/workspace/shared/ini-preview/cb1-real-1024.png`

ยังขาดภาพ CB ชั้น 2–4, CSB ชั้น 1–4 และ PB ชั้น 1–3 รวม 10 ภาพ PB ชั้น 1 เฉพาะตัวอาคารไม่รวมลานจอดรถ และ PB ชั้น 2–3 ยังรอยืนยัน Layout เดิม

ผู้ใช้ตรวจรับและอนุมัติให้ Commit/Push งาน CB ชั้น 1 แล้ว ตรวจ Build และ Tests ซ้ำก่อนบันทึก โดยคง Commit อัปโหลดภาพ `99b9a301c1284f101685635e57029ddd8b01bbc7` ไว้ในประวัติเดิม ไม่ Force Push และไม่ Merge เข้า main หลังดำเนินการหยุดรอคำสั่งสำหรับ CB ชั้น 2
