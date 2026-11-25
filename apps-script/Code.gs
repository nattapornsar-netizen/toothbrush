// วางโค้ดนี้ใน Google Sheet > ส่วนขยาย > Apps Script
// 1) กด Run ฟังก์ชัน setup หนึ่งครั้ง  2) Deploy > New deployment > Web app (Anyone)

const IMG_BASE = ""; // ใช้ path ในโฟลเดอร์ images ของ GitHub เช่น images/soft.svg

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let p = ss.getSheetByName("Products") || ss.insertSheet("Products");
  p.clear().appendRow(["sku", "name", "price", "image", "stock", "desc"]);
  p.appendRow(["TB-001", "แปรงสีฟัน Soft Clean", 59, "images/soft.svg", 100, "ขนแปรงนุ่มพิเศษ ถนอมเหงือก"]);
  p.appendRow(["TB-002", "แปรงสีฟัน Charcoal", 79, "images/charcoal.svg", 100, "ขนแปรงชาร์โคล ลดคราบ ลดกลิ่น"]);
  p.appendRow(["TB-003", "แปรงสีฟันเด็ก Kids", 49, "images/kids.svg", 100, "หัวเล็ก ด้ามจับง่าย สำหรับเด็ก"]);
  let o = ss.getSheetByName("Orders") || ss.insertSheet("Orders");
  o.clear().appendRow(["orderId", "date", "name", "phone", "address", "province", "zip", "items", "total", "status"]);
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function rows(name) {
  const v = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name).getDataRange().getValues();
  const h = v.shift();
  return v.map(r => Object.fromEntries(h.map((k, i) => [k, r[i]])));
}

function doGet(e) {
  if (e.parameter.action === "orders") {
    return json(rows("Orders").map(o => ({ ...o, items: JSON.parse(o.items || "[]") })).reverse());
  }
  return json(rows("Products"));
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const o = ss.getSheetByName("Orders");

  if (d.action === "order") {
    const id = "ORD-" + Utilities.formatDate(new Date(), "Asia/Bangkok", "yyMMddHHmmss");
    const total = d.items.reduce((s, i) => s + i.price * i.qty, 0);
    o.appendRow([id, new Date(), d.name, "'" + d.phone, d.address, d.province, "'" + d.zip, JSON.stringify(d.items), total, "รอแพ็ค"]);
    // ตัดสต็อก
    const p = ss.getSheetByName("Products"), pv = p.getDataRange().getValues();
    d.items.forEach(i => { for (let r = 1; r < pv.length; r++) if (pv[r][0] === i.sku) p.getRange(r + 1, 5).setValue(pv[r][4] - i.qty); });
    return json({ ok: true, orderId: id });
  }

  if (d.action === "status") {
    const v = o.getDataRange().getValues();
    for (let r = 1; r < v.length; r++) if (v[r][0] === d.orderId) o.getRange(r + 1, 10).setValue(d.status);
    return json({ ok: true });
  }
  return json({ ok: false });
}
