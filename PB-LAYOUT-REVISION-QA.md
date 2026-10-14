# PB Layout Revision — PB ชั้น 1 v2

วันที่ตรวจสอบ: 14 ตุลาคม 2026

## ขอบเขต

พบ `PB-1-v2.png`, `PB-2-v2.png`, `PB-3-v2.png` บน GitHub Branch `feature/ini-building-layout` รอบนี้เปลี่ยนเฉพาะ PB ชั้น 1 และหยุดรอการตรวจรับก่อนชั้นถัดไป PB ชั้น 2 ยังคงภาพเดิม และ PB ชั้น 3 ยังไม่เชื่อม

ไฟล์ใหม่ต้นทาง GitHub: `src/assets/floor-layouts/PB-1-v2.png`

ไฟล์ใหม่ที่ใช้ใน Workspace: `src/assets/floor-layout-revisions/PB-1-v2.png`

ไฟล์เดิมยังคงอยู่: `src/assets/floor-layouts/pb-1.png`

Backup เพิ่มเติม: `src/assets/floor-layout-backups/pb-1-before-v2.png` มี bytes ตรงกับภาพเดิมทุก byte อยู่นอก glob ภาพใช้งานจึงไม่เกิดภาพซ้ำหรือถูกนับเป็นชั้นเพิ่ม

| รายการ | Before | After |
| --- | --- | --- |
| ไฟล์ | pb-1.png | PB-1-v2.png |
| ขนาด | 2100 × 1350 RGB | 5263 × 6144 RGBA |
| สัดส่วน | แนวนอน 14/9 | แนวตั้ง 5263/6144 |
| SHA256 | 96a62d33d89479f888265ef89126693e416e14ebae079ac53c3422e4979457a0 | b04d8b13bdf083b69db93242bfec3fca1f78281111f652261057c304d6e65d84 |

ตรวจหัวภาพใหม่ระบุ PB ชั้น 1 ตรงกับชั้นเป้าหมาย ภาพใหม่มีป้ายหมายเลขห้องอยู่ในภาพที่ผู้ใช้จัดส่ง ไม่ได้สร้างชื่อ/พิกัดห้องหรือ Interactive Room Hotspots เพิ่ม ภาพเขียน “อาคาร PB | 4 ชั้น” แต่คงข้อมูล PB 3 ชั้นที่ยืนยันเดิม ไม่ใช้ข้อความภาพเปลี่ยนจำนวนชั้นเอง

## ภาพต้นฉบับและขอบเขต

ไม่แก้ไข pixels ไม่ลดความละเอียด ไม่ครอบตัดหรือบิดภาพ Viewer ใช้ natural dimensions ของภาพแนวตั้งใหม่และรักษาสัดส่วนตามไฟล์ใหม่โดยตรง ไม่บังคับอัตราส่วนของ Before ภาพที่ฝังใน Standalone ตรงกับ GitHub ทุก byte

ภาพใหม่ไม่ระบุลานจอดรถหรือช่องจอดรถชัดเจน มีพื้นที่ GREEN/ทางเข้าประกอบ จึงไม่ Crop เพิ่มโดยคาดเดา ต้องตรวจรับขอบเขตอาคารจาก Before/After ก่อนบันทึก หากมีส่วนใดต้องตัด ให้ระบุขอบเขตที่ยืนยันโดยรักษาบันได ทางเดินและทางหนีไฟ

## การเลือก Revision

`src/data/floorImages.ts` เพิ่ม `activeFloorRevisions` เลือก PB-1-v2 เฉพาะ key PB-1 จากโฟลเดอร์ Revision แยก หลังอ่านภาพเดิมแล้ว override เฉพาะ key นี้ ไม่แก้ metadata อาคาร ตรวจว่ามีทั้งต้นฉบับและ Revision ก่อนเลือก สามารถย้อนกลับต้นฉบับโดยยกเลิก key ที่เลือกและสร้าง Standalone ใหม่ ไม่ลบภาพใด

ตรวจภาพ CB/CSB ทั้ง 8 ชั้น, PB ชั้น 1 เดิมและ PB ชั้น 2 ตรงกับ GitHub ทุก byte Master Map, Hotspots 21 จุดและข้อมูล CB/CSB/PB ตรงกับ Commit ฐาน `563918f14a714a46d8303276db0e33d87fd4425b` ทุก byte ไม่มีไฟล์ต้นฉบับถูกลบ

ตัวนับภาพพร้อมแสดงคง 10/11 เพราะ Revision เปลี่ยนภาพของ PB ชั้น 1 เดิม ไม่เพิ่มชั้นใหม่ PB ชั้น 2–3 ยังรอยืนยันข้อมูล Layout ตามข้อมูลเดิม

## การทดสอบและข้อจำกัด

ผลรอบนี้: Build ผ่าน, Unit Tests 14/14 และ Browser/Regression Tests 42/42 ผ่าน (Chromium Offline 21 + Edge Offline 21) ไม่มี skipped หรือ flaky test

Build และ Unit Tests ตรวจการเลือก Revision เฉพาะ PB-1, PB-2 ยังคงภาพเดิมและ metadata ยังเดิม Browser/Regression Tests ตรวจภาพใหม่ bytes ตรงต้นฉบับ, natural dimensions 5263 × 6144, aspect ratio Desktop/Tablet, Zoom/Pan/Reset และ Back Navigation รวม CB/CSB ทั้ง 8 ชั้นและ PB ชั้น 2

Microsoft Edge 155.0.4283.45 บน Linux เปิด Standalone ผ่าน `file://` จริงแบบ Offline ได้ ภาพใหม่ตรงต้นฉบับและอัตราส่วนถูกต้อง ไม่พบ JavaScript errors หรือ HTTP(S) requests จากแอป Chromium ใน cloud ถูกนโยบายบล็อก `file://` จึงตรวจ inline HTML Offline ยังไม่ได้ตรวจ Windows ของบริษัทโดยตรง

Edge runtime ใน /tmp จากรอบก่อนหายไป จึงดาวน์โหลดแพ็กเกจ Microsoft Edge จาก Microsoft และแตกลง /tmp เพื่อทดสอบ ไม่แก้ Source Code หรือเครื่องมือของโครงการอื่น

Standalone ประมาณ 44.9 MB เนื่องจากเก็บภาพ Revision ความละเอียดเต็ม อาจใช้เวลาเปิดมากกว่ารุ่นเดิม ไม่มีการลดคุณภาพเพื่อให้ไฟล์เล็กลง ภาพเดิมและ Backup เก็บใน Source Repository ไม่ฝังสำเนาซ้ำใน HTML สำหรับผู้ใช้

## ไฟล์ตรวจรับ

- Before: `/workspace/shared/ini-preview/pb1-real-1600.png`
- After: `/workspace/shared/ini-preview/pb1-v2-1600.png`
- Tablet: `/workspace/shared/ini-preview/pb1-v2-1024.png`
- `ini-building-layout-standalone.html`

ยังไม่ Commit, Push หรือ Merge รักษางานก่อนหน้าทั้งหมด และหยุดรอการตรวจรับก่อนเปลี่ยน PB ชั้นถัดไป
