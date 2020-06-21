package example2

import "testing"

func TestStrassenMatrixMul(t *testing.T) {
	tables := []struct {
		a, b, o [][]int
	}{
		{[][]int{}, [][]int{}, [][]int{}},
		{
			[][]int{
				{1, 2, 3, 4},
				{5, 6, 7, 8},
				{9, 10, 11, 12},
				{13, 14, 15, 16},
			},
			[][]int{
				{16, 15, 14, 13},
				{12, 11, 10, 9},
				{8, 7, 6, 5},
				{4, 3, 2, 1},
			},
			[][]int{
				{80, 70, 60, 50},
				{240, 214, 188, 162},
				{400, 358, 316, 274},
				{560, 502, 444, 386},
			},
		},
	}

	for _, table := range tables {
		result := StrassenMatrixMul(table.a, table.b)
		if !matrixEqual(result, table.o) {
			t.Errorf("\nInput A: %v, B: %v\nExpect: %v\nGet: %v", table.a, table.b, table.o, result)
		}
	}
}

func matrixEqual(a, b [][]int) bool {
	if len(a) != len(b) {
		return false
	}
	for i := 0; i < len(a); i++ {
		if len(a[i]) != len(b[i]) {
			return false
		}
		for j := 0; j < len(a[i]); j++ {
			if a[i][j] != b[i][j] {
				return false
			}
		}
	}
	return true
}
