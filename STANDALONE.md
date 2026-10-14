# InI Interactive Building Layout — Standalone

ไฟล์ `ini-building-layout-standalone.html` รวมแอป React เดิม, JavaScript, CSS, ไอคอนและฟอนต์ทั้งหมดไว้ในไฟล์เดียว ขนาดประมาณ 5.4 MB ไม่ใช้ CDN, Server หรือ Internet ระหว่างใช้งาน ไม่ต้องติดตั้ง Git หรือ Node.js บนเครื่องผู้ใช้

## ดาวน์โหลดจาก GitHub ด้วยเบราว์เซอร์

1. เปิดหน้าไฟล์ใน branch `feature/ini-building-layout`:
   https://github.com/aodtin99-star/ini-interactive-building-layout/blob/feature/ini-building-layout/ini-building-layout-standalone.html
2. หาก repository เป็น private ให้เข้าสู่ระบบ GitHub ด้วยบัญชีที่มีสิทธิ์เข้าถึง
3. ใช้ปุ่ม **Download raw file** ของหน้าไฟล์ หรือเปิด **Raw** แล้วกด `Ctrl+S` เลือกชนิดไฟล์ **All files** ถ้ามี และตั้งชื่อเป็น `ini-building-layout-standalone.html` อย่าบันทึกหน้าเว็บ GitHub ที่ยังไม่ได้เปิด Raw
4. เก็บไฟล์ในโฟลเดอร์ที่บริษัทอนุญาต แล้วดับเบิลคลิกเพื่อเปิดด้วย Chrome หรือ Edge หรือคลิกขวา > Open with > Chrome / Edge
5. สามารถปิด Internet หลังดาวน์โหลดเสร็จ และใช้งานไฟล์ต่อได้

อีกวิธีคือหน้า repository เลือก branch นี้ แล้วเลือก **Code > Download ZIP** จากนั้นใช้ **Extract All** ของ Windows และเปิดไฟล์ HTML ในโฟลเดอร์ที่แตกแล้ว

## การใช้งาน

- แผนผังต้นฉบับครบทั้งภาพ ฝังในไฟล์แล้ว มี 21 ป้ายคลิกได้
- แยก Building 12 จุด, Facility 6 จุด, Area 3 จุด โดยคง Hotspot ทั้ง 21 จุด
- KPI นับเฉพาะ CB 4 ชั้น, CSB 4 ชั้น และ PB 3 ชั้น: 3 อาคาร / 11 ชั้น
- จำนวนชั้นที่แจ้งไว้ของปลายทางอื่นยังรอยืนยันและไม่รวมใน KPI ข้อมูล Layout เดิมไม่เปลี่ยน
- Gas Mixing เปิด Facility Detail โดยไม่มีจำนวนชั้นสมมติ; POND 1–3 เปิด Area Detail
- คลิกทุกชื่อเพื่อเปิดหน้ารายละเอียด มี Back to Master Layout ทุกหน้า
- Hotspot โปร่งใส มีกรอบ Highlight เมื่อ Hover/Focus และแสดงชื่อพร้อมประเภทในแถบใต้ภาพเพื่อไม่บังป้ายเดิม; ใช้ Tab และ Enter เพื่อเปิดรายละเอียด
- ปุ่มตรวจตำแหน่ง Hotspot แสดงหมายเลข 1–21 และรายชื่อคู่กัน Navy สำหรับ Building, Silver สำหรับ Facility และ Slate สำหรับ Area
- ใช้ + / − เพื่อซูม ลากเพื่อ Pan และ Reset view เพื่อกลับตำแหน่งเริ่มต้น
- นำเข้าภาพ PNG, JPG หรือ WebP จากเครื่อง ขนาดไม่เกิน 20 MB ผ่าน blob URL ในหน่วยความจำ ไม่ส่งไปยังเซิร์ฟเวอร์
- PB ชั้น 1 ต้องยืนยันว่าภาพมีเฉพาะตัวอาคาร ไม่รวมลานจอดรถ
- แปลนภายในที่ยังไม่มีภาพจริงใช้ Placeholder ไม่มีตำแหน่งห้องสมมติ

## ข้อจำกัด

