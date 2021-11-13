(* Homework1 Simple Test *)
(* These are basic test cases. Passing these tests does not guarantee that your code will pass the actual homework grader *)
(* To run the test, add a new line to the top of this file: use "homeworkname.sml"; *)
(* All the tests should evaluate to true. For example, the REPL should say: val test1 = true : bool *)
use "homework1.sml";

(* test case for <is_older> *)
(*
val test1a = is_older ((1,2,3),(2,3,4)) = true
val test1b = is_older ((3,2,3),(3,1,3)) = false
val test1c = is_older ((2,2,3),(2,3,3)) = true
val test1d = is_older ((2,3,3),(2,2,3)) = false
val test1e = is_older ((2,3,3),(2,3,4)) = true
val test1f = is_older ((2,3,3),(2,3,2)) = false
val test1g = is_older ((2,3,3),(2,3,3)) = false
*)

(* test case for <number_in_month> *)
(*
val test2a = number_in_month ([], 1) = 0
val test2b = number_in_month ([(2012,2,28),(2013,12,1)],2) = 1
val test2c = number_in_month
([(2012,2,28),(2013,12,1),(2014,2,2),(2012,2,3),(2012,3,3)],2) = 3
*)

(* test case for <number_in_months> *)
(*
val test3a = number_in_months ([],[]) = 0
val test3b = number_in_months ([],[1]) = 0
val test3c = number_in_months ([(2012,2,28)], []) = 0
val test3b = number_in_months ([(2012,2,28),(2013,12,1),(2011,3,31),(2011,4,28)],[2,3,4]) = 3
*)

(* test case for <dates_in_month> *)
(*
val test4a = dates_in_month ([],2) = []
val test4b = dates_in_month ([(2012,2,28),(2013,12,1)],2) = [(2012,2,28)]
val test4c = dates_in_month
([(2012,2,28),(2012,2,27),(2012,3,1),(2012,2,26),(2012,3,2)],2) =
[(2012,2,28),(2012,2,27),(2012,2,26)]
*)

(* test case for <dates_in_months> *)
(*
val test5a = dates_in_months ([],[]) = []
val test5b = dates_in_months ([],[1]) = []
val test5c = dates_in_months ([(2012,2,28)], []) = []
val test5d = dates_in_months ([(2012,2,28),(2013,12,1),(2011,3,31),(2011,4,28)],[2,3,4]) = [(2012,2,28),(2011,3,31),(2011,4,28)]
*)

(* test case for <get_nth> *)
(*
val test6a = get_nth (["hi", "there", "how", "are", "you"], 1) = "hi"
val test6b = get_nth (["hi", "there", "how", "are", "you"], 2) = "there"
val test6c = get_nth (["hi", "there", "how", "are", "you"], 5) = "you"
*)

(* test case for <date_to_string> *)
(*
val test7 = date_to_string (2013, 6, 1) = "June 1, 2013"
*)

(* test case for <number_before_reaching_sum> *)
(*
val test8 = number_before_reaching_sum (10, [1,2,3,4,5]) = 3
*)

(* test case for <what_month> *)
(*
val test9 = what_month 70 = 3
*)

(* test case for <month_range> *)
(*
val test10 = month_range (31, 34) = [1,2,2,2]
*)

(* test case for <olderst> *)
(*
val test11a = oldest([]) = NONE
val test11b = oldest([(2012,2,28),(2011,3,31),(2011,4,28)]) = SOME (2011,3,31)
*)

(* test case for <remove_duplicates> *)
(*
val test12a = remove_duplicates ([]) = []
val test12b = remove_duplicates ([1]) = [1]
val test12c = remove_duplicates ([1,1,1]) = [1]
val test12d = remove_duplicates ([2,1,2,3,3,4,1]) = [2,3,4,1]
*)

(* test case for <number_in_months_challenge> *)
(*
val test13a = number_in_months_challenge ([],[]) = 0
val test13b = number_in_months_challenge ([],[1]) = 0
val test13c = number_in_months_challenge ([(2012,2,28)], []) = 0
val test13b = number_in_months_challenge
([(2012,2,28),(2013,12,1),(2011,3,31),(2011,4,28)],[2,3,2,3,4]) = 3
*)

(* test case for <reasonable_date> *)
val test14a = reasonable_date (2004,2,29) = true
val test14b = reasonable_date (2000,2,29) = false
