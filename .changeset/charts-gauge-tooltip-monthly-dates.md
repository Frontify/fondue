---
"@frontify/fondue-charts": minor
---

feat(LinearGauge): add `tooltipMode="hovered"` to show only the section under the pointer or keyboard focus with its new `description`, `legendPosition="bottom"`, and keyboard access to the sections in both modes
feat(AreaStackChart, LineChart): add `dateGranularity="month"` to show months on the axis and in the tooltip
fix(LinearGauge): reduce the gap between the bar and the legend to 16px
fix(AreaStackChart): keep five grid lines for all-zero or small values, and draw a circle per series for a single date
fix(AreaStackChart, LineChart): make room for the first date label, so it is not clipped
fix(AreaStackChart, BarChart, LineChart): measure the axis labels again once the web font has loaded, so they are not clipped
