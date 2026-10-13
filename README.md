# InI Interactive Building Layout

Web Application สำหรับสถาบันนวัตกรรม ปตท. ใช้ React + TypeScript + Vite + Tailwind CSS ธีม Navy, White และ Silver พร้อมฟอนต์ไทยที่อยู่ใน dependencies ไม่ต้องโหลดจากบริการภายนอก

## ติดตั้งและใช้งาน

ใช้ Node.js 22.12 ขึ้นไป และ npm

```bash
npm install
npm run dev
```

เปิด URL ที่ Vite แสดง (ปกติ http://localhost:5173)

Development Server ฟังที่ `0.0.0.0:5173` และใช้ `strictPort` หากพอร์ตไม่ว่างจะหยุดพร้อมแจ้งข้อผิดพลาด ไม่เปลี่ยน URL เป็นพอร์ตอื่นโดยอัตโนมัติ

หากรันใน cloud แล้วเปิดจาก Codex Browser บนอีกเครื่อง ต้องใช้ URL จากระบบ port forwarding ของสภาพแวดล้อมนั้น `localhost:5173` ใช้ได้เฉพาะเครื่องที่รันเซิร์ฟเวอร์ และ `0.0.0.0` เป็นที่อยู่สำหรับรับการเชื่อมต่อ ไม่ใช่ URL สำหรับเปิดเว็บไซต์ การได้ HTTP 200 ภายใน cloud ไม่ยืนยันว่า Browser ภายนอกเข้าถึงได้ ห้ามเปิด `index.html` โดยตรงเป็น `file://` เพราะต้องให้ Vite แปลง TypeScript และ resolve dependencies ก่อน

```bash
npm test        # ตรวจข้อมูลอาคารและข้อกำหนดที่ห้ามสร้างข้อมูลสมมติ
npm run build   # ตรวจ TypeScript และสร้าง production bundle ใน dist/
npm run preview # ดู production bundle ที่ http://localhost:4173
```

สามารถนำ `dist/` ไปใช้กับ static hosting ได้ ไม่มี backend หรือฐานข้อมูลในรุ่นนี้

## เปิดผ่าน Codex Desktop บน Windows

1. ติดตั้ง Git และ Node.js รุ่น LTS (22.12 ขึ้นไป) บน Windows
2. เปิด PowerShell แล้ว clone branch นี้ หากมี repository อยู่แล้วให้ใช้ `git fetch origin` และ `git switch feature/ini-building-layout` ในโฟลเดอร์เดิมแทน อย่าทับการแก้ไขที่ยังไม่ได้บันทึก

```powershell
git clone --branch feature/ini-building-layout https://github.com/aodtin99-star/ini-interactive-building-layout.git
cd ini-interactive-building-layout
npm.cmd ci
npm.cmd run dev
```

3. เปิดโฟลเดอร์ repository นี้เป็นโปรเจกต์ local ใน Codex Desktop โดยให้ Development Server รันบนเครื่อง Windows เครื่องเดียวกัน ไม่ใช่ใน cloud
4. เปิด `http://localhost:5173/` ในแผง Browser ของ Codex หรือขอให้ Codex เปิด URL นี้ หากรุ่นที่ใช้อยู่ไม่มีแผง Browser ให้เปิดใน Edge หรือ Chrome
5. เปิดเทอร์มินัลที่รัน Vite ค้างไว้ระหว่างใช้งาน หยุดด้วย `Ctrl+C` เมื่อเสร็จ หากแจ้งพอร์ต 5173 ไม่ว่าง ให้หยุดเซิร์ฟเวอร์เดิมของโปรเจกต์นี้ก่อน

ใช้ `npm.cmd` เพื่อหลีกเลี่ยงปัญหา PowerShell บล็อก `npm.ps1` โดยไม่ต้องแก้ execution policy วิธีนี้ไม่ต้องใช้ Cloud Preview หรือ port forwarding

## การใช้งาน

- Master Layout แสดงรายการอาคารและสถานะข้อมูล ไม่ใช่แผนที่ตำแหน่งอาคารจริง
- เลือก CB / CSB / PB จาก Sidebar หรือการ์ด แล้วเลือกชั้น
- Zoom 50–300%, ลากเพื่อ Pan และ Reset view (รองรับ mouse และ touch)
- นำเข้าภาพ PNG, JPG หรือ WebP ขนาดไม่เกิน 20 MB จากอุปกรณ์ ภาพจะอยู่เฉพาะเซสชันในเบราว์เซอร์ เมื่อรีเฟรชต้องนำเข้าใหม่ ไม่มีการส่งไฟล์ไปเซิร์ฟเวอร์
- PB ชั้น 1 ต้องยืนยันว่าภาพแสดงเฉพาะตัวอาคาร ไม่รวมลานจอดรถ แอปไม่สามารถตรวจหาหรือตัดลานจอดรถให้อัตโนมัติได้
- คลิกพื้นที่บนภาพหรือชื่อในรายละเอียด เพื่อแสดงข้อมูลห้อง เมื่อมีข้อมูลตำแหน่งที่ยืนยันแล้ว
- รองรับ Desktop และ Tablet รวมทั้งหน้าจอขนาดเล็ก; ปุ่มใช้งานด้วยคีย์บอร์ดได้

## สถานะข้อมูลเริ่มต้น

| อาคาร | ชั้น | ข้อมูล Layout | ภาพจริง  | ขอบเขต                       |
| ----- | ---- | ------------- | -------- | ---------------------------- |
| CB    | 1–4  | ยืนยันแล้ว    | ยังไม่มี | แปลนรายชั้น                  |
| CSB   | 1–4  | ยืนยันแล้ว    | ยังไม่มี | แปลนรายชั้น                  |
| PB    | 1    | ยืนยันแล้ว    | ยังไม่มี | เฉพาะตัวอาคาร ไม่รวมลานจอดรถ |
| PB    | 2–3  | รอข้อมูล      | ยังไม่มี | รอการยืนยัน                  |

ทุกชั้นแสดง Placeholder จนกว่าจะมีภาพจริง ไม่มีห้อง ขนาดอาคาร พิกัด หรือแปลนที่สมมติขึ้น ไอคอนอาคารบนการ์ดเป็นสัญลักษณ์สำหรับรายการเท่านั้น

## โครงสร้าง Source Code

```text
src/
  data/buildings.ts       ข้อมูลอาคาร ชั้น ภาพ และพื้นที่ (แยกจาก UI)
  data/buildings.test.ts  ตรวจความถูกต้องของข้อมูลเริ่มต้น
  components/PlanViewer.tsx  แสดงภาพและพื้นที่ Zoom / Pan / Reset
  App.tsx                Master Layout, Sidebar, เลือกชั้น, รายละเอียด, นำเข้าภาพ
  styles.css             Tailwind CSS และ responsive design
  main.tsx               React entry และฟอนต์ภาษาไทย
public/plans/             เก็บภาพแปลนจริงในอนาคต
```

## เพิ่มภาพถาวรและข้อมูลพื้นที่

1. เก็บภาพที่ได้รับจริงใน `public/plans/` สำหรับ PB ชั้น 1 ต้องตัดภาพให้เหลือเฉพาะตัวอาคารก่อน
2. ตั้ง `image` ของชั้นที่ตรงกันใน `src/data/buildings.ts` เป็นเส้นทาง `/plans/<ชื่อไฟล์>`
3. เพิ่มรายการ `areas` เฉพาะเมื่อได้รับชื่อ รายละเอียด และตำแหน่งที่ยืนยันแล้ว: `id`, `name`, `description`, `x`, `y`, `width`, `height`
4. พิกัดทั้งหมดเป็นเปอร์เซ็นต์ 0–100 ของภาพจริง โดย `x`, `y` คือมุมซ้ายบน ต้องให้ `x + width` และ `y + height` ไม่เกิน 100
5. PB ชั้น 2–3 เปลี่ยน `status` เป็น `confirmed` เมื่อได้รับการยืนยันจริงเท่านั้น การนำเข้าภาพจาก UI ไม่เปลี่ยนสถานะนี้

ไม่ใส่ตัวอย่างพิกัดห้องเพื่อป้องกันการเข้าใจผิดว่าเป็นแปลนจริง เพิ่มอาคารได้ด้วยการเพิ่ม object ใน `buildings` และรายการ `floors` โดยไม่ต้องแก้ส่วน Sidebar / Floor Selector / การ์ดอาคาร

ข้อมูลภาพที่นำเข้าจาก UI เป็นภาพทดแทนชั่วคราวของชั้นนั้น ระบบจะไม่แสดงตำแหน่งพื้นที่จาก dataset ทับบนภาพที่นำเข้าชั่วคราว เพื่อป้องกันพิกัดไม่ตรงกัน การแสดงพื้นที่คลิกได้ใช้ภาพถาวรและข้อมูลตำแหน่งที่ยืนยันใน dataset เท่านั้น

## Interactive Campus Map (ผ่าน Final QA)

แผนที่มี 21 ป้ายคลิกได้: Building 12 จุด, Facility 6 จุด และ Area 3 จุด ทุกหน้ามี Back to Master Layout ข้อมูลยืนยัน CB/CSB/PB เดิมคงไว้ใน `src/data/buildings.ts` และใช้สำหรับ KPI 3 อาคาร / 11 ชั้นเท่านั้น; จำนวนชั้นที่แจ้งไว้ของปลายทางอื่นอยู่ใน `src/data/buildingCatalog.ts` ระบุรอยืนยันและไม่รวมใน KPI

ตำแหน่งป้ายและรายการตรวจสอบอยู่ใน `CAMPUS-MAP-REVIEW.md` ปุ่มตรวจตำแหน่ง Hotspot จะแสดงหมายเลข 1–21 และรายชื่อใต้แผนที่ โดยไม่แก้ภาพต้นฉบับ

### Automated Tests สำหรับผู้พัฒนา

```bash
npm test
npx playwright install chromium
npm run test:e2e
```

`test:e2e` สร้าง Standalone ล่าสุดก่อนทดสอบ แต่ไม่เริ่ม Server ทดสอบการคลิกทุกป้ายที่ Zoom 100%, 150%, 200%, Floor Selector, Back, การปรับขนาด, Keyboard, Tablet, การส่งคำขอเครือข่าย และภาพต้นฉบับ ใช้ `npm run test:all` เพื่อรัน Unit และ Browser Tests ต่อกัน

หากมี Microsoft Edge อยู่แล้ว ให้กำหนด `INI_EDGE_EXECUTABLE` เป็น path ของ executable เพื่อเพิ่มชุด `edge-offline` ตัวอย่าง PowerShell บนเครื่องพัฒนา:

```powershell
$env:INI_EDGE_EXECUTABLE = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
npm.cmd run test:e2e
```

ปรับ path ตามการติดตั้งจริง สามารถกำหนด `INI_CHROMIUM_EXECUTABLE` เพื่อใช้ Chromium ที่ติดตั้งอยู่แทน browser ของ Playwright ได้ หาก Chromium ถูกนโยบายบล็อก file:// ชุด Chromium จะทดสอบ inline HTML แบบ offline และแนบข้อจำกัดไว้ ส่วนชุด Edge ต้องเปิด file:// ได้จริงจึงจะผ่าน ผู้ใช้ Standalone ไม่ต้องติดตั้ง Node.js, Git, Playwright หรือรันคำสั่งทดสอบเหล่านี้

## Final QA และ KPI ที่ยืนยันแล้ว

KPI นับเฉพาะ CB 4 ชั้น, CSB 4 ชั้น, PB 3 ชั้น (รวม 3 อาคาร / 11 ชั้น) จำนวนชั้นที่แจ้งไว้ของปลายทางอื่นยังรอยืนยันและไม่รวมในยอดสรุป แผนที่แยก Building / Facility / Area และคง Hotspot เดิมทั้ง 21 จุด รายงานข้อมูลยืนยัน/ข้อมูลที่ยังรอและผลการทดสอบอยู่ใน `FINAL-QA-REPORT.md` ผู้ใช้งานอนุมัติบันทึกลง `feature/ini-building-layout` แล้ว โดยไม่ Merge เข้า main

การเตรียมและนำเข้าภาพ Floor Layout จริงของ CB/CSB/PB ดู `FLOOR-LAYOUT-IMPORT.md` ไฟล์ถาวรใน `src/assets/floor-layouts/` จะถูกฝังใน Standalone โดยไม่สร้างตำแหน่งห้องหรือเปลี่ยนสถานะการยืนยัน Layout
