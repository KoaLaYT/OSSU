(* Coursera Programming Languages, Homework 3, Provided Code *)

exception NoAnswer

datatype pattern = Wildcard
		 | Variable of string
		 | UnitP
		 | ConstP of int
		 | TupleP of pattern list
		 | ConstructorP of string * pattern

datatype valu = Const of int
	      | Unit
	      | Tuple of valu list
	      | Constructor of string * valu

fun g f1 f2 p =
    let 
	val r = g f1 f2 
    in
	case p of
	    Wildcard          => f1 ()
	  | Variable x        => f2 x
	  | TupleP ps         => List.foldl (fn (p,i) => (r p) + i) 0 ps
	  | ConstructorP(_,p) => r p
	  | _                 => 0
    end

(**** for the challenge problem only ****)

datatype typ = Anything
	     | UnitT
	     | IntT
	     | TupleT of typ list
	     | Datatype of string

(**** you can put all your code here ****)

(* #1 *)
val only_capitals = List.filter (fn s => (Char.isUpper o String.sub) (s, 0))

(* #2 *)
val longest_string1 = 
    let fun compare_length (s1, s2) = if String.size s1 > String.size s2
                                      then s1
                                      else s2
    in  List.foldl compare_length ""
    end

(* #3 *)
val longest_string2 = 
    let fun compare_length (s1, s2) = if String.size s1 >= String.size s2
                                      then s1
                                      else s2
    in  List.foldl compare_length ""
    end

(* #4.a *)
fun longest_string_helper pred ss = 
    let fun aux ss ls =
            case ss of 
                 [] => ls
               | s::ss' => if pred (String.size s, String.size ls)
                           then aux ss' s
                           else aux ss' ls
    in aux ss ""
    end
(* #4.b *)
val longest_string3 = longest_string_helper (fn (x, y) => x > y)
(* #4.c *)
val longest_string4 = longest_string_helper (fn (x, y) => x >= y )

(* #5 *)
val longest_capitalized = longest_string1 o only_capitals

(* #6 *)
val rev_string =  String.implode o List.rev o String.explode

(* #7 *)
fun first_answer f xs =
    case xs of 
         [] => raise NoAnswer
       | x::xs' => case f x of
                        NONE => first_answer f xs'
                      | SOME v => v

(* #8 *)
fun all_answers f xs =
    let fun aux xs acc =
            case xs of 
                 [] => SOME acc
               | x::xs' => case f x of
                                NONE => NONE
                              | SOME lst => aux xs' (acc @ lst)
    in aux xs []
    end

(* #9.a *)
val count_wildcards = g (fn () => 1) (fn x => 0)
(* #9.b *)
val count_wild_and_variable_lengths = g (fn () => 1) String.size
(* #9.c *)
fun count_some_var (s, p) =
    let val aux = g (fn () => 0) (fn x => if x = s then 1 else 0)
    in aux p
    end
(*
datatype pattern = Wildcard
		 | Variable of string
		 | UnitP
		 | ConstP of int
		 | TupleP of pattern list
		 | ConstructorP of string * pattern

datatype valu = Const of int
	      | Unit
	      | Tuple of valu list
	      | Constructor of string * valu
*)

(* #10 *)
val check_pat =
    let fun all_variables p =
            case p of
                 Variable str => [str]
               | TupleP pl => List.foldl (fn (p, i) => i @ (all_variables p)) [] pl
               | ConstructorP (_, p) => all_variables p
               | _ => []
        fun has_repeats ss = 
            case ss of 
                 [] => false
               | s::ss' => (List.exists (fn x => x = s) ss')
                           orelse has_repeats ss'
    in not o has_repeats o all_variables
    end

(* #11 *)
fun match vp =
    case vp of
         (_, Wildcard) => SOME []
       | (v, Variable s) => SOME [(s,v)]
       | (Unit, UnitP) => SOME []
       | (Const v1, ConstP v2) => if v1 = v2 then SOME [] else NONE
       | (Tuple vs, TupleP ps) => all_answers match (ListPair.zip (vs,ps))
       | (Constructor (s1,v), ConstructorP (s2,p)) => if s1 = s2 
                                                      then match (v,p) 
                                                      else NONE
       | _ => NONE

(* #12 *)
fun first_match v pl = 
  SOME (first_answer (fn p => match (v, p)) pl) handle NoAnswer => NONE






