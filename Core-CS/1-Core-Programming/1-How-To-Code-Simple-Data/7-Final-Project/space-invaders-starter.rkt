;; The first three lines of this file were inserted by DrRacket. They record metadata
;; about the language level of this file in a form that our tools can easily process.
#reader(lib "htdp-beginner-abbr-reader.ss" "lang")((modname space-invaders-starter) (read-case-sensitive #t) (teachpacks ()) (htdp-settings #(#t constructor repeating-decimal #f #t none #f () #f)))
(require 2htdp/universe)
(require 2htdp/image)

;; Space Invaders


;; Constants:

(define WIDTH  300)
(define HEIGHT 500)

(define INVADER-X-SPEED 1.5)  ;speeds (not velocities) in pixels per tick
(define INVADER-Y-SPEED 1.5)
(define TANK-SPEED 2)
(define MISSILE-SPEED 10)

(define HIT-RANGE 10)

(define INVADE-RATE 100)

(define BACKGROUND (empty-scene WIDTH HEIGHT))

(define INVADER
  (overlay/xy (ellipse 10 15 "outline" "blue")              ;cockpit cover
              -5 6
              (ellipse 20 10 "solid"   "blue")))            ;saucer

(define TANK
  (overlay/xy (overlay (ellipse 28 8 "solid" "black")       ;tread center
                       (ellipse 30 10 "solid" "green"))     ;tread outline
              5 -14
              (above (rectangle 5 10 "solid" "black")       ;gun
                     (rectangle 20 10 "solid" "black"))))   ;main body

(define TANK-HEIGHT/2 (/ (image-height TANK) 2))

(define MISSILE (ellipse 5 15 "solid" "red"))



;; Data Definitions:

(define-struct game (invaders missiles tank tick))
;; Game is (make-game  (listof Invader) (listof Missile) Tank Natural)
;; interp. the current state of a space invaders game
;;         with the current invaders, missiles, tank position and time elapsed

;; Game constants defined below Missile data definition

#;
(define (fn-for-game s)
  (... (fn-for-loinvader (game-invaders s))
       (fn-for-lom (game-missiles s))
       (fn-for-tank (game-tank s))
       (game-tick s)))



(define-struct tank (x dir))
;; Tank is (make-tank Number Integer[-1, 1])
;; interp. the tank location is x, HEIGHT - TANK-HEIGHT/2 in screen coordinates
;;         the tank moves TANK-SPEED pixels per clock tick left if dir -1, right if dir 1

(define T0 (make-tank (/ WIDTH 2) 1))   ;center going right
(define T1 (make-tank 50 1))            ;going right
(define T2 (make-tank 50 -1))           ;going left

#;
(define (fn-for-tank t)
  (... (tank-x t) (tank-dir t)))



(define-struct invader (x y dx))
;; Invader is (make-invader Number Number Number)
;; interp. the invader is at (x, y) in screen coordinates
;;         the invader along x by dx pixels per clock tick

(define I1 (make-invader 150 100 12))           ;not landed, moving right
(define I2 (make-invader 150 HEIGHT -10))       ;exactly landed, moving left
(define I3 (make-invader 150 (+ HEIGHT 10) 10)) ;> landed, moving right


#;
(define (fn-for-invader invader)
  (... (invader-x invader) (invader-y invader) (invader-dx invader)))


(define-struct missile (x y))
;; Missile is (make-missile Number Number)
;; interp. the missile's location is x y in screen coordinates

(define M1 (make-missile 150 300))                               ;not hit U1
(define M2 (make-missile (invader-x I1) (+ (invader-y I1) 10)))  ;exactly hit U1
(define M3 (make-missile (invader-x I1) (+ (invader-y I1)  5)))  ;> hit U1

#;
(define (fn-for-missile m)
  (... (missile-x m) (missile-y m)))


(define G0 (make-game empty empty T0 0))
(define G1 (make-game empty empty T1 1))
(define G2 (make-game (list I1) (list M1) T1 1))
(define G3 (make-game (list I1 I2) (list M1 M2) T1 1))


;; Functions:

;; Game -> Game
;; start the world with (main G0)
;;
(define (main g)
  (big-bang g                       ;Game
    (on-tick update-state)          ;Game -> Game
    (to-draw render)                ;Game -> Image
    (on-key response)               ;Game KeyEvent -> Game
    (stop-when hasLanded)))         ;Game -> Boolean

