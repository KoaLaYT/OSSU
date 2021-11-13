package example1

import (
	"math/rand"
	"reflect"
	"testing"
	"time"
)

func TestQuickSort(t *testing.T) {
	table := []struct {
		before, after []int
	}{
		{[]int{}, []int{}},
		{[]int{1}, []int{1}},
		{[]int{3, 2, 1, 5, 4, 7, 6}, []int{1, 2, 3, 4, 5, 6, 7}},
		{[]int{2, 1, 1, 1, 1, 1, 1}, []int{1, 1, 1, 1, 1, 1, 2}},
		{[]int{3, 3, 4, 4, 2, 1, 1, 1, 1, 1, 1}, []int{1, 1, 1, 1, 1, 1, 2, 3, 3, 4, 4}},
	}

	for _, test := range table {
		QuickSort(test.before)
		if !reflect.DeepEqual(test.before, test.after) {
			t.Errorf("Want: %v, Got: %v", test.after, test.before)
		}
	}
}

func randomArr(n int) []int {
	rand.Seed(time.Now().UnixNano())
	a := make([]int, n)
	for i := 0; i < n; i++ {
		a[i] = rand.Intn(n)
	}
	return a
}

const SIZE = 100000

func selectSort(a []int) {
	for i := 0; i < len(a); i++ {
		min := i
		for j := i + 1; j < len(a); j++ {
			if a[j] < a[min] {
				min = j
			}
		}
		swap(a, i, min)
	}
}

func BenchmarkQuickSort(b *testing.B) {
	for i := 0; i < b.N; i++ {
		a := randomArr(SIZE)
		b.StartTimer()
		QuickSort(a)
		b.StopTimer()
	}
}

func BenchmarkSelectSort(b *testing.B) {
	for i := 0; i < b.N; i++ {
		a := randomArr(SIZE)
		b.StartTimer()
		selectSort(a)
		b.StopTimer()
	}
}
