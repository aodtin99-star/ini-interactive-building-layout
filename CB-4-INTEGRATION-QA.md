# CB ชั้น 4 และ CB ครบ 4 ชั้น — Integration QA

วันที่ตรวจสอบ: 13 ตุลาคม 2026

## ต้นฉบับและการเชื่อมภาพ

พบ `src/assets/floor-layouts/CB-4.png` บน GitHub Branch `feature/ini-building-layout` ใน Commit `1ba058a` ตรวจภาพด้วยสายตาพบหัวข้อ “แผนผังอาคาร CB ชั้น 4” และข้อมูล “อาคาร CB | 4 ชั้น” ตรงกับชั้นที่เลือก ภาพ PNG RGB เปิดและ decode ใน Edge ได้ครบ ขนาด 1672 × 941 พิกเซล

SHA256 ภาพชั้น 4: `96cbb581a81800f2296a5ab1b19113142f5de0775e429126b6bc8fb746548a61`

นำภาพจริงจาก GitHub มาใช้ผ่านโครงสร้าง `floorImages.ts` เดิม ไม่ต้องเปลี่ยน App, Viewer หรือข้อมูลอาคาร ภาพที่คัดลอกและภาพที่ฝังใน Standalone ตรงกับ GitHub ทุก byte ไม่มีการแก้ไข pixels ครอบตัดหรือบิดภาพ แสดงภาพครบทั้งภาพที่ Reset 100%; การ Zoom สามารถ Pan สำรวจรายละเอียดส่วนที่อยู่นอก viewport ได้

## สรุปภาพ CB

| ชั้น | ภาพจริง | ขนาด | สถานะใน Standalone ล่าสุด |
| --- | --- | --- | --- |
| 1 | CB-1.png | 1672 × 941 | เชื่อมแล้ว |
| 2 | CB-2.png | 1672 × 941 | เชื่อมแล้ว |
| 3 | CB-3.png | 1672 × 941 | เชื่อมแล้ว |
| 4 | CB-4.png | 1672 × 941 | เชื่อมแล้ว |

KPI ภาพพร้อมแสดง 4/11 ชั้น คงจำนวนอาคารยืนยัน 3 แห่ง จำนวนชั้นยืนยัน 11 ชั้น และ Layout ยืนยัน 9 ชั้น ไม่มีการสร้างชื่อห้อง พิกัดห้องหรือ Hotspots ภายในแปลน ชื่อห้องที่เห็นเป็นส่วนหนึ่งของภาพต้นฉบับ

## การรักษาข้อมูลและการทดสอบ

ผลรอบนี้: Production Build ผ่าน, Unit Tests 13/13 และ Browser Tests 30/30 ผ่าน (Chromium Offline 15 + Edge Offline 15) ไม่มีการข้าม test หรือ flaky test

ตรวจ Master Map, Hotspots 21 จุด, fixture พิกัด, ข้อมูลอาคาร CB/CSB/PB และภาพ CB ชั้น 1 ตรงกับ Commit ฐาน `563918f14a714a46d8303276db0e33d87fd4425b` ทุก byte ภาพ CB ทั้ง 4 ชั้นตรงกับ GitHub ล่าสุดทุก byte ไม่ลบไฟล์ต้นฉบับ

Browser Tests ตรวจภาพชั้น 2–4 แบบเดียวกัน: exact embedded bytes, อัตราส่วน Desktop 1600 และ Tablet 1024, Zoom 150%/200%, Pan/Reset, กลับหน้าอาคารแล้วเปิดชั้นเดิม และสลับ 1 → 2 → 3 → 4 → 3 → 2 → 1 โดยเปรียบเทียบภาพกับไฟล์ของชั้นนั้นทุกครั้ง รวมชุดเดิมตรวจชั้น 1 และ Hotspots 21 จุดที่ Master Zoom 100/150/200%

ตรวจ Standalone เพิ่มใน Microsoft Edge 155.0.4283.45 บน Linux ผ่าน `file://` จริงใน Offline context: CB ครบ 4 ชั้น decode ได้และมี bytes ตรงกับไฟล์ต้นฉบับ, รักษาอัตราส่วนทั้ง Desktop/Tablet, กลับ Master มี Hotspots 21 จุด, CSB ยังเป็น Placeholder ไม่พบ JavaScript errors หรือ HTTP(S) requests จากแอป

ข้อจำกัด: ยังไม่ได้ทดสอบ Edge บน Windows ของบริษัทโดยตรง ชุด Chromium ใน cloud ถูกนโยบายบล็อก `file://` จึงใช้ inline HTML แบบ Offline ส่วน Edge ใช้ `file://` จริง Standalone ไม่ใช้ CDN หรือ Server และรวม CSS/JavaScript/Fonts/ภาพไว้ในไฟล์เดียว

## ตรวจรับและงานที่ยังรอ

- `ini-building-layout-standalone.html`
- `/workspace/shared/ini-preview/cb4-real-1600.png`
- `/workspace/shared/ini-preview/cb4-real-1024.png`
- `/workspace/shared/ini-preview/cb4-offline-verification.json`

CB มีภาพจริงครบแล้ว ยังขาด CSB ชั้น 1–4 และ PB ชั้น 1–3 รวม 7 ภาพ คงเงื่อนไข PB ชั้น 1 เฉพาะตัวอาคารไม่รวมลานจอดรถ และ PB ชั้น 2–3 รอยืนยัน Layout

รักษางาน CB ชั้น 2–3 ที่ยังไม่ Commit ทั้งหมด และเพิ่มงานชั้น 4 ต่อจากงานนั้น รอบนี้ไม่มี Commit, Push หรือ Merge รอการตรวจรับ
