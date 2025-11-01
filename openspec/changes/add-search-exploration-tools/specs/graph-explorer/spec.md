## ADDED Requirements
### Requirement: Traversal Mode Selection
The analyzer SHALL let users choose a traversal strategy (BFS or DFS) and specify the starting node before running an exploration.

#### Scenario: Breadth-first run
- **WHEN** a user selects `BFS`, picks a valid start node, and begins the traversal
- **THEN** the system traverses edges breadth-first and lists visited nodes in level order.

#### Scenario: Depth-first run
- **WHEN** a user selects `DFS`, picks a valid start node, and begins the traversal
- **THEN** the system traverses edges depth-first and lists visited nodes in discovery order.

### Requirement: Traversal Statistics
The analyzer SHALL display traversal statistics that include reachable node count, traversal depth/levels, and timestamps (or step indices) for each visited node.

#### Scenario: Statistics rendered
- **WHEN** a traversal completes
- **THEN** the stats panel shows the number of visited nodes, the furthest depth/level reached, and the discovery step for every node.

### Requirement: Spanning Tree Insights
The analyzer SHALL compute the number of spanning trees for the current graph and highlight at least one minimal spanning tree (including total weight when edge weights are defined).

#### Scenario: Spanning tree summary
- **WHEN** the user runs a traversal on a connected graph
- **THEN** the stats panel shows the total count of spanning trees and visualizes a minimal spanning tree with its total weight (or edge count if unweighted).
