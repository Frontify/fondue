---
'@frontify/fondue-charts': patch
---

Bump `@visx/*` dependencies to v4 and add an explicit `@react-spring/web` v10 dependency, making the chart internals compatible with React 19 (the package's own peer range is unchanged). Also fixes a transient invalid negative-height clip-path rect on LineChart's first render (console error on mount), and PieChart arcs no longer show a focus ring on mouse click (keyboard focus still does).
