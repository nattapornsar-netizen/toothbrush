// วาง URL ของ Google Apps Script (Web app) ตรงนี้
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxCRt0SZErtoM96i7NtmnKmpNfqXD4EGHjfLZzDpK53xfou091yHFmG1bF3ngdVtbmgyA/exec";

// สินค้าสำรอง (ใช้ตอนยังไม่ได้ต่อ Google Sheet)
const FALLBACK_PRODUCTS = [
  { sku: "TB-001", name: "แปรงสีฟัน Soft Clean", price: 59, image: "images/soft.svg", stock: 100, desc: "ขนแปรงนุ่มพิเศษ ถนอมเหงือก" },
  { sku: "TB-002", name: "แปรงสีฟัน Charcoal", price: 79, image: "images/charcoal.svg", stock: 100, desc: "ขนแปรงชาร์โคล ลดคราบ ลดกลิ่น" },
  { sku: "TB-003", name: "แปรงสีฟันเด็ก Kids", price: 49, image: "images/kids.svg", stock: 100, desc: "หัวเล็ก ด้ามจับง่าย สำหรับเด็ก" }
];

async function loadProducts() {
  if (!SCRIPT_URL.startsWith("http")) return FALLBACK_PRODUCTS;
  try {
    const r = await fetch(SCRIPT_URL + "?action=products");
    return await r.json();
  } catch (e) { return FALLBACK_PRODUCTS; }
}

async function api(body) {
  const r = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(body)
  });
  return r.json();
}
