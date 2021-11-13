package example1_bfs_basic

import (
	. "week1/graphs"
)

// find all reachable nodes From start
func BFS(start *Node) []*Node {
	explored := make(map[*Node]bool)
	explored[start] = true
	toExplore := []*Node{start}

	for len(toExplore) > 0 {
		cur := toExplore[0]
		toExplore = toExplore[1:]
		for _, edge := range cur.Edges {
			o := edge.Other(cur)
			if _, isExplored := explored[o]; !isExplored {
				explored[o] = true
				toExplore = append(toExplore, o)
			}
		}
	}

	reachable := make([]*Node, len(explored))
	i := 0
	for n := range explored {
		reachable[i] = n
		i++
	}
	return reachable
}
