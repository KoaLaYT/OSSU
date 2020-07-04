package graphs

type UndirectedEdge struct {
	U, V *Node
}

func (e *UndirectedEdge) Other(u *Node) *Node {
	if u == e.U {
		return e.V
	} else {
		return e.U
	}
}

type DirectedEdge struct {
	From, To *Vertex
}

type DoubleDirectedEdge struct {
	From, To *DirectedVertex
}