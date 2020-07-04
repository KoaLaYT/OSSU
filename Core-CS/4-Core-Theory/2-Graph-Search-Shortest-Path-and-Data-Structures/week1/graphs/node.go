package graphs

type Node struct {
	Val   int
	Edges []*UndirectedEdge
}

type Vertex struct {
	Val   int
	Edges []*DirectedEdge
}

type DirectedVertex struct {
	Val       int
	Outs, Ins []*DoubleDirectedEdge
}
