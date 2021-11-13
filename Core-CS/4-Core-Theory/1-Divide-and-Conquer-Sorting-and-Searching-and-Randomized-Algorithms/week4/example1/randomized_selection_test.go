package example1

import "testing"

func TestRandomSelect(t *testing.T) {
	array := []int{3, 1, 4, 5, 8, 9, 2}

	got := RandomSelect(array, 2)
	if got != 2 {
		t.Errorf("Expect: 2, Got: %v", got)
	}

	got = RandomSelect(array, 4)
	if got != 4 {
		t.Errorf("Expect: 4, Got: %v", got)
	}

	got = RandomSelect(array, 5)
	if got != 5 {
		t.Errorf("Expect: 5, Got: %v", got)
	}

	got = RandomSelect(array, 6)
	if got != 8 {
		t.Errorf("Expect: 8, Got: %v", got)
	}
}
