package example4_compute_strong_components

import (
	. "week1/graphs"
)

func KosarajuAlg(g DirectedGraph) map[*DirectedVertex][]*DirectedVertex {
	size := len(g.DVertices)
	visited := make(map[*DirectedVertex]bool)
	// first dfs: determine order
	cur := 1
	order := make(map[int]*DirectedVertex)
	var genOrderDFS func(v *DirectedVertex)
	genOrderDFS = func(v *DirectedVertex) {
		visited[v] = true
		for _, e := range v.Ins {
			if _, isVisited := visited[e.From]; !isVisited {
				genOrderDFS(e.From)
			}
		}
		order[cur] = v
		cur++
	}
	for i := size - 1; i >= 0; i-- {
		if _, isVisited := visited[g.DVertices[i]]; !isVisited {
			genOrderDFS(g.DVertices[i])
		}
	}
	// second dfs: find scc
	visited = make(map[*DirectedVertex]bool)
	result := make(map[*DirectedVertex][]*DirectedVertex)
	var genSccDFS func(v *DirectedVertex, scc []*DirectedVertex) []*DirectedVertex
	genSccDFS = func(v *DirectedVertex, scc []*DirectedVertex) []*DirectedVertex {
		visited[v] = true
		scc = append(scc, v)
		for _, e := range v.Outs {
			if _, isVisited := visited[e.To]; !isVisited {
				scc = genSccDFS(e.To, scc)
			}
		}
		return scc
	}
	for i := size; i > 0; i-- {
		v := order[i]
		if _, isVisited := visited[v]; !isVisited {
			scc := make([]*DirectedVertex, 0)
			result[v] = genSccDFS(v, scc)
		}
	}

	return result
}
