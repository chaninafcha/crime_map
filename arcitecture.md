Project: Advanced Crime Intelligence & Analytics Dashboard

Act as a world-class UI/UX designer and senior frontend developer.

Design and build a premium, modern, fully responsive, interactive Crime Intelligence Dashboard for a law enforcement analytics platform.

The system should look like a real enterprise-grade intelligence product used by police departments, security analysts, and decision makers.

1. Overall Design Language

Create a sophisticated, modern, high-end SaaS interface.

Visual style:

Modern dark-mode interface.

Professional intelligence / command center aesthetic.

Deep navy and charcoal backgrounds.

Subtle gradients and glassmorphism.

Accent colors: electric blue, cyan, violet.

Crime severity colors: red, orange, yellow, green.

Clean typography, excellent spacing and visual hierarchy.

Smooth animations and hover effects.

Rounded cards, subtle borders, elegant shadows.

Professional data visualizations.

The design must be visually impressive, information-rich, and easy to navigate.

Use Hebrew RTL layout with realistic Hebrew labels and content. All navigation, tables, filters, charts, and forms must support RTL correctly.

Create a desktop-first experience, optimized for 1920x1080 and 1440x900, while remaining responsive on tablets and mobile.

2. Main Navigation

Create a persistent sidebar with the following navigation items:

מפת פשיעה

לוח בקרה ונתונים

ניתוח אירועים

דוחות וסטטיסטיקות

ניהול אזורים

התראות

הגדרות מערכת

Include:

System logo and name: CRIME INTELLIGENCE

User profile and role.

Notifications indicator.

Global search.

Date and time display.

Collapsible sidebar.

SCREEN 1 – Interactive Crime Map

This is the main and most important screen.

Create a full-featured interactive crime map that occupies most of the screen.

Map functionality

Display a realistic city map with:

Crime incident markers.

Clusters of incidents.

Heatmap visualization.

Color-coded crime categories.

Density zones.

Geographic boundaries.

Neighborhood labels.

Use different marker styles and colors for different crime types:

Theft – Blue

Violence – Red

Property damage – Orange

Drug-related incidents – Purple

Traffic offenses – Yellow

Other – Gray

Map controls

Include:

Zoom in / zoom out.

Fullscreen mode.

Switch between map and satellite view.

Heatmap toggle.

Cluster toggle.

Crime density toggle.

Show / hide geographic boundaries.

Drawing and selecting geographic areas.

Radius-based search.

Reset map view.

Filters panel

Create an advanced filter panel with:

Date range picker.

Time of day.

Crime category.

Severity level.

Neighborhood / district.

Incident status.

Source of information.

Age group (only aggregated statistical data).

Search by incident ID.

Filters should update the displayed map and statistics.

Crime details popup

When clicking a crime marker, open an elegant details panel containing:

Incident ID.

Crime category.

Date and time.

Geographic location.

Severity.

Incident status.

Short incident description.

Related incidents.

Investigation status.

Link to full incident details.

Use fictional data only.

Floating statistics cards

Display at the top of the map:

Total incidents.

Incidents today.

High-severity incidents.

Change compared to previous period.

Additional features

Timeline slider to visualize crime evolution over time.

Compare two different time periods.

Identify crime hotspots.

Highlight areas with unusual increases in incidents.

Export current map view.

Save filter configurations.

The map must feel like a real operational intelligence system, not a static image.

SCREEN 2 – Crime Analytics & Intelligence Dashboard

Create a separate advanced analytics screen.

This screen should provide a comprehensive statistical overview of crime patterns.

Top KPI cards

Display:

Total reported incidents.

Percentage change compared to previous month.

Most common crime category.

Highest-risk district.

Average incidents per day.

Open investigations.

Charts and visualizations

Include the following:

Crime trends over time – interactive line chart.

Crime distribution by category – donut chart.

Crime distribution by district – horizontal bar chart.

Crime severity distribution – stacked bar chart.

Hourly crime distribution – heatmap by hour and weekday.

Monthly comparison – grouped bar chart.

Top 10 crime hotspots – ranked list.

Intelligence insights

Create an AI-powered insights panel with automatically generated insights, such as:

Increase in theft incidents in a specific district.

Unusual concentration of incidents during nighttime.

Emerging crime hotspots.

Changes in crime patterns compared to previous months.

Correlations between crime categories and time periods.

Clearly distinguish between statistical findings and AI-generated hypotheses.

Analytics filters

Date range.

District.

Crime category.

Severity.

Comparison period.

Include export options for PDF and Excel.

SCREEN 3 – Incident Management & Investigation

Create a dedicated screen for managing and analyzing individual crime incidents.

This screen should resemble a professional case management system.

Main incidents table

Create a high-quality, sortable, searchable table with:

Incident ID.

Crime type.

Date and time.

District.

Location.

Severity.

Status.

Assigned department.

Last updated.

Actions.

Table functionality

Global search.

Advanced filtering.

Multi-column sorting.

Pagination.

Select multiple incidents.

Bulk status updates.

Export results.

Customize visible columns.

Incident details view

Clicking an incident should open a detailed page or side panel with:

Incident overview.

Location map.

Timeline of events.

Investigation progress.

Related incidents.

Attached documents (mock data).

Internal notes.

Assigned team.

Activity history.

Incident workflow

Support the following statuses:

חדש

בבדיקה ראשונית

בחקירה

ממתין לעדכון

נסגר

Include action buttons:

Assign investigator.

Update status.

Add note.

Link related incident.

Generate incident report.

Use fictional and anonymized data.

3. Advanced UX Requirements

The three screens must feel like one unified product.

Implement:

Persistent navigation.

Shared global filters where appropriate.

Consistent design system.

Reusable components.

Interactive charts.

Functional dropdowns.

Working buttons.

Meaningful hover states.

Loading states.

Empty states.

Tooltips.

Confirmation dialogs.

Toast notifications.

All interactions should work with realistic mock data, even without a backend.

4. Technical Requirements

If generating code:

Use React and TypeScript.

Use Tailwind CSS.

Use Lucide icons.

Use Recharts for charts.

Use Leaflet or Mapbox for interactive maps.

Use reusable, modular components.

Maintain clean architecture.

Use mock JSON data.

Ensure responsive design.

For the map, use a real interactive map library if available. Do not substitute a static screenshot for the main map.

5. Important Design Instructions

Build all THREE screens, not just a landing page.

The Crime Map must be the default opening screen.

Prioritize the map as the visual centerpiece.

Make the interface visually rich but not cluttered.

Avoid generic dashboard templates.

Do not use excessive empty space.

Make the system look like a premium product that could be presented to senior police management.

Use realistic Hebrew sample data and RTL throughout.

All data must be fictional and must not represent real individuals.

Make every screen visually distinct while maintaining a consistent design language.

Final goal: Deliver a stunning, modern, three-screen Crime Intelligence Platform with an interactive crime map, advanced analytics, and comprehensive incident management.