;; Game -> Game
;; generate the next game state
(check-expect (update-state G0) (make-game empty empty (make-tank (+ (/ WIDTH 2) (* TANK-SPEED 1)) 1) 1))
(check-expect (update-state G2)
              (make-game (list (make-invader (+ 150 12) 101.5 12))
                         (list (make-missile 150 (- 300 MISSILE-SPEED)))
                         (make-tank (+ 50 TANK-SPEED) 1) 2))
(check-expect (update-state (make-game (list (make-invader 150 90 10))
                                       (list (make-missile 160 110))
                                       (make-tank 50 -1)
                                       8))
              (make-game empty
                         empty
                         (make-tank 48 -1)
                         9))

;(define (update-state g) g) ;stub

(define (update-state s)
  (new-invader (check-hits (next-position s))))

;; Game -> Game
;; produce next postions of Invaders, Missiles, Tank and tick
(check-expect (next-position (make-game empty empty (make-tank 50 1) 0))
              (make-game empty empty (make-tank 52 1) 1))
(check-expect (next-position (make-game empty empty (make-tank WIDTH 1) 0)) ;tank at right most
              (make-game empty empty (make-tank WIDTH 1) 1))
(check-expect (next-position (make-game empty empty (make-tank 0 -1) 0))    ;tank at left most
              (make-game empty empty (make-tank 0 -1) 1))
(check-expect (next-position (make-game (list (make-invader WIDTH 50 10))   ;invader at right most
                                        empty
                                        (make-tank 50 1)
                                        0))
              (make-game (list (make-invader (- WIDTH 10) 51.5 -10))
                         empty
                         (make-tank 52 1)
                         1))
(check-expect (next-position (make-game (list (make-invader 0 50 -10))   ;invader at left most
                                        empty
                                        (make-tank 50 1)
                                        0))
              (make-game (list (make-invader 10 51.5 10))
                         empty
                         (make-tank 52 1)
                         1))
(check-expect (next-position (make-game empty
                                        (list (make-missile 100 150))
                                        (make-tank 50 1)
                                        0))
              (make-game empty
                         (list (make-missile 100 140))
                         (make-tank 52 1)
                         1))

;(define (next-position s) s) ;stub

(define (next-position s)
  (make-game (next-invaders (game-invaders s))
             (next-missiles (game-missiles s))
             (next-tank (game-tank s))
             (+ (game-tick s) 1)))

;; ListOfInvaders -> ListOfInvaders
;; generate next positions of the invaders
(check-expect (next-invaders empty) empty)
(check-expect (next-invaders (list (make-invader WIDTH 50 10))) ;right most
              (list (make-invader (- WIDTH 10) 51.5 -10)))
(check-expect (next-invaders (list (make-invader 0 50 -10)))    ;left most
              (list (make-invader 10 51.5 10)))

;(define (next-invaders loi) loi) ;stub
(define (next-invaders loi)
  (cond [(empty? loi) empty]
        [else
         (cons (next-invader (first loi))
               (next-invaders (rest loi)))]))

;; Invader -> Invader
(define (next-invader i)
  (cond [(> (+ (invader-x i) (invader-dx i)) WIDTH)
         (make-invader (- (* 2 WIDTH) (+ (invader-x i) (invader-dx i)))
                       (+ (invader-y i) INVADER-Y-SPEED)
                       (- (invader-dx i)))]
        [(< (+ (invader-x i) (invader-dx i)) 0)
         (make-invader (- (+ (invader-x i) (invader-dx i)))
                       (+ (invader-y i) INVADER-Y-SPEED)
                       (- (invader-dx i)))]
        [else
         (make-invader (+ (invader-x i) (invader-dx i))
                       (+ (invader-y i) INVADER-Y-SPEED)
                       (invader-dx i))]))

;; ListOfMissiles -> ListOfMissiles
;; generate next positions of the missiles, and move out screen missiles
(check-expect (next-missiles empty) empty)
(check-expect (next-missiles (list (make-missile 100 200)))
              (list (make-missile 100 190)))
(check-expect (next-missiles (list (make-missile 100 0))) ;remove those out of screen missiles
              empty)

;(define (next-missiles lom) lom) ;stub
(define (next-missiles lom)
  (clean-missiles (update-missiles lom)));

;; ListOfMissiles -> ListOfMissiles
;; generate next positions of the missiles
(define (update-missiles lom)
  (cond [(empty? lom) empty]
        [else
         (cons (next-missile (first lom))
               (next-missiles (rest lom)))]))

;; Missiles -> Missiles
(define (next-missile m)
  (make-missile (missile-x m) (- (missile-y m) MISSILE-SPEED)))

