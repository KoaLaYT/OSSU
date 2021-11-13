package example1

import "testing"

func TestCountInversion(t *testing.T) {
	tables := []struct {
		input  []int
		output int
	}{
		{[]int{}, 0},
		{[]int{1, 2}, 0},
		{[]int{2, 1}, 1},
		{[]int{1, 5, 3, 2, 4, 6, 7}, 4},
		{[]int{1, 2, 3, 4, 5, 6, 7}, 0},
		{[]int{6, 5, 4, 3, 2, 1}, 15},
	}

	for _, table := range tables {
		result := CountInversion(table.input)
		if result != table.output {
			t.Errorf("Input: %v, Expect: %v, Get: %v", table.input, table.output, result)
		}
	}
}
