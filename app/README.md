# AegisIL — מפת פשיעה

## דרישות מקדימות
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js v22.22.3+ או v24.15.0+](https://nodejs.org/)
- Angular CLI: `npm install -g @angular/cli`

---

## הרצת ה-Backend

```bash
cd app/backend/CrimeMapApi
dotnet restore
dotnet run
```

ה-API יעלה על `http://localhost:5000`

**Endpoints:**
- `GET /api/crime/records?district=&city=&quarter=&page=1`
- `GET /api/crime/stats/district`
- `GET /api/crime/stats/type`
- `GET /api/crime/stats/quarter`
- `GET /api/crime/stats/city`

---

## הרצת ה-Frontend

```bash
cd app/frontend/crime-map
npm install
ng serve
```

האפליקציה תעלה על `http://localhost:4200`

---

## מסכים

| מסך | נתיב | תיאור |
|-----|------|--------|
| לוח בקרה | `/dashboard` | KPI, גרפי עמודות, ציר זמן, טבלת ערים |
| אירועים | `/incidents` | טבלה עם סינון ועימוד |
| ניהול כוחות | `/resources` | כרטיסי מחוז + המלצות הקצאה |
