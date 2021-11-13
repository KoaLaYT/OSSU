;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-advanced-reader.ss" "lang")((modname merge-sort) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
;; merge sort
;; (listof Number) -> (listof Number)
;; Consumes a list of numbers, produce them in ascending order by using merge sort
(check-expect (merge-sort empty) empty)
(check-expect (merge-sort (list 2)) (list 2))
(check-expect (merge-sort (list 3 7 1 0)) (list 0 1 3 7))
(check-expect (merge-sort (list 9 8 7 6 5 4 3 2 1 0)) (list 0 1 2 3 4 5 6 7 8 9))

;(define (merge-sort lon) lon) ;stub

(define (merge-sort lon0)
  (local [(define (merge lon)
            (cond [(empty? lon) empty]
                  [(empty? (rest lon)) lon]
                  [else
                   (combine (merge (first-half lon))
                            (merge (second-half lon)))]))
          (define (combine lon1 lon2)
            (cond [(empty? lon1) lon2]
                  [(empty? lon2) lon1]
                  [else
                   (if (< (first lon1) (first lon2))
                       (cons (first lon1) (combine (rest lon1) lon2))
                       (cons (first lon2) (combine lon1 (rest lon2))))]))
          (define (first-half lon)
            (local [(define (fst-half lon result count len)
                      (cond [(empty? lon) result]
                            [else
                             (if (= count len)
                                 result
                                 (fst-half (rest lon) (append result (list (first lon))) (add1 count) len))]))]
              (fst-half lon empty 0 (ceiling (/ (length lon) 2)))))
          (define (second-half lon)
            (local [(define (snd-half lon result count len)
                      (cond [(empty? lon) result]
                            [else
                             (if (>= count len)
                                 (snd-half (rest lon) (append result (list (first lon))) (add1 count) len)
                                 (snd-half (rest lon) result (add1 count) len))]))]
              (snd-half lon empty 0 (ceiling (/ (length lon) 2)))))]
    (merge lon0)))
