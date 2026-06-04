## Context

Current system manages products and categories but lacks visibility into inventory metrics. Users need dashboards showing stock levels, distribution patterns, and alerts. Stack uses React + TypeScript + shadcn/ui with no charting library yet.

## Goals / Non-Goals

**Goals:**
- Build analytics dashboard page showing key inventory metrics
- Implement interactive charts for stock visualization
- Identify and alert on low-stock products
- Integrate analytics into main navigation
- Support basic filtering/date selection (placeholder for future analytics)

**Non-Goals:**
- Real-time metrics or WebSocket updates
- Historical data storage (use in-memory mock data initially)
- Advanced forecasting or ML predictions
- Export/reporting features
- Role-based analytics access control

## Decisions

**1. Charting Library: Recharts**
- Rationale: React-native, TypeScript-friendly, integrates with shadcn/ui ecosystem
- Alternatives: Chart.js (less React-friendly), Plotly (heavier), D3 (steep learning curve)
- Decision: Use Recharts for all chart components

**2. Dashboard Layout**
- Main dashboard at `/analytics` route
- Grid layout: 2-3 metric cards at top (total inventory, low-stock count, product count)
- 2 primary charts below: stock-by-product bar chart, category-distribution pie chart
- Sidebar filters for date range / category selection
- Rationale: Balanced view showing both summary metrics and detailed visualization

**3. Data Aggregation**
- Create `hooks/useInventoryMetrics.ts` to compute metrics from product/category data
- Mock product data includes stock levels initially
- Functions: getTotalStock(), getStockByProduct(), getStockByCategory(), getLowStockProducts()
- Rationale: Separates data logic from UI, reusable across components

**4. Low-Stock Logic**
- Threshold hardcoded at 10 units (can be made configurable later)
- Alert component shows count + link to low-stock list
- Rationale: Simple MVP, threshold can move to spec/config in future

**5. Navigation Update**
- Add "Analytics" link to main nav menu
- Reuse existing app-navigation spec pattern
- Icon: TrendingUp or BarChart from lucide-react
- Rationale: Consistent with current navigation structure

## Risks / Trade-offs

**Risk: No persistence of analytics data**
→ Mitigation: Use mock data for MVP. Real implementation will need database queries or API endpoints.

**Risk: Performance with large product lists**
→ Mitigation: Chart rendering is client-side. Add pagination/virtualization if product count > 500.

**Risk: Mock data divergence**
→ Mitigation: Analytics hooks compute metrics live from product state, always in sync.

**Trade-off: Recharts bundle size vs. feature completeness**
→ Decision: Accept ~50kb gzip for rich interactive charts. Can optimize with lazy-loading dashboard route.

## Migration Plan

1. Install recharts dependency
2. Create analytics-dashboard component + page
3. Implement useInventoryMetrics hook
4. Create chart components (BarChart, PieChart wrappers)
5. Add /analytics route to router
6. Update app-navigation with Analytics link
7. Test with mock product data

Rollback: Remove /analytics route, revert nav links.
