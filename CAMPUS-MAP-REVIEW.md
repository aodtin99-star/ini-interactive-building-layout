# Campus Map — Final QA / รอตรวจรับ

รายงานข้อมูลยืนยัน, KPI และผลทดสอบล่าสุด: `FINAL-QA-REPORT.md`

## ภาพต้นฉบับ

คงภาพ 1672 × 941 จาก `ini-campus-master.png.png` และสำเนา `src/assets/campus-original.png` โดยไม่แก้ pixels หรือย้ายป้ายชื่อ SHA-256:

```text
10995e5dcf25ab1e46394a7878d7884f3b584c68b86b86bf33343127dd5dfcbb
```

## พิกัดที่คงเดิมจากการตรวจด้วยสายตา

ทุกค่าตรงกับ `tests/fixtures/verified-hotspots.json` อ้างอิงภาพต้นฉบับทั้งภาพ พิกัดไม่ใช่ขอบเขตตัวอาคารหรือข้อมูลห้อง

| หมายเลข | ชื่อบนภาพ         | ประเภท   | x, y, width, height |
| ------- | ----------------- | -------- | ------------------- |
| 1       | PB                | Building | 239, 253, 62, 33    |
| 2       | UB                | Building | 37, 302, 65, 33     |
| 3       | ALB               | Building | 129, 304, 76, 33    |
| 4       | CSB               | Building | 274, 327, 70, 33    |
| 5       | CB                | Building | 414, 318, 60, 33    |
| 6       | FLB               | Building | 300, 397, 66, 33    |
| 7       | TCB               | Building | 633, 328, 62, 32    |
| 8       | LSB               | Building | 225, 543, 68, 34    |
| 9       | EAL               | Building | 979, 708, 62, 32    |
| 10      | BPU               | Building | 283, 756, 70, 31    |
| 11      | FUES              | Building | 164, 620, 73, 32    |
| 12      | Chemical Blending | Facility | 107, 499, 99, 50    |
| 13      | Fuel Blending     | Facility | 188, 359, 65, 38    |
| 14      | SUB 115 KV        | Facility | 37, 523, 55, 39     |
| 15      | Gas Mixing        | Facility | 851, 704, 72, 43    |
| 16      | Waste Storage     | Facility | 66, 147, 66, 40     |
| 17      | Parking           | Facility | 384, 534, 87, 30    |
| 18      | GH                | Building | 1185, 544, 41, 26   |
| 19      | POND 1            | Area     | 842, 448, 93, 30    |
| 20      | POND 2            | Area     | 1096, 361, 95, 29   |
| 21      | POND 3            | Area     | 1027, 187, 99, 30   |

## การแสดงผลและข้อมูล

Building ใช้กรอบ Navy, Facility ใช้ Silver, Area ใช้ Slate เฉพาะโหมดตรวจสอบและ Hover/Focus ทุก Hotspot โปร่งใส หมายเลขอยู่นอกข้อความ และ tooltip แสดงในแถบใต้แผนที่เพื่อไม่ทับป้ายอื่น

KPI นับเฉพาะ CB 4 ชั้น, CSB 4 ชั้น และ PB 3 ชั้น รวม 3 อาคาร / 11 ชั้น จำนวนชั้นที่แจ้งไว้ของปลายทางอื่นยังรอยืนยันและไม่รวมยอดสรุป Gas Mixing เป็น Facility Detail โดยไม่มีจำนวนชั้นสมมติ ส่วน POND 1–3 เป็น Area Detail ข้อมูล Layout และ Floor Viewer เดิมไม่เปลี่ยน

## Final QA

- Build ผ่าน; Unit Tests 12 ผ่าน; Browser Tests 18 ผ่าน
- ตรวจทุกปลายทางและประเภท, ทุกชั้น, Back, Zoom 100/150/200%, Resize, Keyboard, Tablet, Pan/Reset และ KPI ไม่เปลี่ยนตามปลายทางที่รอยืนยัน
- Microsoft Edge 155 บน Linux เปิด Standalone จริงผ่าน file:// แบบ Offline ได้
- Chromium ใน cloud ทดสอบ inline HTML แบบ Offline เพราะนโยบายผู้ดูแลบล็อก file:// โดยไม่เปลี่ยนนโยบาย
- ภาพที่ฝังตรงกับต้นฉบับทุก byte; ไม่พบ JavaScript error หรือ HTTP(S) request จากแอป

ผู้ใช้งานอนุมัติให้บันทึกเวอร์ชันนี้ลง `feature/ini-building-layout` แล้ว ห้าม Merge เข้า main