- ภาพที่นำเข้าอยู่เฉพาะเซสชัน เมื่อปิดหรือรีเฟรชไฟล์ต้องนำเข้าใหม่ ไม่มีการเขียนภาพกลับลง HTML
- ไม่มีข้อมูลห้องเริ่มต้น จึงไม่มีพื้นที่ห้องให้คลิกจนกว่าจะได้รับข้อมูลที่ยืนยันจริงและสร้าง Standalone ใหม่
- แอปไม่ตัดลานจอดรถจากภาพ PB ชั้น 1 ให้อัตโนมัติ
- นโยบายบริษัทอาจห้ามดาวน์โหลด HTML, เปิด file:// หรือรัน JavaScript ในไฟล์ท้องถิ่น ต้องให้ฝ่าย IT ยืนยันการอนุญาต แอปไม่เปลี่ยนหรือข้ามนโยบายดังกล่าว
- รองรับ Chrome / Edge รุ่นปัจจุบัน ไม่รองรับ Internet Explorer
- ฉบับนี้ผ่าน Final QA และผู้ใช้งานอนุมัติให้บันทึกลง branch `feature/ini-building-layout` แล้ว ดาวน์โหลดไฟล์จาก branch นี้ตามขั้นตอนด้านบน

## ผลการทดสอบ

- Microsoft Edge 155.0.4283.45 บน Linux เปิดไฟล์จริงผ่าน file:// โดย browser context เป็น offline ไม่ใช้ Server: ทุกป้ายและรายละเอียดตรงกันที่ Zoom 100%, 150%, 200% รวมถึงทุกชั้น, Back, Keyboard, Tablet, Pan/Reset
- ชุดทดสอบ Chromium ใน cloud ถูกนโยบายผู้ดูแลบล็อก file:// จึงทดสอบ inline HTML แบบ offline ด้วย setContent โดยบันทึกข้อจำกัดไว้ ไม่ได้แก้นโยบายผู้ดูแล
- ไม่มี JavaScript error หรือ HTTP/HTTPS request จากแอประหว่างทดสอบ
- ภาพที่ฝังใน HTML มี bytes ตรงกับ PNG ต้นฉบับทุก byte
- พิกัดครบ 21 จุดตรงกับภาพเมื่อ Resize 1600, 1024, 768 และ Zoom ทั้งสามระดับ
- ยังไม่ได้ทดสอบนโยบายเครื่อง Windows ของบริษัทโดยตรง

## สร้างไฟล์ใหม่สำหรับผู้ดูแลโครงการเท่านั้น

คำสั่งนี้ใช้บนเครื่องพัฒนาที่มี dependencies ของโครงการแล้ว ผู้ใช้ไฟล์ HTML ไม่ต้องรันคำสั่งใด ๆ

```bash
node scripts/build-standalone.mjs
```

สคริปต์อ่าน source และ config เดิม, build ลงโฟลเดอร์ชั่วคราว แล้วฝัง assets ทั้งหมดลง HTML โดยไม่แก้ไข React + TypeScript, package.json, README เดิม หรือ Vite config การอัปเดต Campus Map อ่านภาพจาก `src/assets/campus-original.png` ซึ่งเป็นสำเนาที่ไม่แก้ไขของไฟล์ `ini-campus-master.png.png` บน GitHub

รายงานตรวจรับล่าสุดอยู่ใน `FINAL-QA-REPORT.md`

การเตรียมและนำเข้าภาพ Floor Layout จริงของ CB/CSB/PB ดู `FLOOR-LAYOUT-IMPORT.md` ไฟล์ถาวรใน `src/assets/floor-layouts/` จะถูกฝังใน Standalone โดยไม่สร้างตำแหน่งห้องหรือเปลี่ยนสถานะการยืนยัน Layout

เวอร์ชัน Phase 2 ใน Workspace ผ่าน Recovery Verification แล้ว เพิ่มหน้า Overview อาคารและเส้นทางกลับจาก CB ชั้น 1 แต่ยังรอภาพจริง `CB-1.png` ผู้ใช้ตรวจรับและอนุมัติให้ Commit/Push ไปยัง `feature/ini-building-layout` แล้ว ดูผลทดสอบและข้อจำกัดใน [PHASE-2-STATUS.md](PHASE-2-STATUS.md) ห้าม Merge เข้า main และหยุดรอภาพ CB ชั้น 1 ก่อนเริ่มงานถัดไป

## อัปเดตภาพจริง CB ชั้น 1 (ตรวจรับแล้ว)

