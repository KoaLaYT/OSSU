package example1

/*
Select nth min value of an array
*/

func RandomSelect(a []int, n int) int {
	if n > len(a) {
		panic("Invalid inputs: n must greater or less than a's length")
	}
	// partition
	pivot := a[0]
	i := 1
	for j := 1; j < len(a); j++ {
		if a[j] < pivot {
			swap(a, i, j)
			i++
		}
	}
	// find or recursion
	switch {
	case i == n:
		return pivot
	case i > n:
		return RandomSelect(a[1:i], n)
	default:
		return RandomSelect(a[i:], n-i)
	}
}

func swap(a []int, i, j int) {
	tmp := a[i]
	a[i] = a[j]
	a[j] = tmp
}
