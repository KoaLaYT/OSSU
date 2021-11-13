package example2_dfs_basic

import (
	. "week1/graphs"
)

func DFS(start *Node) []*Node {
	visited := make(map[*Node]bool)
	reachable := make([]*Node, 0)

	return dfs(start, visited, reachable)
}

func dfs(n *Node, visited map[*Node]bool, reachable []*Node) []*Node {
	visited[n] = true
	reachable = append(reachable, n)

	for _, edge := range n.Edges {
		o := edge.Other(n)
		if isVisited := visited[o]; !isVisited {
			reachable = dfs(o, visited, reachable)
		}
	}

	return reachable
}