Standalone ใน Workspace ล่าสุดฝัง `src/assets/floor-layouts/CB-1.png` แล้ว เปิด CB ชั้น 1 จะเห็นภาพจริงแทน Placeholder รายงานล่าสุด: [CB-1-INTEGRATION-QA.md](CB-1-INTEGRATION-QA.md) ผู้ใช้อนุมัติให้ Commit/Push งาน CB ชั้น 1 แล้ว ไม่มีการ Merge เข้า main และยังไม่ได้ทดสอบเครื่อง Windows ของบริษัทโดยตรง

## อัปเดตภาพจริง CB ชั้น 2 (รอตรวจรับ)

Standalone ใน Workspace ล่าสุดฝัง `CB-1.png` และ `CB-2.png` แล้ว รองรับการเลือก CB ชั้น 1–2 พร้อมภาพจริง ส่วนชั้นที่ยังไม่มีภาพคง Placeholder รายงานล่าสุด: [CB-2-INTEGRATION-QA.md](CB-2-INTEGRATION-QA.md) งาน CB ชั้น 2 รอบนี้ยังไม่ Commit/Push/Merge

## อัปเดตภาพจริง CB ชั้น 3 (รอตรวจรับ)

Standalone ใน Workspace ล่าสุดฝังภาพจริง CB ชั้น 1–3 แล้ว รายงานล่าสุด: [CB-3-INTEGRATION-QA.md](CB-3-INTEGRATION-QA.md) พบ CB-4 บน GitHub แต่ยังไม่รวมในงานรอบนี้ ไม่มีการ Commit/Push/Merge งาน CB ชั้น 2–3 ที่ยังรอตรวจรับ

## อัปเดต CB ครบ 4 ชั้น (รอตรวจรับ)

Standalone ใน Workspace ล่าสุดฝังภาพจริง CB ชั้น 1–4 ครบแล้ว รายงานปัจจุบัน: [CB-4-INTEGRATION-QA.md](CB-4-INTEGRATION-QA.md) งานรวม CB ชั้น 2–4 รอบนี้ยังไม่ Commit/Push/Merge

## Phase 3: CSB ชั้น 1 (รอตรวจรับ)

Standalone ใน Workspace ล่าสุดฝัง CB ชั้น 1–4 และ CSB ชั้น 1 แล้ว CSB ชั้น 2–4 มีไฟล์บน GitHub แต่ยังไม่เชื่อมในรอบนี้ รายงานล่าสุด: [CSB-1-INTEGRATION-QA.md](CSB-1-INTEGRATION-QA.md) ไม่มี Commit/Push/Merge และหยุดรอตรวจรับก่อนดำเนินการ CSB ชั้น 2

## Phase 3: CSB ชั้น 2 (รอตรวจรับ)

Standalone ใน Workspace ล่าสุดฝัง CB ชั้น 1–4 และ CSB ชั้น 1–2 แล้ว รายงานล่าสุด: [CSB-2-INTEGRATION-QA.md](CSB-2-INTEGRATION-QA.md) ยังไม่เชื่อม CSB ชั้น 3–4 และไม่มี Commit/Push/Merge หยุดรอตรวจรับก่อนดำเนินการชั้น 3

## Phase 4: CSB ชั้น 3 (รอตรวจรับ)

Standalone ใน Workspace ล่าสุดฝัง CB ชั้น 1–4 และ CSB ชั้น 1–3 แล้ว รายงานล่าสุด: [CSB-3-INTEGRATION-QA.md](CSB-3-INTEGRATION-QA.md) ยังไม่เชื่อม CSB ชั้น 4 และไม่มี Commit/Push/Merge หยุดรอตรวจรับก่อนดำเนินการชั้น 4

## Phase 5: CSB ชั้น 4 (รอตรวจรับ)

Standalone ใน Workspace ล่าสุดฝัง CB ชั้น 1–4 และ CSB ชั้น 1–4 ครบ 8 ภาพ ตัวนับภาพจริงเริ่มต้น 8/11 รายงานล่าสุด: [CSB-4-INTEGRATION-QA.md](CSB-4-INTEGRATION-QA.md) ยังไม่ Commit/Push/Merge และหยุดรอตรวจรับก่อนเริ่ม PB ชั้น 1

## Phase 6: PB ชั้น 1 (รอตรวจรับ)

Standalone ล่าสุดฝัง CB/CSB ครบ 8 ชั้นและ PB ชั้น 1 รวมภาพพร้อมแสดง 9/11 รายงานล่าสุดและข้อสังเกตเรื่องขอบเขตตัวอาคาร: [PB-1-INTEGRATION-QA.md](PB-1-INTEGRATION-QA.md) ยังไม่เชื่อม PB ชั้น 2–3 และไม่ Commit/Push/Merge

