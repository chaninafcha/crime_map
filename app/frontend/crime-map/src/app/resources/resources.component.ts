import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrimeService } from '../crime.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- KPI -->
    <div class="kpi-grid" style="margin-bottom:24px">
      <div class="kpi-card">
        <div class="kpi-label">מחוזות פעילים</div>
        <div class="kpi-value" style="color:var(--severity-low)">{{ districts.length }}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">אירועים מחוז מוביל</div>
        <div class="kpi-value" style="color:var(--severity-high)">{{ districts[0]?.count | number }}</div>
        <div class="kpi-sub">{{ districts[0]?.district }}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">ממוצע לפי מחוז</div>
        <div class="kpi-value" style="color:var(--primary)">{{ avgPerDistrict | number:'1.0-0' }}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">מחוז עם פחות אירועים</div>
        <div class="kpi-value" style="color:var(--severity-medium)">{{ districts[districts.length-1]?.count | number }}</div>
        <div class="kpi-sub">{{ districts[districts.length-1]?.district }}</div>
      </div>
    </div>

    <!-- District resource cards -->
    <div class="card" style="margin-bottom:24px">
      <div class="card-title">פריסת כוחות לפי מחוז</div>
      <div class="resource-grid">
        <div class="resource-card" *ngFor="let d of districts">
          <div class="resource-header">
            <div class="resource-title">{{ d.district }}</div>
            <span class="resource-status" [class]="d.count > avgPerDistrict ? 'status-alert' : 'status-active'">
              {{ d.count > avgPerDistrict ? 'עומס גבוה' : 'תקין' }}
            </span>
          </div>
          <div class="resource-stat">
            <span>אירועים</span>
            <span class="resource-stat-val">{{ d.count | number }}</span>
          </div>
          <div class="resource-stat">
            <span>אחוז מסה"כ</span>
            <span class="resource-stat-val">{{ ((d.count / totalEvents) * 100).toFixed(1) }}%</span>
          </div>
          <div class="resource-stat">
            <span>עומס יחסי</span>
            <span class="resource-stat-val" [style.color]="d.count > avgPerDistrict ? 'var(--severity-high)' : 'var(--severity-low)'">
              {{ d.count > avgPerDistrict ? 'גבוה' : 'נמוך' }}
            </span>
          </div>
          <div class="bar-track" style="margin-top:12px">
            <div class="bar-fill" [style.width.%]="(d.count / districts[0].count) * 100"
              [style.background]="d.count > avgPerDistrict ? 'var(--severity-high)' : 'var(--severity-low)'">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Allocation table -->
    <div class="card">
      <div class="card-title">המלצות הקצאת משאבים</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>מחוז</th>
              <th>אירועים</th>
              <th>עומס</th>
              <th>המלצה</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let d of districts">
              <td>{{ d.district }}</td>
              <td class="mono">{{ d.count | number }}</td>
              <td>
                <span class="badge" [class]="getLoadClass(d.count)">{{ getLoadLabel(d.count) }}</span>
              </td>
              <td style="font-size:12px;color:var(--on-surface-dim)">{{ getRecommendation(d.count) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ResourcesComponent implements OnInit {
  districts: { district: string; count: number }[] = [];
  totalEvents = 0;
  avgPerDistrict = 0;

  constructor(private svc: CrimeService) {}

  ngOnInit() {
    this.svc.getStatsByDistrict().subscribe(d => {
      this.districts = d;
      this.totalEvents = d.reduce((s, x) => s + x.count, 0);
      this.avgPerDistrict = this.totalEvents / (d.length || 1);
    });
  }

  getLoadClass(count: number) {
    const ratio = count / this.avgPerDistrict;
    if (ratio > 1.5) return 'badge-critical';
    if (ratio > 1.1) return 'badge-high';
    if (ratio > 0.8) return 'badge-medium';
    return 'badge-low';
  }

  getLoadLabel(count: number) {
    const ratio = count / this.avgPerDistrict;
    if (ratio > 1.5) return 'קריטי';
    if (ratio > 1.1) return 'גבוה';
    if (ratio > 0.8) return 'בינוני';
    return 'נמוך';
  }

  getRecommendation(count: number) {
    const ratio = count / this.avgPerDistrict;
    if (ratio > 1.5) return 'הגדלת כוח אדם מיידית + חיזוק סיורים';
    if (ratio > 1.1) return 'שיקול הגדלת כוח אדם';
    if (ratio > 0.8) return 'שמירה על רמת כוח קיימת';
    return 'ניתן להפנות כוחות למחוזות עמוסים';
  }
}
