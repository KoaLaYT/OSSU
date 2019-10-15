(* #1
 * check two dates, if first is older than second,
 * then return true, otherwise false
 *
 * is_older ==> (int*int*int) * (int*int*int) -> bool 
 *)
fun is_older (d1: (int*int*int), d2: (int*int*int)) =
    if      (#1 d1) < (#1 d2)
    then true
    else if (#1 d1) > (#1 d2)
    then false
    else if (#2 d1) < (#2 d2)
    then true
    else if (#2 d1) > (#2 d2)
    then false
    else if (#3 d1) < (#3 d2)
    then true
    else false

(* #2
 * return the number of dates in a given list of a given month
 *
 * number_in_month ==> (int*int*int) list * int -> int
 *)
fun number_in_month (dates: (int*int*int) list, month: int) =
    let fun accumulator(ds: (int*int*int) list, number: int) =
            if null ds
            then number
            else if #2 (hd ds) = month
            then accumulator(tl ds, number + 1)
            else accumulator(tl ds, number)
    in accumulator(dates, 0)
    end

(* #3
 * return the number dates in a given list of a given month list
 * ASSUME: no number repeat in the month list
 *
 * number_in_months ==> (int*int*int) list * int list -> int
 *)
fun number_in_months (dates: (int*int*int) list, months: int list) =
    let fun accumulator(ms: int list, number: int) =
            if null ms
            then number
            else accumulator(tl ms, number + number_in_month(dates, hd ms))
    in accumulator(months, 0)
    end

(* #4
 * return a list of date of the given date list that contain the given month
 *
 * dates_in_month ==> (int*int*int) list * int -> (int*int*int) list
 *)
fun dates_in_month (dates: (int*int*int) list, month: int) = 
    if null dates
    then []
    else if #2 (hd dates) = month
    then (hd dates)::dates_in_month (tl dates, month)
    else dates_in_month(tl dates, month)

(* #5
 * return a list holding the dates from the given list of dates that are in any
 * of the months in the list of months
 *
 * dates_in_months ==> (int*int*int) list * int list -> (int*int*int) list
 *)
fun dates_in_months (dates: (int*int*int) list, months: int list) =
    if null months
    then []
    else dates_in_month(dates, hd months) @ dates_in_months(dates, tl months)

(* #6
 * return the nth element of the given string list
 *
 * get_nth ==> (string list) * int -> string
 *)
fun get_nth (strs: string list, n: int) =
    if n = 1
    then hd strs
    else get_nth(tl strs, n - 1)

(* #7
 * return the string format of the given date
 * example: (2013,1,20) => "January 20, 2013"
 *
 * date_to_string ==> (int*int*int) -> string
 *)
fun date_to_string (date: (int*int*int)) =
    let val month_strs = 
            ["January", "February", "March", "April",
             "May", "June", "July", "August", "September",
             "October", "November", "December"]
        val year  = #1 date
        val month = #2 date
        val day   = #3 date
    in get_nth(month_strs, month) ^ " " ^
       Int.toString(day) ^ ", " ^
       Int.toString(year)
    end

(* #8
 * return an int n that the first n elements of a given list add to less than
 * the given int sum, but the first n+1 elements of the list add to sum or more
 *
 * number_before_reaching_sum ==> int * int list -> int
 *)
fun number_before_reaching_sum (sum: int, nums: int list) =
    if sum <= hd nums
    then 0
    else 1 + number_before_reaching_sum(sum - hd nums, tl nums)

(* #9
 * takes a day of year and returns what month that day is in
 * 
 * what_month ==> int -> int
 *)
fun what_month day =
    let val months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    in 1 + number_before_reaching_sum (day, months)
    end

(* #10
 * takes two days of the year and returns an month list between them
 *
 * month_range ==> int * int -> int list
 *)
fun month_range (day1: int, day2: int) =
    if day1 > day2
    then []
    else what_month day1 :: month_range (day1 + 1, day2)

(* #11
 * takes a list of dates and return
 * - NONE, if the list has no dates
 * - SOME d, where d is the oldest date
 *
 * oldest ==> (int*int*int) list -> (int*int*int) option
 *)
fun oldest (dates: (int*int*int) list) =
    if null dates
    then NONE
    else let fun oldestOfDates (ds: (int*int*int) list) =
                 if null (tl ds)
                 then hd ds
                 else let val oldestOfLeft = oldestOfDates(tl ds)
                      in if is_older(hd ds, oldestOfLeft)
                         then hd ds
                         else oldestOfLeft
                      end
          in SOME (oldestOfDates dates)
          end

(* #12
 * remove the duplicated number of a given int list
 *
 * remove_duplicates ==> int list -> int list
 *)
fun remove_duplicates (xs: int list) =
    let fun exists (x: int, ys: int list) =
            if null ys
            then false
            else if hd ys = x
            then true
            else exists (x, tl ys)
    in if null xs
       then []
       else if null (tl xs)
       then xs
       else if exists (hd xs, tl xs)
       then remove_duplicates(tl xs)
       else (hd xs) :: remove_duplicates(tl xs)
    end

fun number_in_months_challenge (dates: (int*int*int) list, months: int list) =
    let val none_repeat_months = remove_duplicates(months)
    in number_in_months(dates, none_repeat_months)
    end

fun dates_in_months_challenge (dates: (int*int*int) list, months: int list) =
    let val none_repeat_months = remove_duplicates(months)
    in dates_in_months(dates, none_repeat_months)
    end

(* #13
 * determine if the given date is a reasonable date
 *
 * reasonable_date ==> (int*int*int) -> bool
 *)
fun reasonable_date (date: (int*int*int)) =
    let val days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        val y = #1 date
        val m = #2 date
        val d = #3 date

        fun is_leap_year (year: int) =
            if ((year mod 400) = 0 orelse
                (year mod 4) = 0) andalso
                (not ((year mod 100) = 0))
            then true
            else false
        fun get_days (n: int, ds: int list) =
            if n = 1
            then hd ds
            else get_days(n-1, tl ds)
        (* days upper boundary *)
        val dmax = if is_leap_year(y) andalso m = 2
                   then 29
                   else get_days(m, days)
    in y > 0 andalso
       m >= 1 andalso
       m <= 12 andalso
       d >= 1 andalso
       d <= dmax
    end




