## 1. Discovery
- [ ] 1.1 Review current graph parsing, rendering, and metrics logic in `graph_analyzer.html` to confirm available data structures for traversals.

## 2. Implementation
- [ ] 2.1 Add UI controls for selecting traversal type (BFS/DFS) and the starting node.
- [ ] 2.2 Implement BFS and DFS routines that emit ordered visitation traces compatible with the existing renderer.
- [ ] 2.3 Display traversal order and per-step highlights in the visualization and stats sidebar.
- [ ] 2.4 Compute and expose traversal statistics (reachable node count, depth/level data, timestamps).
- [ ] 2.5 Calculate the number of spanning trees for the current graph and present the result with explanatory context.
- [ ] 2.6 Generate and visualize at least one minimal spanning tree (including total weight) when edge weights are available.

## 3. Quality
- [ ] 3.1 Extend automated tests (Playwright or unit coverage) to exercise BFS/DFS selection, traversal output, and spanning-tree analytics.
- [ ] 3.2 Update documentation (e.g., `README.md`) to describe the new exploration workflow and statistics.
