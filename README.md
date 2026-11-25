# 🪥 ร้านแปรงดี — แลนดิ้งเพจขายแปรงสีฟัน

- สินค้า 3 แบบ (รหัส TB-001, TB-002, TB-003)
- ข้อมูลสินค้า + ออเดอร์เก็บใน Google Sheet
- รูปอยู่ในโฟลเดอร์ `images/`
- หน้า `admin.html` = ใบหยิบสินค้า + ตรวจแพ็ค + พิมพ์ใบจ่าหน้าพัสดุ
- Deploy บน Vercel

## โครงสร้าง
```
index.html        หน้าร้าน
admin.html        หลังร้าน (หยิบ/แพ็ค/จ่าหน้า)
style.css
config.js         ใส่ SCRIPT_URL
images/           รูปสินค้า
apps-script/Code.gs  โค้ด Google Sheet
```

## วิธีทำ
1. สร้าง Google Sheet ใหม่ → ส่วนขยาย → Apps Script → วางโค้ด `Code.gs`
2. เลือกฟังก์ชัน `setup` → กด Run (อนุญาตสิทธิ์)
3. Deploy → New deployment → Web app → Who has access: **Anyone** → คัดลอก URL
4. เอา URL ไปใส่ใน `config.js` ตรง `SCRIPT_URL`
5. อัปทั้งโฟลเดอร์ขึ้น GitHub
6. Vercel → Add New Project → เลือก repo → Deploy
