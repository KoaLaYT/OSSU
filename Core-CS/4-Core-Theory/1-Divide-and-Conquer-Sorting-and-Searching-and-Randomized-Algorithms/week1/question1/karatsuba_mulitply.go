package question1

import (
	"strings"
)

func KaratsubaMul(s1, s2 string) string {
	// convert string to []int
	l1, l2 := len(s1), len(s2)
	n1, n2 := make([]int, l1), make([]int, l2)
	for i := 0; i < max(l1, l2); i++ {
		if i < l1 {
			n1[i] = int(s1[i] - '0')
		}
		if i < l2 {
			n2[i] = int(s2[i] - '0')
		}
	}
	// do the calculation
	resSlice := karatsuba(n1, n2)
	// convert []int back to string
	res := strings.Builder{}
	for _, i := range resSlice {
		res.WriteByte(byte(i + '0'))
	}
	return res.String()
}

func karatsuba(n1, n2 []int) []int {
	// base case: single digit
	if len(n1) == 1 && len(n2) == 1 {
		mul := n1[0] * n2[0]
		if mul < 10 {
			return []int{mul}
		} else {
			return []int{mul / 10, mul % 10}
		}
	}
	// pad to same length
	if l1, l2 := len(n1), len(n2); l1 > l2 {
		tmp := make([]int, l1)
		copy(tmp[l1-l2:], n2)
		n2 = tmp
	} else if l1 < l2 {
		tmp := make([]int, l2)
		copy(tmp[l2-l1:], n1)
		n1 = tmp
	}
	// do the partition
	mid := len(n1) / 2
	a, b := n1[:mid], n1[mid:]
	c, d := n2[:mid], n2[mid:]
	// recursively calculate sub parts
	ac := karatsuba(a, c)
	bd := karatsuba(b, d)
	abcd := karatsuba(sliceAdd(a, b), sliceAdd(c, d))
	adbc := sliceSub(sliceSub(abcd, ac), bd)
	// add proper padding
	pac := slicePadSufN(ac, len(n1))
	var half int
	if len(n1) % 2 == 1 {
		half = len(n1)/2 + 1
	} else {
		half = len(n1)/2
	}
	padbc := slicePadSufN(adbc, half)
	// sum together
	return sliceAdd(sliceAdd(pac, padbc), bd)
}

func sliceAdd(a, b []int) []int {
	la, lb := len(a), len(b)
	l := max(la, lb)
	sum := make([]int, l+1)
	carry := 0

	for i := l - 1; i >= 0; i-- {
		var cur int
		if m, n := i-(l-la), i-(l-lb); m >= 0 && n >= 0 {
			cur = a[m] + b[n] + carry
		} else if m < 0 {
			cur = b[n] + carry
		} else {
			cur = a[m] + carry
		}
		sum[i+1] = cur % 10
		carry = cur / 10
	}

	if carry > 0 {
		sum[0] = carry
	}
	return stripLeadingZero(sum)
}

func sliceSub(a, b []int) []int {
	l := len(a) // a will always be larger than b
	sub := make([]int, l)
	carry := 0

	for i := l - 1; i >= 0; i-- {
		var cur int
		if j := i - (l - len(b)); j >= 0 {
			cur = a[i] - b[j] - carry
		} else {
			cur = a[i] - carry
		}
		if cur < 0 {
			cur = cur + 10
			carry = 1
		} else {
			carry = 0
		}
		sub[i] = cur
	}
	return stripLeadingZero(sub)
}

func slicePadSufN(a []int, n int) []int {
	for ; n > 0; n-- {
		a = append(a, 0)
	}
	return a
}

func max(a, b int) int {
	if a >= b {
		return a
	} else {
		return b
	}
}

func stripLeadingZero(a []int) []int {
	i := 0
	for i < len(a) {
		if a[i] != 0 {
			break
		}
		i++
	}
	if i == len(a) {
		return []int{0}
	} else {
		return a[i:]
	}
}
