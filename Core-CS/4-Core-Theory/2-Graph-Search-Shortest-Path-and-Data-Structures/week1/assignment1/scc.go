package main

import (
	"bufio"
	"io"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
	"week1/example4_compute_strong_components"
	"week1/graphs"
)

type sizeResult struct {
	v, size int
}

type sizeResults []sizeResult

func (s sizeResults) Len() int {
	return len(s)
}
func (s sizeResults) Less(i, j int) bool {
	return s[i].size > s[j].size
}
func (s sizeResults) Swap(i, j int) {
	tmp := s[i]
	s[i] = s[j]
	s[j] = tmp
}

func main() {
	log.Println("Start open graph config file...")
	f, err := os.Open("./SCC.txt")
	check(err)
	defer f.Close()

	log.Println("Start building graph from file...")
	g := buildGraph(f)

	log.Println("Start calculate scc...")
	scc := example4_compute_strong_components.KosarajuAlg(g)
	log.Println("Start sort to find top 5...")
	result := sizeResults{}
	for k, v := range scc {
		result = append(result, sizeResult{v: k.Val, size: len(v)})
	}
	sort.Sort(result)
	log.Println("result:", result[:5])
}

func buildGraph(file *os.File) graphs.DirectedGraph {
	bookeeper := make(map[int]*graphs.DirectedVertex)
	vertices := make([]*graphs.DirectedVertex, 0)
	reader := bufio.NewReader(file)

	getOrCreate := func(u int) *graphs.DirectedVertex {
		if res, created := bookeeper[u]; created {
			return res
		}
		U := &graphs.DirectedVertex{Val: u}
		vertices = append(vertices, U)
		bookeeper[u] = U
		return U
	}

	for {
		row, err := reader.ReadBytes('\n')
		if err == io.EOF {
			break
		}
		check(err)
		u, v := parse(row)
		U := getOrCreate(u)
		V := getOrCreate(v)
		edge := &graphs.DoubleDirectedEdge{From: U, To: V}
		U.Outs = append(U.Outs, edge)
		V.Ins = append(V.Ins, edge)
	}
	return graphs.DirectedGraph{DVertices: vertices}
}

func parse(row []byte) (int, int) {
	// find the space
	i := 0
	for i < len(row) {
		if row[i] == ' ' {
			break
		}
		i++
	}
	s1 := strings.Trim(string(row[:i]), " \n")
	s2 := strings.Trim(string(row[i+1:]), " \n")

	n1, err := strconv.Atoi(s1)
	check(err)
	n2, err := strconv.Atoi(s2)
	check(err)

	return n1, n2
}

func check(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
