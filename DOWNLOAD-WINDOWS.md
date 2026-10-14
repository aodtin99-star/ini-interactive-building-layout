# ดาวน์โหลดเวอร์ชันตรวจรับบน Windows

เวอร์ชันนี้มีภาพจริง CB 4 ชั้น, CSB 4 ชั้น และ PB v2 3 ชั้นครบ 11/11 ชั้น PB ชั้น 2 ขอบเขต Owner Approved ส่วน PB ชั้น 3 **ยังรอเจ้าของแบบตรวจรับขอบเขต** เป็นเวอร์ชันส่งตรวจ ไม่ใช่การ Merge หรือเผยแพร่เข้า main

## วิธีแนะนำ: ดาวน์โหลด ZIP ผ่านเบราว์เซอร์

1. เปิดไฟล์ ZIP บน Branch feature/ini-building-layout:
   https://github.com/aodtin99-star/ini-interactive-building-layout/blob/feature/ini-building-layout/downloads/ini-building-layout-review.zip
2. คลิก Download raw file หรือ View raw เพื่อดาวน์โหลด ZIP หาก Repository เป็น private ต้องเข้าสู่ระบบ GitHub ที่มีสิทธิ์ก่อน
3. ไปยัง Downloads คลิกขวา ZIP → Extract All → Extract ใช้ฟังก์ชันที่มีใน Windows ไม่ต้องติดตั้งโปรแกรมเพิ่ม
4. ในโฟลเดอร์ที่แตกไฟล์ คลิกขวา ini-building-layout-standalone.html → Open with → Microsoft Edge
5. ทดสอบ Offline โดยปิด Internet หลังดาวน์โหลด/แตกไฟล์ แล้วเปิด HTML อีกครั้ง

ZIP เป็นช่องทางส่งไฟล์ที่บีบอัดแบบไม่สูญเสียข้อมูล หลังแตก HTML และภาพภายในคง bytes เดิม ไม่ต้องใช้ Server หรือ Internet ระหว่างใช้งาน ห้ามพยายามเปิด HTML โดยตรงภายใน ZIP ก่อนแตกไฟล์

## ดาวน์โหลดเฉพาะ HTML

https://github.com/aodtin99-star/ini-interactive-building-layout/blob/feature/ini-building-layout/ini-building-layout-standalone.html

คลิก Download raw file หากไม่พบ ให้ใช้ ZIP ตามวิธีข้างต้น อย่าบันทึกหน้าเว็บ GitHub ด้วย Ctrl+S เพราะจะได้หน้าแสดงโค้ดของ GitHub ไม่ใช่ HTML แอป

## ตรวจรับ

เลือก Master → PB → ชั้น 1–3 ตรวจ Floor Selector, Zoom, Pan, Reset และกลับหน้าอาคาร/Master ไม่อัปโหลดภาพจากเครื่องไป Server ไม่ใช้ CDN ภาพที่นำเข้าขณะเปิดใช้งานเป็นข้อมูลชั่วคราว

ขอบเขต PB ชั้น 3 รอคำยืนยันเจ้าของแบบ ไม่ Crop หรือวาดเพิ่มเอง และไม่สร้าง Room Hotspots สมมติ

ทดสอบ Offline ผ่าน Edge บน Linux แล้ว **Microsoft Edge บน Windows บริษัท: ยังไม่ได้ทดสอบ** หากถูกนโยบายบริษัทบล็อกไฟล์ HTML ให้แจ้งข้อความที่ Edge แสดง ไม่เปลี่ยนนโยบายเครื่องเอง

รายงานตรวจรับ: FINAL-PB-3-ACCEPTANCE-QA.md และ PB-3-V2-INTEGRATION-QA.md
