(* Dan Grossman, Coursera PL, HW2 Provided Code *)

(* if you use this function to compare two strings (returns true if the same
   string), then you avoid several of the functions in problem 1 having
   polymorphic types that may be confusing *)
fun same_string(s1 : string, s2 : string) =
    s1 = s2

(* put your solutions for problem 1 here *)

(* #1.a *)
(* string * string list -> string list option *)
fun all_except_option (str, ss) = 
    let fun aux (ss, acc) =
            case ss of 
                 [] => NONE
               | s::ss' => if same_string (s, str)
                           then SOME (acc @ ss')
                           else aux (ss', s::acc)
    in aux (ss, [])
    end

(* #1.b *)
(* string list list * string -> string list *)
fun get_substitutions1 ([], s) = []
  | get_substitutions1 (strs::strss', s) =
        case all_except_option (s, strs) of
             NONE => get_substitutions1 (strss', s)
           | SOME ss => ss @ get_substitutions1 (strss', s)

(* #1.c *)
(* string list list * string -> string list *)
fun get_substitutions2 (strss, s) = 
    let fun aux ([], acc) = acc
          | aux (strs::strss', acc) = 
                case all_except_option (s, strs) of
                     NONE => aux (strss', acc)
                   | SOME ss => aux (strss', acc @ ss)
    in aux (strss, [])
    end

(* #1.d *)
(* string list list * {first: string, middle:string, last: string} -> {first: string, middle: string, last: string} list *)
fun similar_names (strss, {first=f, middle=m, last=l}) = 
    let val substitutions = get_substitutions2 (strss, f)
        fun aux subs =
            case subs of 
                 [] => []
               | sub::subs' => {first=sub, middle=m, last=l}::aux(subs')
    in {first=f, middle=m, last=l}::aux(substitutions)
    end

(* you may assume that Num is always used with values 2, 3, ..., 10
   though it will not really come up *)
datatype suit = Clubs | Diamonds | Hearts | Spades
datatype rank = Jack | Queen | King | Ace | Num of int 
type card = suit * rank

datatype color = Red | Black
datatype move = Discard of card | Draw 

exception IllegalMove

(* put your solutions for problem 2 here *)

(* #2.a *)
(* card -> color *)
fun card_color (suit, _) = 
    case suit of 
         Clubs => Black
       | Spades => Black
       | Diamonds => Red
       | Hearts => Red

(* #2.b *)
(* card -> int *)
fun card_value (_, rank) =
    case rank of
         Num i => i
       | Ace => 11
       | _ => 10


(* #2.c *)
(* card list * card * exn -> card list *)
fun remove_card ([], _, e) = raise e
  | remove_card (fc::cs, c, e) =
      if fc = c
      then cs
      else fc::remove_card (cs, c, e)

(* #2.d *)
(* card list -> bool *)
fun all_same_color cs =
    case cs of 
         [] => true
       | (fc::[]) => true
       | (fc::(sc::cs')) => if card_color fc = card_color sc
                            then all_same_color (sc::cs')
                            else false

(* #2.e *)
(* card list -> int *)
fun sum_cards cs =
    let fun aux (cs, acc) =
            case cs of
                [] => acc
              | (c::cs') => aux(cs', acc + card_value c)
    in aux (cs, 0)
    end

(* #2.f *)
(* card list * int -> int *)
fun score (cs, g) =
    let 
        val sum = sum_cards cs
        val ps = if sum > g then 3 * (sum - g) else g - sum
    in 
        if all_same_color cs
        then ps div 2
        else ps
    end

(* #2.g *)
(* card list * move list * int -> int *)
fun officiate (cs, ms, g) =
    let
        fun process_move (cs, ms, hs) =
            case ms of
                 [] => score (hs, g)
               | ((Discard c)::ms') => process_move (cs, ms', remove_card (hs, c, IllegalMove))
               | (Draw::ms') => case cs of 
                                     [] => score (hs, g)
                                   | c::cs' => if sum_cards (c::hs) > g
                                               then score (c::hs, g)
                                               else process_move (cs', ms', c::hs)
    in process_move (cs, ms, [])
    end

(* #3.a.0 *)
(* count how many Ace cards in the given card list *)
(* card list -> int *)
fun count_ace_number cs =
    case cs of
         [] => 0
       | (_, Ace)::cs' => 1 + count_ace_number cs'
       | _::cs' => count_ace_number cs'

(* #3.a.1 *)
(* card list * int -> int *)
fun score_challenge (cs, g) =
    let 
        fun get_ps sum = if sum > g then 3 * (sum - g) else g - sum
        fun get_least_ps (sum, n, least) = 
            let val new_ps = get_ps sum
            in if n = 0
               then least
               else get_least_ps (sum - 10, n - 1, Int.min(new_ps, least))
            end

        val ace_numbers = count_ace_number cs
        val sum = sum_cards cs
        val current_ps = get_ps sum
        val least_ps = get_least_ps (sum, ace_numbers, current_ps)
    in  
        if all_same_color cs
        then least_ps div 2
        else least_ps
    end

(* #3.a.2 *)
(* card list * move list * int -> int *)
fun officiate_challenge (cs, ms, g) =
    let
        fun process_move (cs, ms, hs) =
            case ms of
                 [] => score_challenge (hs, g)
               | ((Discard c)::ms') => process_move (cs, ms', remove_card (hs, c, IllegalMove))
               | (Draw::ms') => case cs of 
                                     [] => score_challenge (hs, g)
                                   | c::cs' => let 
                                                   val aces = count_ace_number (c::hs)
                                                   val least_sum = sum_cards (c::hs) - aces * 10
                                               in 
                                                   if least_sum > g
                                                   then score_challenge (c::hs, g)
                                                   else process_move (cs', ms', c::hs)
                                               end
    in process_move (cs, ms, [])
    end

(* #3.b *)
(* card list * int -> move list *)
fun careful_player (cs, g) =
    let (* card * card list * card list -> card option *)
        fun try (c, hs, acc) =
            case hs of 
                 [] => NONE
               | h::hs' => if score (c::hs' @ acc, g) = 0
                           then SOME h
                           else try (c, hs', h::acc)
        (* card list * card list * move list -> move list *)
        fun next_move ([], _, ms) = ms
          | next_move (c::cs', hs, ms) = 
            if score (hs, g) = 0
            then ms
            else if g - sum_cards hs > 10
            then next_move (cs', c::hs, ms @ [Draw])
            else case try (c, hs, []) of
                      SOME card => ms @ [Discard card, Draw]
                    | NONE => (case hs of 
                                    [] => ms
                                  | h::hs' => next_move (cs', hs', ms @ [Discard h, Draw]))
    in
        next_move (cs, [], [])
    end






