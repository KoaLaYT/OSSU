(* Homework3 Simple Test*)
(* These are basic test cases. Passing these tests does not guarantee that your code will pass the actual homework grader *)
(* To run the test, add a new line to the top of this file: use "homeworkname.sml"; *)
(* All the tests should evaluate to true. For example, the REPL should say: val test1 = true : bool *)
load "ListPair";
use "hw3provided.sml";

(*
val test1 = only_capitals ["Abc","bc","Ca", "Dq", "ea"] = ["Abc","Ca", "Dq"]

val test2 = longest_string1 ["A","bc","ac","C"] = "bc"

val test3 = longest_string2 ["A","bc","ac","C"] = "ac"

val test4a = longest_string3 ["A","bc","C"] = "bc"

val test4b = longest_string4 ["A","B","C"] = "C"

val test5a = longest_capitalized ["A","bc","C"] = "A"
val test5b = longest_capitalized ["a","bc","C", "D"] = "C"

val test6 = rev_string "abc" = "cba"

val test7 = first_answer (fn x => if x > 3 then SOME x else NONE) [1,2,3,4,5] = 4

val test8a = all_answers (fn x => if x = 1 then SOME [x] else NONE) [2,3,4,5,6,7] = NONE
val test8b = all_answers (fn x => if x > 1 then SOME [x] else NONE)
[2,3,4,5,6,7] = SOME [2,3,4,5,6,7]

val test9a1 = count_wildcards Wildcard = 1
val test9a2 = 
  count_wildcards (TupleP [Wildcard, ConstructorP ("heihei", Wildcard),
  Wildcard, Variable "yoyo"])
  = 3

val test9b1 = count_wild_and_variable_lengths (Variable("a")) = 1
val test9b2 = 
  count_wild_and_variable_lengths (TupleP [Wildcard, ConstructorP ("heihei", Wildcard),
  Wildcard, Variable "yoyo"])
  = 7

val test9c = count_some_var ("x", Variable("x")) = 1

val test10 = check_pat (Variable("x")) = true

val test11a = match (Const(1), UnitP) = NONE
val test11b = match (Const(1), ConstP 1) = SOME []
val test11c = match (Tuple [Const 1, Const 2], TupleP [Wildcard, Variable "c"])
= SOME [("c", Const 2)]
val test11d = match (Constructor ("xixi", Const 1), ConstructorP ("xixi", ConstP
1)) = SOME []
*)
val test = match (Tuple[Const 17,Unit,Const 4,Constructor ("egg",Const 4),Constructor ("egg",Constructor ("egg",Const 4))],TupleP[Wildcard,Wildcard])
(*
val test12 = first_match Unit [UnitP] = SOME []
*)
