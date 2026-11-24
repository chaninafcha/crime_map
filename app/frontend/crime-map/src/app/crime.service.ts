import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CrimeRecord {
  fictiveIDNumber: string;
  year: number;
  quarter: string;
  yeshuv: string;
  policeDistrict: string;
  policeMerhav: string;
  policeStation: string;
  statisticGroup: string;
  statisticType: string;
}

export interface PagedResult {
  total: number;
  page: number;
  pageSize: number;
  items: CrimeRecord[];
}

@Injectable({ providedIn: 'root' })
export class CrimeService {
  private base = 'http://localhost:5000/api/crime';

  constructor(private http: HttpClient) {}

  getRecords(filters: { district?: string; city?: string; quarter?: string; page?: number }): Observable<PagedResult> {
    let params = new HttpParams();
    if (filters.district) params = params.set('district', filters.district);
    if (filters.city) params = params.set('city', filters.city);
    if (filters.quarter) params = params.set('quarter', filters.quarter);
    params = params.set('page', filters.page ?? 1);
    return this.http.get<PagedResult>(`${this.base}/records`, { params });
  }

  getStatsByDistrict(): Observable<{ district: string; count: number }[]> {
    return this.http.get<any[]>(`${this.base}/stats/district`);
  }

  getStatsByType(): Observable<{ type: string; count: number }[]> {
    return this.http.get<any[]>(`${this.base}/stats/type`);
  }

  getStatsByQuarter(): Observable<{ period: string; count: number }[]> {
    return this.http.get<any[]>(`${this.base}/stats/quarter`);
  }

  getStatsByCity(): Observable<{ city: string; count: number }[]> {
    return this.http.get<any[]>(`${this.base}/stats/city`);
  }
}
