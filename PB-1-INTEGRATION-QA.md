# Phase 6 — PB ชั้น 1 Floor Layout Integration

วันที่ตรวจสอบ: 13 ตุลาคม 2026

## ภาพจริงและขอบเขต

พบไฟล์ `src/assets/floor-layouts/pb-1.png` (ชื่อไฟล์บน GitHub เป็นตัวพิมพ์เล็ก) ใน Branch `feature/ini-building-layout` ใช้ชื่อเดิม ระบบจับคู่เป็น PB ชั้น 1 ได้ ตรวจภาพด้วยสายตาหัวข้อ “แผนผังอาคาร PB · ชั้น 1” ตรงกับชั้นที่เลือก ภาพ PNG RGB 2100 × 1350 พิกเซล เปิดและ decode ใน Edge ได้ครบ

SHA256: `96a62d33d89479f888265ef89126693e416e14ebae079ac53c3422e4979457a0`

ภาพต้นฉบับที่ได้รับแสดงแปลนตัวอาคาร PB และบริเวณทางเข้า/ทางออกประกอบ ไม่พบพื้นที่ระบุเป็นลานจอดรถหรือแถวช่องจอดรถในภาพนี้ จึงไม่ทำ crop เพิ่มซึ่งอาจตัดห้อง ทางเดิน บันไดหรือทางหนีไฟ และไม่เพิ่มภาพ/พื้นที่ลานจอดรถอื่นจาก Master Map ภาพที่ฝังตรงกับต้นฉบับทุก byte รักษาความละเอียดเต็มและอัตราส่วน 2100/1350

คง `scope: building-only` ของ PB ชั้น 1 และแสดงข้อความ “แสดงเฉพาะตัวอาคาร ไม่รวมพื้นที่ลานจอดรถ” ตามข้อมูลเดิม ต้องตรวจรับขอบเขตภาพจากภาพตัวอย่างก่อนบันทึก หากเจ้าของข้อมูลระบุว่าบริเวณใดในภาพเป็นลานจอดรถ ต้องได้รับขอบเขตที่ยืนยันก่อนตัดภาพ ไม่คาดเดาแนวตัดผ่านทางหนีไฟ

ข้อความ “01 / 04” ในหัวภาพคงเดิมโดยไม่ใช้อนุมานจำนวนชั้น ข้อมูล PB ในระบบยังเป็น 3 ชั้นตามข้อมูลยืนยันเดิม

## ข้อมูลเดิมและตัวนับ

ภาพ CB ชั้น 1–4 และ CSB ชั้น 1–4 คงเดิม ตรงกับ GitHub ทุก byte Master Map, Hotspots 21 จุด, fixture พิกัด และข้อมูล CB/CSB/PB ตรงกับ Commit ฐาน `563918f14a714a46d8303276db0e33d87fd4425b` ทุก byte ไม่พบไฟล์ต้นฉบับถูกลบ ไม่มี room hotspots หรือตำแหน่ง/ชื่อห้องสมมติ

ภาพพร้อมแสดงเป็น 9/11 ชั้น: CB 4, CSB 4 และ PB ชั้น 1 จำนวนอาคารยืนยัน 3 แห่ง, จำนวนชั้นยืนยัน 11 ชั้น, Layout ยืนยัน 9 ชั้นคงเดิม การนำเข้าทดลองทับภาพชั้นที่มีภาพแล้วไม่เพิ่มตัวนับซ้ำ PB ชั้น 2–3 ยังเป็น Placeholder ในเวอร์ชันนี้ แม้พบไฟล์ `pb-2.png` และ `pb-3.png` บน GitHubแล้ว ยังไม่นำเข้าและไม่เปลี่ยนสถานะรอยืนยัน Layout เอง

## การทดสอบ

ผลรอบนี้: Build ผ่าน, Unit Tests 13/13 และ Browser/Regression Tests 40/40 ผ่าน (Chromium Offline 20 + Edge Offline 20) ไม่มี skipped หรือ flaky test

เพิ่ม Browser Test PB ชั้น 1: exact embedded bytes, natural size 2100 × 1350, อัตราส่วน Desktop 1600/Tablet 1024, scope notice ไม่รวมที่จอดรถ, Zoom 200%, Pan/Reset, กลับหน้าอาคารและเปิดชั้น 1 อีกครั้ง, PB ชั้น 2–3 เป็น Placeholder, กลับ Master มี Hotspots 21 จุดและตัวนับ 9/11 พร้อม Regression CB/CSB ทั้ง 8 ชั้นและ Hotspots ทุกจุดที่ Zoom 100/150/200%

Standalone เปิด Offline ใน Microsoft Edge 155.0.4283.45 บน Linux ผ่าน `file://` จริง ภาพ PB-1 decode ได้ครบ อัตราส่วนถูกต้อง และ bytes ตรงต้นฉบับ ไม่พบ JavaScript errors หรือ HTTP(S) requests จากแอป HTML รวม CSS/JS/Fonts/ภาพในไฟล์เดียว ไม่มี CDN หรือ Server

ข้อจำกัด: ยังไม่ได้ทดสอบ Microsoft Edge บน Windows ของบริษัทโดยตรง Chromium ใน cloud ถูกนโยบายบล็อก `file://` จึงตรวจ inline HTML แบบ Offline ส่วน Edge ใช้ `file://` จริง

## ไฟล์ตรวจรับ

- `ini-building-layout-standalone.html`
- `/workspace/shared/ini-preview/pb1-real-1600.png`
- `/workspace/shared/ini-preview/pb1-real-1024.png`
- `/workspace/shared/ini-preview/pb1-offline-verification.json`

ยังไม่ Commit, Push หรือ Merge รักษางานก่อนหน้าทั้งหมด และหยุดรอการตรวจรับก่อนเริ่ม PB ชั้น 2
