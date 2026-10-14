# Phase 7 — PB ชั้น 2 Integration (รอตรวจรับขอบเขต)

วันที่ตรวจสอบ: 13 ตุลาคม 2026

## ภาพจริงและขอบเขตที่ต้องตรวจรับ

พบไฟล์ `src/assets/floor-layouts/pb-2.png` ใน GitHub Branch `feature/ini-building-layout` ตรวจหัวภาพด้วยสายตาระบุ “แผนผังอาคาร PB · ชั้น 2” ตรงกับ UI ไฟล์ PNG RGB 2100 × 1350 พิกเซล เปิดและ decode ใน Edge ได้ครบ SHA256: `fe1b5b86e1d95f06090204188e1fc7a2e7ccaee6afb3cfd1925dae6c9c6bd8d2`

ภาพมีส่วนแรเงา/แถบที่ระบุ SLOPE และ METAL SHEET รวมทางลาดประกอบ ไม่มีการระบุขอบเขตลานจอดรถชัดเจน จึง **ไม่ Crop โดยคาดเดา** และไม่อ้างว่าขอบเขตเฉพาะตัวอาคารได้รับการยืนยันแล้ว เวอร์ชันนี้ใช้ภาพต้นฉบับเพื่อให้ตรวจรับขอบเขต ต้องให้เจ้าของข้อมูลยืนยันว่าภาพปัจจุบันเป็นตัวอาคารทั้งหมดหรือระบุส่วนที่ต้องตัดออกก่อนบันทึก โดยคงห้อง ทางเดิน บันไดและทางหนีไฟครบถ้วน

ไม่มีการเพิ่มแปลนหรือพื้นที่จอดรถจากแหล่งอื่น ภาพใน Workspace และภาพที่ฝังใน Standalone ตรงกับ GitHub ทุก byte รักษาความละเอียดเต็ม 2100 × 1350 และอัตราส่วน 2100/1350 ไม่เปลี่ยน pixels หรือบิดภาพ ที่ Reset 100% แสดงครบทั้งภาพ เมื่อ Zoom ใช้ Pan สำรวจส่วนที่อยู่นอก viewport ได้

ข้อความ “02 / 04” ในหัวภาพคงเดิม ไม่ใช้อนุมานจำนวนชั้น ข้อมูล PB ยังเป็น 3 ชั้นตามข้อมูลยืนยันเดิม ส่วน PB ชั้น 2 ยังมีสถานะ Layout รอยืนยันตามข้อมูลเดิม ไม่เปลี่ยนสถานะเองเพียงเพราะได้รับภาพ

## ข้อมูลเดิมและตัวนับ

รักษาภาพ CB/CSB ครบ 8 ชั้นและ PB ชั้น 1 ภาพทั้ง 10 ไฟล์ใน Workspace ตรงกับ GitHub ทุก byte Master Map, Hotspots 21 จุด, fixture พิกัดและข้อมูลอาคาร CB/CSB/PB ตรงกับ Commit ฐาน `563918f14a714a46d8303276db0e33d87fd4425b` ทุก byte ไม่มีไฟล์ต้นฉบับถูกลบหรือชื่อ/ตำแหน่งห้องสมมติ

ตัวนับภาพพร้อมแสดง 10/11 ชั้น หมายถึงมีไฟล์ภาพ ไม่ใช่การยืนยันขอบเขตหรือข้อมูล Layout จำนวนอาคารยืนยัน 3 แห่ง, จำนวนชั้นยืนยัน 11 ชั้น และ Layout ยืนยัน 9 ชั้นคงเดิม PB ชั้น 3 ยังเป็น Placeholder ในเวอร์ชันนี้

## การทดสอบ

ผลรอบนี้: Build ผ่าน, Unit Tests 13/13 และ Browser/Regression Tests 42/42 ผ่าน (Chromium Offline 21 + Edge Offline 21) ไม่มี skipped หรือ flaky test

เพิ่ม Browser Test PB ชั้น 2: exact embedded bytes, natural size 2100 × 1350, aspect ratio Desktop 1600/Tablet 1024, Zoom 200%, Pan/Reset, กลับหน้าอาคารซึ่งยังระบุข้อมูล Layout รอยืนยันแล้วเปิดชั้น 2 อีกครั้ง, PB ชั้น 3 เป็น Placeholder, กลับ Master มี Hotspots 21 จุดและตัวนับ 10/11 รวม Regression CB/CSB ทั้ง 8 ชั้นและ PB ชั้น 1

Standalone เปิด Offline ใน Microsoft Edge 155.0.4283.45 บน Linux ผ่าน `file://` จริง ภาพ PB-2 decode ได้และ bytes ตรงต้นฉบับ อัตราส่วนถูกต้องทั้ง Desktop/Tablet ไม่พบ JavaScript errors หรือ HTTP(S) requests จากแอป HTML รวม CSS/JS/Fonts/ภาพ ไม่ใช้ CDN หรือ Server

ข้อจำกัด: ยังไม่ได้ตรวจ Edge บน Windows ของบริษัทโดยตรง Chromium ใน cloud ถูกนโยบายบล็อก `file://` จึงตรวจ inline HTML แบบ Offline ส่วน Edge ใช้ `file://` จริง

## ไฟล์ตรวจรับ

- `ini-building-layout-standalone.html`
- `/workspace/shared/ini-preview/pb2-real-1600.png`
- `/workspace/shared/ini-preview/pb2-real-1024.png`
- `/workspace/shared/ini-preview/pb2-offline-verification.json`

ยังไม่ Commit, Push หรือ Merge รักษางานก่อนหน้าทั้งหมด หยุดรอการตรวจรับ PB ชั้น 2 และขอบเขตตัวอาคารก่อนเริ่ม PB ชั้น 3
