## Why
Graph Analyzer currently lacks guided graph traversals and spanning-tree insights, making it harder for users to explore connectivity and structural properties inside the UI.

## What Changes
- Add an exploration panel that lets users choose BFS or DFS, pick a start node, and view the step-by-step visitation order directly in the visualization.
- Surface traversal statistics (reachable node count, levels/depth, discovery timestamps) alongside the run.
- Provide spanning-tree analytics: compute the total number of spanning trees and highlight at least one minimal spanning tree with its aggregate weight.

## Impact
- Affected specs: graph-explorer
- Affected code: graph_analyzer.html, README.md, tests/playwright/*
