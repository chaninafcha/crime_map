const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Parse CSV
function parseCSV(filePath) {
  const buf = fs.readFileSync(filePath);
  const content = new TextDecoder('windows-1255').decode(buf);
  const lines = content.split('\n').filter(l => l.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = line.split(',');
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (vals[i] || '').trim(); });
    return obj;
  }).filter(r => r.FictiveIDNumber);
}

// חיפוש data.csv — תומך גם ב-Railway וגם בלוקאל
const CSV_PATHS = [
  path.join(__dirname, '../../data.csv'),
  path.join(__dirname, '../data.csv'),
  path.join(__dirname, 'data.csv'),
  '/app/data.csv'
];

let records = [];
for (const p of CSV_PATHS) {
  try {
    records = parseCSV(p);
    console.log(`Loaded ${records.length} records from ${p}`);
    break;
  } catch (e) {
    console.log(`Not found at ${p}`);
  }
}
if (!records.length) console.error('CSV not found in any path!');

// GET /api/config - מגיש הגדרות לפרונטאנד (ללא חשיפה ישירה בקוד)
app.get('/api/config', (req, res) => {
  res.json({ geminiKey: process.env.GEMINI_API_KEY || '' });
});

// GET /api/records - with filters & pagination
app.get('/api/records', (req, res) => {
  let data = [...records];
  const { district, city, quarter, page = 1, limit = 50 } = req.query;
  if (district) data = data.filter(r => r.PoliceDistrict && r.PoliceDistrict.includes(district));
  if (city) data = data.filter(r => r.Yeshuv && r.Yeshuv.includes(city));
  if (quarter) data = data.filter(r => r.Quarter === quarter);
  const total = data.length;
  const start = (page - 1) * limit;
  res.json({ total, page: +page, data: data.slice(start, start + +limit) });
});

// GET /api/stats/district
app.get('/api/stats/district', (req, res) => {
  const counts = {};
  records.forEach(r => {
    const d = r.PoliceDistrict?.trim() || 'לא ידוע';
    if (d) counts[d] = (counts[d] || 0) + 1;
  });
  const result = Object.entries(counts)
    .filter(([k]) => k.length > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([district, count]) => ({ district, count }));
  res.json(result);
});

// GET /api/stats/type
app.get('/api/stats/type', (req, res) => {
  const counts = {};
  records.forEach(r => {
    const t = r.StatisticGroup?.trim() || 'לא ידוע';
    if (t.length > 1) counts[t] = (counts[t] || 0) + 1;
  });
  const result = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([type, count]) => ({ type, count }));
  res.json(result);
});

// GET /api/stats/quarter
app.get('/api/stats/quarter', (req, res) => {
  const counts = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };
  records.forEach(r => { if (counts[r.Quarter] !== undefined) counts[r.Quarter]++; });
  res.json(Object.entries(counts).map(([quarter, count]) => ({ quarter, count })));
});

// GET /api/stats/city
app.get('/api/stats/city', (req, res) => {
  const counts = {};
  records.forEach(r => {
    const c = r.Yeshuv?.trim() || '';
    if (c.length > 1) counts[c] = (counts[c] || 0) + 1;
  });
  const result = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([city, count]) => ({ city, count }));
  res.json(result);
});

// GET /api/stats/summary
app.get('/api/stats/summary', (req, res) => {
  const districts = new Set(records.map(r => r.PoliceDistrict?.trim()).filter(d => d && d.length > 1));
  const types = new Set(records.map(r => r.StatisticGroup?.trim()).filter(t => t && t.length > 1));
  res.json({
    total: records.length,
    districts: districts.size,
    types: types.size,
    quarters: 4
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
