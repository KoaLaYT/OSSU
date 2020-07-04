package example3_topological_sort

import (
	. "week1/graphs"
)

func TopologicalSort(g Graph) []*Vertex {
	visited := make(map[*Vertex]bool)
	size := len(g.Vertices)
	order := make([]*Vertex, size)

	var dfs func(n *Vertex)
	dfs = func(n *Vertex) {
		visited[n] = true
		for _, edge := range n.Edges {
			if _, isVisited := visited[edge.To]; !isVisited {
				dfs(edge.To)
			}
		}
		order[size-1] = n
		size--
	}

	for _, v := range g.Vertices {
		if _, isVisited := visited[v]; !isVisited {
			dfs(v)
		}
	}

	return order
}
