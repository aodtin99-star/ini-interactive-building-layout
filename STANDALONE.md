# InI Interactive Building Layout — Standalone

ไฟล์ `ini-building-layout-standalone.html` รวมแอป React เดิม, JavaScript, CSS, ไอคอนและฟอนต์ทั้งหมดไว้ในไฟล์เดียว ขนาดประมาณ 1.7 MB ไม่ใช้ CDN, Server หรือ Internet ระหว่างใช้งาน ไม่ต้องติดตั้ง Git หรือ Node.js บนเครื่องผู้ใช้

## ดาวน์โหลดจาก GitHub ด้วยเบราว์เซอร์

1. เปิดหน้าไฟล์ใน branch `feature/ini-building-layout`:
   https://github.com/aodtin99-star/ini-interactive-building-layout/blob/feature/ini-building-layout/ini-building-layout-standalone.html
2. หาก repository เป็น private ให้เข้าสู่ระบบ GitHub ด้วยบัญชีที่มีสิทธิ์เข้าถึง
3. ใช้ปุ่ม **Download raw file** ของหน้าไฟล์ หรือเปิด **Raw** แล้วกด `Ctrl+S` เลือกชนิดไฟล์ **All files** ถ้ามี และตั้งชื่อเป็น `ini-building-layout-standalone.html` อย่าบันทึกหน้าเว็บ GitHub ที่ยังไม่ได้เปิด Raw
4. เก็บไฟล์ในโฟลเดอร์ที่บริษัทอนุญาต แล้วดับเบิลคลิกเพื่อเปิดด้วย Chrome หรือ Edge หรือคลิกขวา > Open with > Chrome / Edge
5. สามารถปิด Internet หลังดาวน์โหลดเสร็จ และใช้งานไฟล์ต่อได้

อีกวิธีคือหน้า repository เลือก branch นี้ แล้วเลือก **Code > Download ZIP** จากนั้นใช้ **Extract All** ของ Windows และเปิดไฟล์ HTML ในโฟลเดอร์ที่แตกแล้ว

## การใช้งาน

- Master Layout และ Sidebar เลือก CB 4 ชั้น, CSB 4 ชั้น และ PB 3 ชั้น
- เลือกชั้น ใช้ + / − เพื่อซูม ลากเพื่อ Pan และ Reset view เพื่อกลับตำแหน่งเริ่มต้น
- นำเข้าภาพ PNG, JPG หรือ WebP จากเครื่อง ขนาดไม่เกิน 20 MB ภาพใช้ผ่าน blob URL ในหน่วยความจำ ไม่ส่งไปยังเซิร์ฟเวอร์
- PB ชั้น 1 ต้องยืนยันว่าภาพมีเฉพาะตัวอาคาร ไม่รวมลานจอดรถ
- PB ชั้น 2–3 ยังรอข้อมูล การนำเข้าภาพไม่เปลี่ยนสถานะการยืนยัน
- ใช้ Placeholder จนกว่าจะนำเข้าภาพจริง ไม่มีตำแหน่งห้องสมมติ

## ข้อจำกัด

- ภาพที่นำเข้าอยู่เฉพาะเซสชัน เมื่อปิดหรือรีเฟรชไฟล์จะต้องนำเข้าใหม่ ไม่มีการบันทึกภาพกลับลง HTML
- ไม่มีข้อมูลตำแหน่งห้องเริ่มต้น จึงไม่มีพื้นที่ห้องให้คลิกจนกว่าผู้ดูแลจะเพิ่มข้อมูลที่ยืนยันจริงใน source แล้วสร้าง standalone ใหม่
- การนำเข้าภาพชั่วคราวไม่แสดง hotspots จาก dataset เพื่อป้องกันพิกัดไม่ตรงกับภาพ
- แอปไม่ได้ตรวจหาหรือตัดลานจอดรถอัตโนมัติ ต้องใช้ภาพ PB ชั้น 1 ที่มีขอบเขตถูกต้อง
- นโยบายของบริษัทอาจห้ามดาวน์โหลด HTML, เปิด `file://` หรือรัน JavaScript ในไฟล์ท้องถิ่น ต้องให้ฝ่าย IT ยืนยันการอนุญาต แอปไม่เปลี่ยนหรือข้ามนโยบายดังกล่าว
- รองรับ Chrome / Edge รุ่นปัจจุบัน ไม่รองรับ Internet Explorer

## ผลการทดสอบ

- ทดลองเปิด URL `file://` โดยตรงใน Chromium ที่ติดตั้งในสภาพแวดล้อม cloud: ถูกนโยบายผู้ดูแลบล็อกด้วย `net::ERR_BLOCKED_BY_ADMINISTRATOR` ก่อนแอปทำงาน จึงไม่สามารถยืนยันผล double-click บน Windows จากสภาพแวดล้อมนี้
- ทดสอบ HTML เดียวกันด้วย Chromium โดยโหลดเนื้อหาเข้าเอกสารผ่าน Playwright `setContent` และตั้ง browser context เป็น offline ไม่ใช้ Server: Master Layout, เมนู CB/CSB/PB, ชั้น, Zoom, Pan, Reset และนำเข้าภาพ PNG ผ่าน blob URL ทำงาน
- ไม่พบ JavaScript console error หรือ HTTP/HTTPS request ในการทดสอบแบบ offline
- ทดสอบหน้าจอ Desktop และ Tablet 1024×768 ไม่มี horizontal overflow

## สร้างไฟล์ใหม่สำหรับผู้ดูแลโครงการเท่านั้น

คำสั่งนี้ใช้บนเครื่องพัฒนาที่มี dependencies ของโครงการแล้ว ผู้ใช้ไฟล์ HTML ไม่ต้องรันคำสั่งใด ๆ

```bash
node scripts/build-standalone.mjs
```

สคริปต์อ่าน source และ config เดิม, build ลงโฟลเดอร์ชั่วคราว แล้วฝัง assets ทั้งหมดลง HTML โดยไม่แก้ไข React + TypeScript, package.json, README เดิม หรือ Vite config ไฟล์ที่เพิ่มสำหรับรุ่น standalone มีเพียง HTML, สคริปต์สร้างไฟล์ และเอกสารนี้