;; ListOfMissiles -> ListOfMissiles
;; move out screen missiles
(define (clean-missiles lom)
  (cond [(empty? lom) empty]
        [(< (missile-y (first lom)) 0) (clean-missiles (rest lom))]
        [else
         (cons (first lom) (clean-missiles (rest lom)))]))

;; Tank -> Tank
;; next position of the tanks
(check-expect (next-tank (make-tank 50 1)) (make-tank 52 1))
(check-expect (next-tank (make-tank WIDTH 1)) (make-tank WIDTH 1)) ;right most
(check-expect (next-tank (make-tank 0 -1)) (make-tank 0 -1)) ;left most

;(define (next-tank t) t) ;stub
(define (next-tank t)
  (cond [(> (+ (tank-x t) (* (tank-dir t) TANK-SPEED)) WIDTH)
         (make-tank WIDTH (tank-dir t))]
        [(< (+ (tank-x t) (* (tank-dir t) TANK-SPEED)) 0)
         (make-tank 0 (tank-dir t))]
        [else
         (make-tank (+ (tank-x t) (* (tank-dir t) TANK-SPEED)) (tank-dir t))]))

;; Game -> Game
;; filter those hitted invaders
(check-expect (check-hits (make-game empty empty T0 1))
              (make-game empty empty T0 1))
(check-expect (check-hits (make-game (list (make-invader 100 200 10))
                                     (list (make-missile 100 205))
                                     T0
                                     1))
              (make-game empty empty T0 1))
(check-expect (check-hits (make-game (list (make-invader 100 180 10))
                                     (list (make-missile 100 205))
                                     T0
                                     1))
              (make-game (list (make-invader 100 180 10))
                         (list (make-missile 100 205))
                         T0
                         1))
 
;(define (check-hits s) s) ;stub

(define (check-hits s)
  (make-game (filter-invaders (game-invaders s) (game-missiles s))
             (filter-missiles (game-missiles s) (game-invaders s))
             (game-tank s)
             (game-tick s)))

;; ListOfInvader ListOfMissile -> ListOfInvader
(check-expect (filter-invaders empty empty) empty)
(check-expect (filter-invaders (list (make-invader 10 10 10)) empty) (list (make-invader 10 10 10)))
(check-expect (filter-invaders (list (make-invader 10 5 10))
                               (list (make-missile 10 10)))
              empty)

(define (filter-invaders loi lom)
  (cond [(empty? loi) empty]
        [(= (length lom) (length (hitted (first loi) lom)))
         (cons (first loi) (filter-invaders (rest loi) lom))]
        [else
         (filter-invaders (rest loi) (hitted (first loi) lom))]))

;; Invader ListOfMissile -> ListOfMissile
(check-expect (hitted (make-invader 10 5 10) empty) empty)
(check-expect (hitted (make-invader 10 5 10)
                      (list (make-missile 10 10)))
              empty)
(check-expect (hitted (make-invader 10 5 10)
                      (list (make-missile 10 10) (make-missile 10 11)))
              (list (make-missile 10 11)))

(define (hitted i lom)
  (cond [(empty? lom) empty]
        [(and (= (invader-x i) (missile-x (first lom)))
              (<= (- (missile-y (first lom)) HIT-RANGE) (invader-y i)))
         (rest lom)]
        [else
         (cons (first lom)
               (hitted i (rest lom)))]))

;; ListOfMissile ListOfInvader -> ListOfMissile
(check-expect (filter-missiles empty empty) empty)
(check-expect (filter-missiles (list (make-missile 10 10)) empty) (list (make-missile 10 10)))
(check-expect (filter-missiles empty (list (make-invader 10 10 10))) empty)
(check-expect (filter-missiles (list (make-missile 10 10))
                               (list (make-invader 10 5 10)))
              empty)
(check-expect (filter-missiles (list (make-missile 10 20))
                               (list (make-invader 10 5 10)))
              (list (make-missile 10 20)))

;(define (filter-missiles lom loi) lom) ;stub
(define (filter-missiles lom loi)
  (cond [(empty? lom) empty]
        [(= (length loi) (length (hit (first lom) loi)))
         (cons (first lom) (filter-missiles (rest lom) loi))]
        [else
         (filter-missiles (rest lom) (hit (first lom) loi))]))

;; Missile ListOfInvader -> ListOfInvader

(define (hit m loi)
  (cond [(empty? loi) empty]
        [(and (= (missile-x m) (invader-x (first loi)))
              (<= (- (missile-y m) HIT-RANGE) (invader-y (first loi))))
         (rest loi)]
        [else
         (cons (first loi)
               (hit m (rest loi)))]))
  

