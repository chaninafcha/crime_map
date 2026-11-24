import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrimeService } from '../crime.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- KPI Row -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">סה"כ אירועים</div>
        <div class="kpi-value" style="color:var(--primary)">{{ totalRecords | number }}</div>
        <div class="kpi-sub">2025 — כל הרבעונים</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">מחוזות פעילים</div>
        <div class="kpi-value" style="color:var(--severity-medium)">{{ districtStats.length }}</div>
        <div class="kpi-sub">מחוזות משטרה</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">סוגי עבירות</div>
        <div class="kpi-value" style="color:var(--severity-high)">{{ typeStats.length }}</div>
        <div class="kpi-sub">קטגוריות סטטיסטיות</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">ערים מדווחות</div>
        <div class="kpi-value" style="color:var(--severity-low)">{{ cityStats.length }}</div>
        <div class="kpi-sub">יישובים עם נתונים</div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="charts-grid">
      <!-- District bar chart -->
      <div class="card">
        <div class="card-title">אירועים לפי מחוז</div>
        <div class="bar-list" *ngIf="districtStats.length">
          <div class="bar-item" *ngFor="let d of districtStats.slice(0,8)">
            <div class="bar-label">
              <span>{{ d.district }}</span>
              <span>{{ d.count | number }}</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" [style.width.%]="(d.count / districtStats[0].count) * 100"></div>
            </div>
          </div>
        </div>
        <div *ngIf="!districtStats.length" style="color:var(--on-surface-dim);font-size:13px">טוען נתונים...</div>
      </div>

      <!-- Type bar chart -->
      <div class="card">
        <div class="card-title">סוגי עבירות מובילים</div>
        <div class="bar-list" *ngIf="typeStats.length">
          <div class="bar-item" *ngFor="let t of typeStats.slice(0,8)">
            <div class="bar-label">
              <span style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ t.type }}</span>
              <span>{{ t.count | number }}</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" [style.width.%]="(t.count / typeStats[0].count) * 100" style="background:var(--severity-high)"></div>
            </div>
          </div>
        </div>
        <div *ngIf="!typeStats.length" style="color:var(--on-surface-dim);font-size:13px">טוען נתונים...</div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="card" style="margin-bottom:24px">
      <div class="card-title">ציר זמן מבצעי — אירועים לפי רבעון</div>
      <div *ngIf="quarterStats.length" style="display:flex;flex-direction:column;gap:8px">
        <div class="timeline">
          <div class="tl-bar"
            *ngFor="let q of quarterStats"
            [style.height.%]="(q.count / maxQuarter) * 100"
            [title]="q.period + ': ' + q.count">
          </div>
        </div>
        <div style="display:flex;gap:6px;overflow:hidden">
          <div *ngFor="let q of quarterStats"
            style="flex:1;font-size:9px;color:var(--on-surface-dim);text-align:center;font-family:'Red Hat Mono',monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
            {{ q.period }}
          </div>
        </div>
      </div>
      <div *ngIf="!quarterStats.length" style="color:var(--on-surface-dim);font-size:13px">טוען נתונים...</div>
    </div>

    <!-- Top cities -->
    <div class="card">
      <div class="card-title">ערים עם ריכוז אירועים גבוה</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>יישוב</th>
              <th>מספר אירועים</th>
              <th>אחוז מסה"כ</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of cityStats; let i = index">
              <td class="mono">{{ i + 1 }}</td>
              <td>{{ c.city }}</td>
              <td class="mono">{{ c.count | number }}</td>
              <td>
                <div style="display:flex;align-items:center;gap:8px">
                  <div class="bar-track" style="width:80px">
                    <div class="bar-fill" [style.width.%]="(c.count / totalRecords) * 100" style="background:var(--severity-medium)"></div>
                  </div>
                  <span class="mono">{{ ((c.count / totalRecords) * 100).toFixed(1) }}%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  districtStats: { district: string; count: number }[] = [];
  typeStats: { type: string; count: number }[] = [];
  quarterStats: { period: string; count: number }[] = [];
  cityStats: { city: string; count: number }[] = [];
  totalRecords = 0;
  maxQuarter = 1;

  constructor(private svc: CrimeService) {}

  ngOnInit() {
    this.svc.getStatsByDistrict().subscribe(d => { this.districtStats = d; });
    this.svc.getStatsByType().subscribe(d => { this.typeStats = d; });
    this.svc.getStatsByQuarter().subscribe(d => {
      this.quarterStats = d;
      this.maxQuarter = Math.max(...d.map(x => x.count), 1);
    });
    this.svc.getStatsByCity().subscribe(d => { this.cityStats = d; });
    this.svc.getRecords({ page: 1 }).subscribe(d => { this.totalRecords = d.total; });
  }
}
