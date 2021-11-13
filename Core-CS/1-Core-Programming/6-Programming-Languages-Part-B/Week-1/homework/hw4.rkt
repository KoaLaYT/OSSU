
#lang racket

(provide (all-defined-out)) ;; so we can put tests in a second file

;; put your code below
;; #1
(define (sequence low high stride)
  (define (aux index)
    (if (> index high)
        null
        (cons index (aux (+ index stride)))))
  (aux low))
;; #2
(define (string-append-map xs suffix)
  (map (λ (x) (string-append x suffix)) xs))
;; #3
(define (list-nth-mod xs n)
  (cond [(< n 0) (error "list-nth-mod: negative number")]
        [(null? xs) (error "list-nth-mod: empty list")]
        [#t (let ([i (remainder n (length xs))])
              (car (list-tail xs i)))]))
;; #4
(define (stream-for-n-steps s n)
  (if (= n 0)
      null
      (let ([pr (s)])
        (cons (car pr) (stream-for-n-steps (cdr pr) (- n 1))))))
;; #5
(define funny-number-stream
  (letrec ([f (λ (n)
                (let ([val (if (= 0 (remainder n 5))
                               (- 0 n)
                               n)])
                  (cons val (λ () (f (+ 1 n))))))])
    (λ () (f 1))))
;; #6
(define dan-then-dog
  (letrec ([dan-and-dog (cons "dan.jpg" "dog.jpg")]
           [f (λ (n)
                (let ([val (if (= 0 (remainder n 2))
                               (cdr dan-and-dog)
                               (car dan-and-dog))])
                  (cons val (λ () (f (+ 1 n))))))])
    (λ () (f 1))))
;; #7
(define (stream-add-zero s)
  (letrec ([f (λ (s)
                (let ([pr (s)])
                  (cons (cons 0 (car pr)) (λ () (f (cdr pr))))))])
    (λ () (f s))))
;; #8
(define (cycle-lists xs ys)
  (letrec ([f (λ (n) (cons
                      (cons (list-nth-mod xs n) (list-nth-mod ys n))
                      (λ () (f (+ 1 n)))))])
    (λ () (f 0))))
;; #9
(define (vector-assoc v vec)
  (letrec ([length (vector-length vec)]
           [aux (λ (n) (if (= n length)
                           #f
                           (let ([ele (vector-ref vec n)])
                             (if (and (pair? ele)
                                      (equal? (car ele) v))
                                 ele
                                 (aux (+ 1 n))))))])
    (aux 0)))
;; #10
(define (cached-assoc xs n)
  (letrec ([cache (make-vector n #f)]
           [pos 0]
           [f (λ (v) (let ([ans (vector-assoc v cache)])
                       (if ans
                           (cdr ans) ; (begin (print "cached") (cdr ans))
                           (let ([new-ans (assoc v xs)])
                             (if new-ans
                                 (begin (vector-set! cache pos (cons v new-ans))
                                        (set! pos (+ 1 pos))
                                        (if (= pos n) (set! pos 0) #t)
                                        new-ans)
                                 #f)))))])
    f))
;; #11
(define-syntax while-less
  (syntax-rules (do)
    [(while-less e1 do e2)
     (letrec ([v1 e1]
              [f (λ () (if (<= v1 e2)
                           #t
                           (f)))])
       (f))]))