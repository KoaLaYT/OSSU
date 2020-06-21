package example3

import "testing"

func TestClosestPair(t *testing.T) {
	tcs := []struct {
		in  []Point
		out *Pair
	}{
		{[]Point{}, nil},
		{[]Point{{1, 2}}, nil},
		{[]Point{{3, 4}, {1, 2}}, &Pair{Point{1, 2}, Point{3, 4}}},
		{
			[]Point{
				{-1, 3},
				{-1, 1},
				{3, 4},
				{1, 2},
				{1, 1},
				{-4, 1},
				{2, 5},
				{0, 6},
			},
			&Pair{Point{1, 1}, Point{1, 2}},
		},
	}

	for _, tc := range tcs {
		res := ClosestPair(tc.in)
		if !pairEqual(res, tc.out) {
			t.Errorf("\nInput: %v\nExpect: %v\nGet: %v", tc.in, tc.out, res)
		}
	}
}

func pairEqual(p1, p2 *Pair) bool {
	if p1 == nil && p2 == nil {
		return true
	}
	if p1 == nil || p2 == nil {
		return false
	}
	// pair order is irrelevant
	return (pointEqual(p1.fst, p2.fst) && pointEqual(p1.snd, p2.snd)) || (pointEqual(p1.fst, p2.snd) && pointEqual(p1.snd, p2.fst))
}

func pointEqual(p1, p2 Point) bool {
	return p1.x == p2.x && p1.y == p2.y
}
