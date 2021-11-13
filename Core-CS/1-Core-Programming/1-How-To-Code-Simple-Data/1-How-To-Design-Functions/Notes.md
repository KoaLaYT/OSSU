### Goals

- Be able to use the How to Design Functions (HtDF) recipe to design functions that operate on primitive data. 
- Be able to read a complete function design and identify its different elements.
- Be able to evaluate the different elements for clarity, simplicity and consistency with each other.
- Be able to evaluate the entire design for how well it solves the given problem.



### How To Design Functions (HtDF)

The HtDF recipe consists of the following steps:

- Signature, purpose and stub
- Define examples, wrap each in `check-expect`
- Template and inventory
- Code the function body
- Test and debug until correct

Following is a example in BSL:

``` lisp
;; Number -> Number
;; produces n times 2
(check-expect (double 0) (* 0 2))
(check-expect (double 1) (* 1 2))
(check-expect (double 3) (* 3 2))

;(define (double n) 0) ; this is the stub

;(define (double n)    ; this is the template
;  (... n))

(define (double n)
  (* n 2))
```

