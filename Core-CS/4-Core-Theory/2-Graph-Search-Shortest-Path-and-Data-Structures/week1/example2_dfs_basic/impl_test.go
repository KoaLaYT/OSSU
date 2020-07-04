package example2_dfs_basic

import (
	"reflect"
	"testing"
	. "week1/graphs"
)

func TestDFS(t *testing.T) {
	n1 := &Node{Val: 1}
	n2 := &Node{Val: 2}
	n3 := &Node{Val: 3}
	n4 := &Node{Val: 4}
	n5 := &Node{Val: 5}
	n6 := &Node{Val: 6}
	n7 := &Node{Val: 7}
	n8 := &Node{Val: 8}

	e1 := &UndirectedEdge{U: n1, V: n2}
	e2 := &UndirectedEdge{U: n1, V: n3}
	e3 := &UndirectedEdge{U: n1, V: n6}
	e4 := &UndirectedEdge{U: n2, V: n4}
	e5 := &UndirectedEdge{U: n2, V: n5}
	e6 := &UndirectedEdge{U: n3, V: n5}
	e7 := &UndirectedEdge{U: n4, V: n6}
	e8 := &UndirectedEdge{U: n5, V: n6}
	e9 := &UndirectedEdge{U: n7, V: n8}

	n1.Edges = []*UndirectedEdge{e1, e2, e3}
	n2.Edges = []*UndirectedEdge{e1, e4, e5}
	n3.Edges = []*UndirectedEdge{e2, e6}
	n4.Edges = []*UndirectedEdge{e4, e7}
	n5.Edges = []*UndirectedEdge{e5, e6, e8}
	n6.Edges = []*UndirectedEdge{e3, e7, e8}
	n7.Edges = []*UndirectedEdge{e9}
	n8.Edges = []*UndirectedEdge{e9}

	got := DFS(n1)
	expect := []*Node{n1, n2, n4, n6, n5, n3}

	if !reflect.DeepEqual(got, expect) {
		t.Errorf("Expect: %v, Got: %v", expect, got)
	}
}
