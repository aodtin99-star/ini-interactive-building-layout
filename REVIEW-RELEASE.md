# เวอร์ชันตรวจรับสำหรับดาวน์โหลดจาก GitHub

วันที่บันทึก: 14 ตุลาคม 2026

ผู้ใช้อนุมัติให้ Commit และ Push ไปยัง feature/ini-building-layout เพื่อดาวน์โหลดเวอร์ชันตรวจรับ ไม่ Merge เข้า main ขอบเขต PB ชั้น 2 เป็น Owner Approved ส่วน PB ชั้น 3 **ยังรอเจ้าของแบบตรวจรับ** ไม่ถือว่าอนุมัติขอบเขตชั้น 3 แล้ว

ภาพจริงครบ CB 4, CSB 4 และ PB v2 3 ชั้น รวม 11/11 ภาพ คง metadata จำนวนชั้นและ Layout เดิม ไม่มี Room Hotspots สมมติ Master และพิกัด Hotspots 21 จุดไม่เปลี่ยนแปลง ภาพต้นฉบับและ Backup คงครบ

ตรวจ Build ผ่าน, Unit Tests 14/14 และ Browser Tests ก่อนส่ง 14/14 ผ่าน ครอบคลุมทุก Hotspot ที่ Zoom 100/150/200%, PB ทั้ง 3 ชั้น, Keyboard, Pan/Reset, Back Navigation และ KPI ภาพจริง ชุด Regression รอบพัฒนาเต็มก่อนหน้า 44/44 ผ่าน

แพ็ก downloads/ini-building-layout-review.zip ขนาด 67,002,932 bytes มี HTML และ README สำหรับ Windows ตรวจ CRC และแตก HTML เท่ากับต้นฉบับทุก byte HTML ขนาด 90,484,363 bytes SHA256 fe0556678e0a3467ead6c84a043032f65905be72e3657d54183bde3e45061c40

ทดสอบ Offline file:// ด้วย Edge บน Linux ผ่าน **Microsoft Edge บน Windows บริษัท: ยังไม่ได้ทดสอบ**

รักษา Commit ภาพที่ผู้ใช้อัปโหลดบน GitHubไว้ทั้งหมด ก่อน Commit ปรับ glob ภาพเดิมให้เว้นไฟล์ *-v2.png ที่ GitHubเพิ่มใน floor-layouts โดยใช้ Revision จากโฟลเดอร์แยกตามระบบที่ทดสอบแล้ว ไม่ลบ/แก้ภาพต้นฉบับเหล่านั้นและไม่โหลดชื่อ Revision เป็นชั้นสมมติ

วิธีดาวน์โหลด/เปิด: [DOWNLOAD-WINDOWS.md](DOWNLOAD-WINDOWS.md)

รายงานขอบเขตและข้อจำกัด: [FINAL-PB-3-ACCEPTANCE-QA.md](FINAL-PB-3-ACCEPTANCE-QA.md) ข้อความห้าม Commit/Push ในรายงานก่อนหน้าเป็นประวัติสถานะก่อนผู้ใช้อนุมัติรอบส่งตรวจนี้
