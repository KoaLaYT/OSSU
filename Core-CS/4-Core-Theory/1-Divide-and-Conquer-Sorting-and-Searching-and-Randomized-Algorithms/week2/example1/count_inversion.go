package example1

/*
Counting inversions in an array

Input: an array with arbitrary ordered integers
Output: the number of inversions in this array
Example: [1, 3, 2, 5 ,4] -> 2
*/

func CountInversion(a []int) int {
	if l := len(a); l <= 1 {
		return 0
	} else {
		b := make([]int, l)
		copy(b, a)
		return count(b)
	}
}

func count(a []int) int {
	// base case
	if len(a) == 1 {
		return 0
	}
	// divide
	mIdx := len(a) / 2
	left := count(a[:mIdx])
	right := count(a[mIdx:])
	// combine
	mid := countAndMergeSort(a, mIdx)

	return left + mid + right
}

func countAndMergeSort(a []int, midIndex int) int {
	aux := make([]int, len(a))

	i, j := 0, midIndex
	count := 0
	for k := 0; k < len(a); k++ {
		if i >= midIndex {
			copy(aux[k:], a[j:])
			break
		}
		if j >= len(a) {
			copy(aux[k:], a[i:])
			break
		}
		if a[i] <= a[j] {
			aux[k] = a[i]
			i++
		} else {
			aux[k] = a[j]
			j++
			count += midIndex - i
		}
	}
	copy(a, aux)
	return count
}