## Phase 7: PB ชั้น 2 (รอตรวจรับขอบเขต)

Standalone ล่าสุดฝัง PB ชั้น 2 จากต้นฉบับโดยไม่ Crop เพราะขอบเขตลานจอดรถไม่ระบุชัดเจน ตัวนับภาพพร้อมแสดง 10/11 ซึ่งไม่ใช่การยืนยัน Layout รายงานล่าสุด: [PB-2-INTEGRATION-QA.md](PB-2-INTEGRATION-QA.md) รอตรวจรับขอบเขตตัวอาคารก่อนบันทึก ไม่มี Commit/Push/Merge และยังไม่เริ่ม PB ชั้น 3

## PB Layout Revision: ชั้น 1 v2 (รอตรวจรับ)

Standalone ล่าสุดเลือก PB-1-v2 และรักษา PB ชั้น 2 เดิม ตัวนับยังเป็น 10/11 ภาพเดิมและ Backup อยู่ใน Source ไม่ถูกลบ HTML ประมาณ 44.9 MB เพราะฝังภาพแนวตั้ง 5263 × 6144 ที่ความละเอียดเต็ม รายงาน Before/After: [PB-LAYOUT-REVISION-QA.md](PB-LAYOUT-REVISION-QA.md) ยังไม่เริ่ม Revision ชั้น 2–3 และไม่มี Commit/Push/Merge

## PB ชั้น 2 v2 (รอตรวจรับ)

Standalone ล่าสุดเลือก PB-1-v2 และ PB-2-v2 พร้อม CB/CSB ทั้ง 8 ชั้น ตัวนับคง 10/11 ไฟล์ประมาณ 67.1 MB เพื่อรักษาความละเอียดเต็ม รายงาน Before/After และข้อจำกัด Windows: [PB-2-V2-INTEGRATION-QA.md](PB-2-V2-INTEGRATION-QA.md) ไม่ Commit/Push/Merge และยังไม่เริ่ม PB ชั้น 3


## Owner Confirmation: PB ชั้น 2 v2

ขอบเขตภาพ PB ชั้น 2 v2 เป็น **Owner Approved** ตามคำยืนยันเจ้าของแบบวันที่ 14 ตุลาคม 2026 การตัด METAL SHEET ด้านซ้ายและพื้นที่ส่วนเกินขอบบน/ขอบขวาเป็นไปโดยตั้งใจ ไม่ใช่ข้อมูลสูญหาย คงภาพและ Standalone เดิมทุก byte ผล Interactive 6/6 เดิมคงไว้ ข้อสังเกตขอบเขตรอตรวจรับในรายงานย้อนหลังถูกปิดโดยคำยืนยันนี้ ดู [Final Acceptance ล่าสุด](PB-2-FINAL-ACCEPTANCE.md) Windows บริษัท **ยังไม่ได้ทดสอบ** ยังไม่เริ่ม PB ชั้น 3 และไม่ Commit/Push/Merge

## PB ชั้น 3 v2 (รอตรวจรับ)

Standalone ล่าสุดฝัง CB/CSB ทั้ง 8 ชั้นและ PB v2 ครบ 3 ชั้น ตัวนับภาพพร้อมแสดง 11/11 ไฟล์ประมาณ 90.5 MB เพื่อรักษาความละเอียดต้นฉบับ รายงานล่าสุด: [PB-3-V2-INTEGRATION-QA.md](PB-3-V2-INTEGRATION-QA.md) Owner Approved PB ชั้น 2 คงเดิม; PB ชั้น 3 รอตรวจรับแยก ไม่มี Commit/Push/Merge

## การส่งเวอร์ชันตรวจรับผ่าน GitHub

ผู้ใช้อนุมัติให้ Commit/Push เวอร์ชันตรวจรับไปยัง feature/ini-building-layout เพื่อดาวน์โหลดจาก Windows แล้ว ขอบเขต PB ชั้น 3 ยังคงรอเจ้าของแบบตรวจรับ ไม่ Merge เข้า main วิธีดาวน์โหลด ZIP/HTML: [DOWNLOAD-WINDOWS.md](DOWNLOAD-WINDOWS.md) ข้อความห้าม Commit/Push ในรายงานรอบก่อนเป็นสถานะก่อนคำอนุมัติ ไม่ใช่สถานะการส่งเวอร์ชันนี้
