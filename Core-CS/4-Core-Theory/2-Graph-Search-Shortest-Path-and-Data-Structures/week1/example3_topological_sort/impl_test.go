package example3_topological_sort

import (
	"reflect"
	"testing"
	. "week1/graphs"
)

func TestTopologicalSort(t *testing.T) {
	v1 := &Vertex{Val: 1}
	v2 := &Vertex{Val: 2}
	v3 := &Vertex{Val: 3}
	v4 := &Vertex{Val: 4}
	v5 := &Vertex{Val: 5}
	v6 := &Vertex{Val: 6}

	e1 := &DirectedEdge{From: v1, To: v2}
	e2 := &DirectedEdge{From: v1, To: v3}
	e3 := &DirectedEdge{From: v1, To: v6}

	e4 := &DirectedEdge{From: v2, To: v4}
	e5 := &DirectedEdge{From: v2, To: v5}

	e6 := &DirectedEdge{From: v3, To: v5}

	e7 := &DirectedEdge{From: v4, To: v6}
	e8 := &DirectedEdge{From: v5, To: v6}

	v1.Edges = []*DirectedEdge{e1, e2, e3}
	v2.Edges = []*DirectedEdge{e4, e5}
	v3.Edges = []*DirectedEdge{e6}
	v4.Edges = []*DirectedEdge{e7}
	v5.Edges = []*DirectedEdge{e8}

	g := Graph{Vertices: []*Vertex{v1, v2, v3, v4, v5, v6}}

	got := TopologicalSort(g)
	expect := []*Vertex{v1, v3, v2, v5, v4, v6}
	if !reflect.DeepEqual(got, expect) {
		t.Errorf("Expect: %v, Got: %v", expect, got)
	}
}
