## 1. Setup & Dependencies

- [x] 1.1 Install recharts dependency (`npm install recharts`)
- [x] 1.2 Create directory structure for analytics components at `src/components/analytics/`
- [x] 1.3 Create analytics hooks directory at `src/hooks/analytics/`

## 2. Data Layer & Utilities

- [x] 2.1 Create `src/hooks/analytics/useInventoryMetrics.ts` hook
- [x] 2.2 Implement `getTotalStock()` function - sum all product stock levels
- [x] 2.3 Implement `getStockByProduct()` function - returns array of {product, stock}
- [x] 2.4 Implement `getStockByCategory()` function - returns array of {category, stock}
- [x] 2.5 Implement `getLowStockProducts()` function - returns products with stock < 10
- [x] 2.6 Implement `getLowStockCount()` function - returns count of low-stock products

## 3. Chart Components

- [x] 3.1 Create `src/components/analytics/StockBarChart.tsx` component
- [x] 3.2 Implement bar chart rendering products on x-axis, stock on y-axis
- [x] 3.3 Add tooltip display on hover showing product name and stock
- [x] 3.4 Create `src/components/analytics/CategoryPieChart.tsx` component
- [x] 3.5 Implement pie chart rendering category distribution
- [x] 3.6 Add tooltip display on hover showing category name and percentage
- [x] 3.7 Add handling for empty/no data scenarios with fallback messages

## 4. Dashboard Metrics & Alerts

- [x] 4.1 Create `src/components/analytics/MetricCard.tsx` component for displaying summary metrics
- [x] 4.2 Create `src/components/analytics/LowStockAlert.tsx` component
- [x] 4.3 Implement low-stock alert display showing count of low-stock products
- [x] 4.4 Add clickable link in alert to show low-stock product list
- [x] 4.5 Create `src/components/analytics/LowStockList.tsx` component
- [x] 4.6 Implement table/list showing product name, stock level, and category for low-stock items

## 5. Main Dashboard Page

- [x] 5.1 Create `src/pages/Analytics.tsx` page component
- [x] 5.2 Create `src/components/analytics/AnalyticsDashboard.tsx` main dashboard component
- [x] 5.3 Implement responsive grid layout for metric cards (responsive on mobile/tablet/desktop)
- [x] 5.4 Add bar chart (stock by product) to dashboard
- [x] 5.5 Add pie chart (category distribution) to dashboard
- [x] 5.6 Add filter section for category selection
- [x] 5.7 Implement category filter dropdown
- [x] 5.8 Implement filter reset button
- [x] 5.9 Update all metrics and charts when filters change
- [x] 5.10 Add date range filter placeholder (for future analytics)

## 6. Routing & Navigation

- [x] 6.1 Add `/analytics` route to main router in `src/App.tsx` or routing config
- [x] 6.2 Update `src/components/Navigation.tsx` to add Analytics link
- [x] 6.3 Add analytics icon (TrendingUp or BarChart) from lucide-react
- [x] 6.4 Implement active state highlighting for Analytics nav button
- [x] 6.5 Test navigation linking to analytics dashboard

## 7. Integration & Testing

- [x] 7.1 Connect dashboard to actual product/category data from app state
- [x] 7.2 Verify metrics update when products/categories change
- [x] 7.3 Test all chart interactions (hover, tooltips, responsive behavior)
- [x] 7.4 Test filter functionality across all components
- [x] 7.5 Test low-stock alert updates in real-time
- [x] 7.6 Verify analytics page is hidden during full-screen forms (consistent with design)
- [x] 7.7 Test responsive layout on mobile, tablet, desktop viewports
- [x] 7.8 Visual testing - ensure styling matches app theme and existing components

## 8. Polish & Cleanup

- [x] 8.1 Add TypeScript types for chart data structures
- [x] 8.2 Add accessibility attributes (aria labels, semantic HTML)
- [x] 8.3 Add loading states if needed
- [x] 8.4 Add error boundaries or error handling
- [x] 8.5 Code review and cleanup
- [x] 8.6 Update any relevant documentation or comments
