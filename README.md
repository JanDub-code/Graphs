# Graph Analyzer

This is a web-based tool for analyzing graphs. You can define a graph using a simple text format and get various analytics and matrix representations.

## Features

*   **Graph Definition**: Define nodes and edges with weights and labels.
*   **Matrix Representations**:
    *   Adjacency Matrix
    *   Sign Matrix
    *   Laplacian Matrix
    *   Incidence Matrix
    *   Length Matrix
    *   Reachability Matrix
*   **Graph Properties**:
    *   Weighted, Oriented, Connected, Simple, etc.
*   **Statistical Overview**:
    *   Node/edge counts, degree distribution, density, diameter, radius, etc.
*   **Pathfinding**:
    *   All shortest paths (unweighted)
    *   Simple paths up to a given length
*   **Graph Traversal**:
    *   Perform Breadth-First Search (BFS) or Depth-First Search (DFS) starting from any node. The UI will display the order of visited nodes.
*   **Spanning Tree Analysis**:
    *   Calculate the total number of possible spanning trees.
    *   Find the Minimum Spanning Tree (MST) for weighted graphs and display its total weight and constituent edges.

## How to Use

1.  Open `graph_analyzer.html` in your web browser.
2.  Enter the graph definition in the text area.
3.  Click "Analyzovat graf".
4.  Explore the various sections to see graph properties, matrices, and statistics.
5.  Use the interactive query sections to get specific values from matrices or find paths.
6.  Use the "Prohledávání grafu (BFS/DFS)" section to perform traversals.
7.  Use the "Kostra grafu" section to analyze spanning trees.
