package example1

func QuickSort(a []int) {
	sort(a)
}

func sort(a []int) {
	if len(a) <= 1 {
		return
	}
	i, j := partition(a)
	sort(a[:i])
	sort(a[j:])
}

func partition(a []int) (int, int) {
	pivot, p := threeSamplePivot(a) // to avoid bad performance when sort an almost sorted array
	swap(a, 0, p)
	i, j := 1, 1 // the length of a >= 2
	for k := 1; k < len(a); k++ {
		switch {
		case a[k] == pivot:
			swap(a, j, k)
			j++
		case a[k] < pivot:
			swap(a, i, k)
			if i < j {
				swap(a, j, k)
			}
			i++
			j++
		default:
			// a[k] > pivot, do nothing
		}
	}
	swap(a, 0, i-1)
	return i - 1, j
}

func threeSamplePivot(a []int) (int, int) {
	size := len(a)
	low := a[0]
	mid := a[size/2]
	high := a[size-1]

	if low <= mid {
		if mid <= high {
			return mid, size / 2
		}
		if low <= high {
			return high, size - 1
		}
		return low, 0
	} else {
		if low <= high {
			return low, 0
		}
		if mid <= high {
			return high, size - 1
		}
		return mid, size / 2
	}
}

func swap(a []int, i, j int) {
	if i == j {
		return
	}

	tmp := a[i]
	a[i] = a[j]
	a[j] = tmp
}
