package example4_compute_strong_components

import (
	"fmt"
	"strings"
	"testing"
	. "week1/graphs"
)

func TestKosarajuAlg(t *testing.T) {
	g := buildGraph()

	res := KosarajuAlg(g)

	for k, v := range res {
		fmt.Printf("k: %d, v: %v\n", k.Val, toString(v))
	}
}

func toString(a []*DirectedVertex) string {
	s := strings.Builder{}
	s.WriteByte('[')
	for _, v := range a {
		s.WriteByte(byte('0' + v.Val))
		s.WriteByte(',')
	}
	s.WriteByte(']')
	return s.String()
}

func buildGraph() DirectedGraph {
	v1 := &DirectedVertex{Val: 1}
	v2 := &DirectedVertex{Val: 2}
	v3 := &DirectedVertex{Val: 3}
	v4 := &DirectedVertex{Val: 4}
	v5 := &DirectedVertex{Val: 5}
	v6 := &DirectedVertex{Val: 6}
	v7 := &DirectedVertex{Val: 7}
	v8 := &DirectedVertex{Val: 8}
	v9 := &DirectedVertex{Val: 9}

	e1 := &DoubleDirectedEdge{From: v7, To: v1}
	e2 := &DoubleDirectedEdge{From: v1, To: v4}
	e3 := &DoubleDirectedEdge{From: v4, To: v7}
	e4 := &DoubleDirectedEdge{From: v9, To: v7}
	e5 := &DoubleDirectedEdge{From: v9, To: v3}
	e6 := &DoubleDirectedEdge{From: v6, To: v9}
	e7 := &DoubleDirectedEdge{From: v3, To: v6}
	e8 := &DoubleDirectedEdge{From: v8, To: v6}
	e9 := &DoubleDirectedEdge{From: v2, To: v8}
	e10 := &DoubleDirectedEdge{From: v8, To: v5}
	e11 := &DoubleDirectedEdge{From: v5, To: v2}

	v1.Outs = []*DoubleDirectedEdge{e2}
	v1.Ins = []*DoubleDirectedEdge{e1}
	v2.Outs = []*DoubleDirectedEdge{e9}
	v2.Ins = []*DoubleDirectedEdge{e11}
	v3.Outs = []*DoubleDirectedEdge{e7}
	v3.Ins = []*DoubleDirectedEdge{e5}
	v4.Outs = []*DoubleDirectedEdge{e3}
	v4.Ins = []*DoubleDirectedEdge{e2}
	v5.Outs = []*DoubleDirectedEdge{e11}
	v5.Ins = []*DoubleDirectedEdge{e10}
	v6.Outs = []*DoubleDirectedEdge{e6}
	v6.Ins = []*DoubleDirectedEdge{e7, e8}
	v7.Outs = []*DoubleDirectedEdge{e1}
	v7.Ins = []*DoubleDirectedEdge{e3, e4}
	v8.Outs = []*DoubleDirectedEdge{e8, e10}
	v8.Ins = []*DoubleDirectedEdge{e9}
	v9.Outs = []*DoubleDirectedEdge{e4, e5}
	v9.Ins = []*DoubleDirectedEdge{e6}

	return DirectedGraph{DVertices: []*DirectedVertex{v1, v2, v3, v4, v5, v6, v7, v8, v9}}
}