;; Game -> Game
;; add new invader every 20 tick
(check-expect (new-invader (make-game empty empty T0 1))
              (make-game empty empty T0 1))
(check-random (new-invader (make-game empty empty T0 20))
              (make-game (list (make-invader (random WIDTH) 0 INVADER-X-SPEED))
                         empty
                         T0
                         20))

;(define (new-invader s) s) ;stub
(define (new-invader s)
  (if (= (modulo (game-tick s) 20) 0)
      (make-game (cons (make-invader (random WIDTH) 0 INVADER-X-SPEED)
                       (game-invaders s))
                 (game-missiles s)
                 (game-tank s)
                 (game-tick s))
      s))
  

;; Game -> Image
;; render the current game state
(check-expect (render (make-game empty empty T0 0)) (place-image TANK (/ WIDTH 2) (- HEIGHT TANK-HEIGHT/2) BACKGROUND))
(check-expect (render (make-game (list (make-invader 100 100 10))
                                 (list (make-missile 150 300))
                                 T0
                                 1))
              (render-invaders (list (make-invader 100 100 10))
                               (render-missiles (list (make-missile 150 300))
                                                (render-tank T0))))

;(define (render g) BACKGROUND) ;stub
(define (render g)
  (render-invaders (game-invaders g) (render-missiles (game-missiles g) (render-tank (game-tank g)))))

;; Tank -> Image
;(define (render-tank t) BACKGROUND) ;stub
(define (render-tank t)
  (place-image TANK (tank-x t) (- HEIGHT TANK-HEIGHT/2) BACKGROUND))

;; ListOfMissile Image -> Image
;(define (render-missiles lom img) img) ;stub
(define (render-missiles lom img)
  (cond [(empty? lom) img]
        [else
         (place-image MISSILE (missile-x (first lom)) (missile-y (first lom))
                      (render-missiles (rest lom) img))]))

;; ListOfInvader Image -> Image
;(define (render-invaders loi img) img) ;stub
(define (render-invaders loi img)
  (cond [(empty? loi) img]
        [else
         (place-image INVADER (invader-x (first loi)) (invader-y (first loi))
                      (render-invaders (rest loi) img))]))

;; Game KeyEvent -> Game
;; response to key event (left, right arrow and space)
(check-expect (response (make-game empty empty (make-tank 50 1) 1) " ")
              (make-game empty (list (make-missile 50 (- HEIGHT (image-height TANK)))) (make-tank 50 1) 1))
(check-expect (response (make-game empty empty (make-tank 50 1) 1) "left")
              (make-game empty empty (make-tank 50 -1) 1))
(check-expect (response (make-game empty empty (make-tank 50 -1) 1) "left")
              (make-game empty empty (make-tank 50 -1) 1))
(check-expect (response (make-game empty empty (make-tank 50 1) 1) "right")
              (make-game empty empty (make-tank 50 1) 1))
(check-expect (response (make-game empty empty (make-tank 50 -1) 1) "right")
              (make-game empty empty (make-tank 50 1) 1))

;(define (response g ke) g) ;stub
(define (response g ke)
  (cond [(key=? ke " ")
         (make-game (game-invaders g)
                    (cons (make-missile (tank-x (game-tank g)) (- HEIGHT (image-height TANK))) (game-missiles g))
                    (game-tank g)
                    (game-tick g))]
        [(key=? ke "left")
         (make-game (game-invaders g)
                    (game-missiles g)
                    (make-tank (tank-x (game-tank g)) -1)
                    (game-tick g))]
        [(key=? ke "right")
         (make-game (game-invaders g)
                    (game-missiles g)
                    (make-tank (tank-x (game-tank g)) 1)
                    (game-tick g))]
        [else g]))
                    

;; Game -> Boolean
;; stop the game when at least one invader landed
(check-expect (hasLanded (make-game empty empty T0 1)) false)
(check-expect (hasLanded (make-game (list (make-invader 100 100 10))
                              empty
                              T0
                              1)) false)
(check-expect (hasLanded (make-game (list (make-invader 100 (+ HEIGHT 1) 10))
                              empty
                              T0
                              1)) true)

;(define (hasLanded g) false) ;stub
(define (hasLanded g)
  (out-of-screen? (game-invaders g)))

;; ListOfInvader -> Boolean

(define (out-of-screen? loi)
  (cond [(empty? loi) false]
        [(> (invader-y (first loi)) HEIGHT) true]
        [else (out-of-screen? (rest loi))]))