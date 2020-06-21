package example3

import (
	"math"
)

/*
Find closest pair

Input: a list of points
Output: the closest pair of points
Example:
[(0,1), (3,4), (1,2), (-4,1), (2,5), (0, 6)] -> ((0,1),(1,2))
*/

type Point struct {
	x, y int
}

type Pair struct {
	fst, snd Point
}

func ClosestPair(points []Point) *Pair {
	size := len(points)
	if size <= 1 {
		return nil
	}
	sx, sy := make([]Point, size), make([]Point, size)
	for i := 0; i < size; i++ {
		sx[i] = points[i]
		sy[i] = points[i]
	}
	return closest(points, sx, sy)
}

func closest(points []Point, sx, sy []Point) *Pair {
	// base case
	size := len(points)
	if size <= 1 {
		return nil
	}
	if size == 2 {
		fst, snd := points[0], points[1]
		if fst.x > snd.x {
			swap(sx, 0, 1)
		}
		if fst.y > snd.y {
			swap(sy, 0, 1)
		}
		return &Pair{fst, snd}
	}
	// divide
	mid := size / 2
	dq := closest(points[:mid], sx[:mid], sy[:mid])
	dr := closest(points[mid:], sx[mid:], sy[mid:])
	// merge sort sx and sy
	mergeSort(sx, sy, mid)
	// find closest pair in split
	md, delta := min(dq, dr)
	ds := closestSplit(sx, sy, delta)
	c, _ := min(md, ds)
	return c
}

func swap(points []Point, i, j int) {
	tmp := points[i]
	points[i] = points[j]
	points[j] = tmp
}

func min(p1, p2 *Pair) (*Pair, float64) {
	if p1 == nil {
		return p2, p2.distance()
	}
	if p2 == nil {
		return p1, p1.distance()
	}
	if d1, d2 := p1.distance(), p2.distance(); d1 <= d2 {
		return p1, d1
	} else {
		return p2, d2
	}
}

func mergeSort(sx, sy []Point, mid int) {
	auxx, auxy := make([]Point, len(sx)), make([]Point, len(sy))
	ix, iy, jx, jy := 0, 0, mid, mid
	for k := 0; k < len(sx); k++ {
		// x
		switch {
		case ix >= mid:
			auxx[k] = sx[jx]
			jx++
		case jx >= len(sx):
			auxx[k] = sx[ix]
			ix++
		case sx[ix].x <= sx[jx].x:
			auxx[k] = sx[ix]
			ix++
		case sx[ix].x > sx[jx].x:
			auxx[k] = sx[jx]
			jx++
		default:
			panic("Should not happen")
		}
		// y
		switch {
		case iy >= mid:
			auxy[k] = sy[jy]
			jy++
		case jy >= len(sy):
			auxy[k] = sy[iy]
			iy++
		case sy[iy].y <= sy[jy].y:
			auxy[k] = sy[iy]
			iy++
		case sy[iy].y > sy[jy].y:
			auxy[k] = sy[jy]
			jy++
		default:
			panic("Should not happen")
		}
	}
	for k := 0; k < len(sx); k++ {
		sx[k] = auxx[k]
		sy[k] = auxy[k]
	}
}

func closestSplit(sx, sy []Point, delta float64) *Pair {
	xm := float64(sx[len(sx)/2].x)
	// filter sy, keep those x in [xm-delta, xm+delta]
	fsy := make([]Point, 0)
	for i := 0; i < len(sy); i++ {
		fx := float64(sy[i].x)
		if fx >= xm-delta && fx <= xm+delta {
			fsy = append(fsy, sy[i])
		}
	}
	// search in fsy, find the closest pair
	minDist := delta
	var cPair *Pair
	for i := 0; i < len(fsy); i++ {
		for j := i + 1; j < 7; j++ {
			if j >= len(fsy) {
				break
			}
			if d := fsy[i].distance(fsy[j]); d < minDist {
				minDist = d
				cPair = &Pair{fsy[i], fsy[j]}
			}
		}
	}
	return cPair
}

func (p Point) distance(other Point) float64 {
	return math.Sqrt(float64((p.x-other.x)*(p.x-other.x)) + float64((p.y-other.y)*(p.y-other.y)))
}

func (p *Pair) distance() float64 {
	return p.fst.distance(p.snd)
}
