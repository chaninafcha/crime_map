import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-icon"><span class="material-symbols-outlined">shield</span></div>
          <div>
            <div class="brand-name">AegisIL</div>
            <div class="brand-sub">מודיעין פשיעה</div>
          </div>
        </div>
        <nav>
          <a class="nav-item" routerLink="/dashboard" routerLinkActive="active">
            <span class="material-symbols-outlined">dashboard</span>לוח בקרה
          </a>
          <a class="nav-item" routerLink="/incidents" routerLinkActive="active">
            <span class="material-symbols-outlined">crisis_alert</span>אירועים
          </a>
          <a class="nav-item" routerLink="/resources" routerLinkActive="active">
            <span class="material-symbols-outlined">groups</span>ניהול כוחות
          </a>
        </nav>
        <div class="sidebar-footer">
          <div class="nav-item">
            <span class="material-symbols-outlined">person</span>
            <div>
              <div style="font-size:13px">קצין מבצעים</div>
              <div style="font-size:11px;color:var(--on-surface-dim)">מחוז מרכז</div>
            </div>
          </div>
        </div>
      </aside>
      <main class="main">
        <div class="topbar">
          <span class="topbar-title">מוקד מבצעי — AegisIL</span>
          <span class="topbar-meta">{{ now }}</span>
        </div>
        <div class="page-content">
          <router-outlet />
        </div>
      </main>
    </div>
  `
})
export class AppComponent {
  get now() {
    return new Date().toLocaleString('he-IL', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
  }
}
