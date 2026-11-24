import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrimeService, CrimeRecord } from '../crime.service';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card" style="margin-bottom:20px">
      <div class="card-title">סינון אירועים</div>
      <div class="filters">
        <input class="filter-input" placeholder="חפש מחוז..." [(ngModel)]="filterDistrict" (ngModelChange)="onFilter()">
        <input class="filter-input" placeholder="חפש עיר / יישוב..." [(ngModel)]="filterCity" (ngModelChange)="onFilter()">
        <select class="filter-input" [(ngModel)]="filterQuarter" (ngModelChange)="onFilter()">
          <option value="">כל הרבעונים</option>
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>
        <span style="font-size:12px;color:var(--on-surface-dim);margin-right:auto">
          {{ total | number }} אירועים נמצאו
        </span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">רשימת אירועים</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>מזהה תיק</th>
              <th>שנה</th>
              <th>רבעון</th>
              <th>יישוב</th>
              <th>מחוז</th>
              <th>מרחב</th>
              <th>תחנה</th>
              <th>קבוצה סטטיסטית</th>
              <th>סוג עבירה</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of records">
              <td class="mono">{{ r.fictiveIDNumber.slice(0,8) }}...</td>
              <td class="mono">{{ r.year }}</td>
              <td><span class="badge badge-medium">{{ r.quarter }}</span></td>
              <td>{{ r.yeshuv || '—' }}</td>
              <td>{{ r.policeDistrict || '—' }}</td>
              <td>{{ r.policeMerhav || '—' }}</td>
              <td>{{ r.policeStation || '—' }}</td>
              <td>{{ r.statisticGroup || '—' }}</td>
              <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ r.statisticType || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="records.length === 0" style="text-align:center;padding:40px;color:var(--on-surface-dim)">
        <span class="material-symbols-outlined" style="font-size:48px;display:block;margin-bottom:8px">search_off</span>
        לא נמצאו אירועים
      </div>
      <div class="pagination">
        <button class="page-btn" (click)="prevPage()" [disabled]="page === 1">הקודם</button>
        <span class="page-info">עמוד {{ page }} מתוך {{ totalPages }}</span>
        <button class="page-btn" (click)="nextPage()" [disabled]="page >= totalPages">הבא</button>
      </div>
    </div>
  `
})
export class IncidentsComponent implements OnInit {
  records: CrimeRecord[] = [];
  total = 0;
  page = 1;
  pageSize = 50;
  filterDistrict = '';
  filterCity = '';
  filterQuarter = '';

  get totalPages() { return Math.max(1, Math.ceil(this.total / this.pageSize)); }

  constructor(private svc: CrimeService) {}

  ngOnInit() { this.load(); }

  load() {
    this.svc.getRecords({
      district: this.filterDistrict || undefined,
      city: this.filterCity || undefined,
      quarter: this.filterQuarter || undefined,
      page: this.page
    }).subscribe(r => {
      this.records = r.items;
      this.total = r.total;
    });
  }

  onFilter() { this.page = 1; this.load(); }
  prevPage() { if (this.page > 1) { this.page--; this.load(); } }
  nextPage() { if (this.page < this.totalPages) { this.page++; this.load(); } }
}
