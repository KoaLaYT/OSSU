package example2

/*
Strassen's matrix multiplication

Input: two n*n matrix (for simplicity, assume n is even)
Output: the multiplication of the two matrix
Example:
matrix multiplication's definition:
    A | B     E | F     AE+BG | AF+BH
    --†--  *  --†--  =  ------†------
    C | D     G | H     CE+DG | CF+DH
Strassen's trick:
    P1 = A(F-H)
    P2 = (A+B)H
    P3 = (C+D)E
    P4 = D(G-E)
    P5 = (A+D)(E+H)
    P6 = (B-D)(G+H)
    P7 = (A-C)(E+F)
result:
    P5+P4-P2+P6 | P1+P2
    ------------†------------
    P3+P4       | P1+P5-P3-P7
*/

func StrassenMatrixMul(a, b [][]int) [][]int {
	if len(a) == 0 {
		return [][]int{}
	}
	return matMul(a, b)
}

func matMul(a, b [][]int) [][]int {
	size := len(a)
	// base case
	if size == 1 {
		return [][]int{{a[0][0] * b[0][0]}}
	}
	// divide
	A := matDivide(a, 0, 0, size/2)
	B := matDivide(a, 0, size/2, size/2)
	C := matDivide(a, size/2, 0, size/2)
	D := matDivide(a, size/2, size/2, size/2)
	E := matDivide(b, 0, 0, size/2)
	F := matDivide(b, 0, size/2, size/2)
	G := matDivide(b, size/2, 0, size/2)
	H := matDivide(b, size/2, size/2, size/2)
	// recursive
	P1 := matMul(A, matSub(F, H))
	P2 := matMul(matAdd(A, B), H)
	P3 := matMul(matAdd(C, D), E)
	P4 := matMul(D, matSub(G, E))
	P5 := matMul(matAdd(A, D), matAdd(E, H))
	P6 := matMul(matSub(B, D), matAdd(G, H))
	P7 := matMul(matSub(A, C), matAdd(E, F))
	lt := matAdd(matSub(matAdd(P5, P4), P2), P6)
	rt := matAdd(P1, P2)
	lb := matAdd(P3, P4)
	rb := matSub(matSub(matAdd(P1, P5), P3), P7)
	return matCombine(lt, rt, lb, rb)
}

func matAdd(a, b [][]int) [][]int {
	size := len(a)
	res := make([][]int, size)
	for i := 0; i < size; i++ {
		res[i] = make([]int, size)
		for j := 0; j < size; j++ {
			res[i][j] = a[i][j] + b[i][j]
		}
	}
	return res
}

func matSub(a, b [][]int) [][]int {
	size := len(a)
	res := make([][]int, size)
	for i := 0; i < size; i++ {
		res[i] = make([]int, size)
		for j := 0; j < size; j++ {
			res[i][j] = a[i][j] - b[i][j]
		}
	}
	return res
}

func matDivide(a [][]int, row, col, size int) [][]int {
	res := make([][]int, size)
	for i := 0; i < size; i++ {
		res[i] = make([]int, size)
		copy(res[i], a[i+row][col:col+size])
	}
	return res
}

func matCombine(lt, rt, lb, rb [][]int) [][]int {
	size := len(rt) * 2
	res := make([][]int, size)
	for i := 0; i < size; i++ {
		res[i] = make([]int, size)
		for j := 0; j < size; j++ {
			switch {
			case i < size/2 && j < size/2:
				res[i][j] = lt[i][j]
			case i < size/2 && j >= size/2:
				res[i][j] = rt[i][j-size/2]
			case i >= size/2 && j < size/2:
				res[i][j] = lb[i-size/2][j]
			case i >= size/2 && j >= size/2:
				res[i][j] = rb[i-size/2][j-size/2]
			}
		}
	}
	return res
}
