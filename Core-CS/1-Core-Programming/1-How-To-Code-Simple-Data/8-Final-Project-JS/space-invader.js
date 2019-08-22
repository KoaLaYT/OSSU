// Invader shooting game

// =====================================
// Constants:
// ctx is our canvas context
const INVADER = (x, y) => {
    ellipse(x, y - 6, 10, 15, 'blue', 'stroke');
    ellipse(x, y, 15, 10, 'blue', 'fill');
};

const TANK = x => {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(x - 10, 487, 20, 5);
    ctx.fillRect(x - 2.5, 475, 5, 20);
    ellipse(x, 495, 15, 5, 'black', 'fill');
};

const MISSILE = (x, y) => {
    ellipse(x, y, 2, 10, 'red', 'fill');
};

const INVADER_X_SPEED = 1.5;
const INVADER_Y_SPEED = 1.5;
// for every frame, there is 1% changes a new invader will arrive
const INVADER_RATE = 0.01;

const TANK_SPEED = 2;

const MISSILE_SPEED = 10;
const MISSILE_X_RANGE = 17;
const MISSILE_Y_RANGE = 20;

// helper functions to render images
function ellipse(x, y, width, height, color, style) {
    ctx.save();
    if (style == 'fill') {
        ctx.fillStyle = color;
    } else {
        ctx.strokeStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(x, y - height);
    ctx.quadraticCurveTo(x + width, y - height, x + width, y);
    ctx.quadraticCurveTo(x + width, y + height, x, y + height);
    ctx.quadraticCurveTo(x - width, y + height, x - width, y);
    ctx.quadraticCurveTo(x - width, y - height, x, y - height);
    if (style == 'fill') {
        ctx.fill();
    } else {
        ctx.stroke();
    }
    ctx.restore();
}

// =====================================
// Data definitions:
class Invader {
    constructor(x, y, dir) {
        // x:   x coordinate
        // y:   y coordinate
        // dir: moving left(-1) or right(1)
        this.x = x;
        this.y = y;
        this.dir = dir;
    }

    move() {
        const x = this.x + INVADER_X_SPEED * this.dir;
        const y = this.y + INVADER_Y_SPEED;
        if (x < 0) {
            return new Invader(-x, y, -this.dir);
        } else if (x > canvas.width) {
            return new Invader(2 * canvas.width - x, y, -this.dir);
        } else {
            return new Invader(x, y, this.dir);
        }
    }

    draw() {
        INVADER(this.x, this.y);
    }
}

class Tank {
    constructor(x, dir) {
        this.x = x;
        this.dir = dir;
    }

    move() {
        const x = this.x + TANK_SPEED * this.dir;
        if (x < 0) {
            return new Tank(0, this.dir);
        } else if (x > canvas.width) {
            return new Tank(canvas.width, this.dir);
        } else {
            return new Tank(x, this.dir);
        }
    }

    draw() {
        TANK(this.x);
    }
}

class Missile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move() {
        const y = this.y - MISSILE_SPEED;
        return new Missile(this.x, y);
    }

    draw() {
        MISSILE(this.x, this.y);
    }
}

class Game {
    constructor(invaders, missiles, tank) {
        // invaders: Array<Invader>
        // missiles: Array<Missile>
        // tank: Tank
        this.invaders = invaders;
        this.missiles = missiles;
        this.tank = tank;
    }
}

// =====================================
// Functions:

// Game -> World
// start the world with main(new Game([],[],new Tank(150, 1)))
function main(g) {
    bigBang({
        worldState: g,
        onTick: {
            handler: updateGameState
        },
        toDraw: render,
        stopWhen: hasInvaderLanded,
        onKey: response
    });
}

// Game -> Game
// update the current game state
//   1. move all the invaders, missles and tank to next position
//   2. check if new invader will arrive
//   3. delete those out of screen missiles
//   4. check if any invader has been shooted
function updateGameState(g) {
    const { invaders, missiles, tank } = updatePosition(g);
    const [filteredInvaders, filteredMissiles] = checkShooted([
        checkNewInvader(invaders),
        checkOutOfScreen(missiles)
    ]);
    return new Game(filteredInvaders, filteredMissiles, tank);
}

// Game -> Game
// Step 1: move all the invaders, missles and tank to next position
function updatePosition(g) {
    const invaders = g.invaders.map(invader => invader.move());
    const missiles = g.missiles.map(missile => missile.move());
    const tank = g.tank.move();
    return new Game(invaders, missiles, tank);
}

// Array<Invader> -> Array<Invader>
// Step 2: check if new invader will arrive
function checkNewInvader(invaders) {
    if (Math.random() <= 0.01) {
        return [
            ...invaders,
            new Invader(
                Math.random() * canvas.width,
                0,
                Math.random() > 0.5 ? 1 : -1
            )
        ];
    } else {
        return invaders;
    }
}

// Array<Missile> -> Array<Missile>
// Step 3: delete those out of screen missiles
function checkOutOfScreen(missiles) {
    return missiles.filter(missile => missile.y >= 0);
}

// Array<Invader> Array<Missile> -> Array<Invader> Array<Missile>
// Step 4: check if any invader has been shooted
/* first version
function checkShooted([invaders = [], missiles = []] = []) {
    let leftInvaders = [...invaders];
    let leftMissiles = [...missiles];
    for (let i = 0; i < invaders.length; i++) {
        const invader = invaders[i];
        for (let j = 0; j < leftMissiles.length; j++) {
            const missile = leftMissiles[j];
            if (
                Math.abs(invader.x - missile.x) <= MISSILE_X_RANGE &&
                Math.abs(invader.y - missile.y) <= MISSILE_Y_RANGE
            ) {
                leftInvaders.splice(i, 1);
                leftMissiles.splice(j, 1);
                break;
            }
        }
    }
    return [leftInvaders, leftMissiles];
}*/
function checkShooted([invaders, missiles]) {
    if (invaders.length == 0 || missiles.length == 0) {
        return [invaders, missiles];
    } else {
        const [firstInvader, ...restInvaders] = invaders;
        const find = missiles.findIndex(
            missile =>
                Math.abs(firstInvader.x - missile.x) <= MISSILE_X_RANGE &&
                Math.abs(firstInvader.y - missile.y) <= MISSILE_Y_RANGE
        );
        if (find == -1) {
            const [leftInvaders, leftMissiles] = checkShooted([
                restInvaders,
                missiles
            ]);
            return [[firstInvader, ...leftInvaders], leftMissiles];
        } else {
            const leftMissiles = [...missiles];
            leftMissiles.splice(find, 1);
            return checkShooted([restInvaders, leftMissiles]);
        }
    }
}

// Game -> canvas
// render the current invaders, missiles and tank on the canvas
function render({ invaders = [], missiles = [], tank }) {
    invaders.forEach(invader => invader.draw());
    missiles.forEach(missile => missile.draw());
    tank.draw();
}

// Game -> Boolean
// stop the game when has any invader laned
function hasInvaderLanded({ invaders = [] }) {
    return invaders.some(invader => invader.y > canvas.height);
}

// Game Key -> Game
// response to <space> <left arrow> <right arrow>
function response(g, key) {
    switch (key) {
        case ' ':
            return new Game(
                g.invaders,
                [...g.missiles, new Missile(g.tank.x, canvas.height - 25)],
                g.tank
            );
        case 'ArrowLeft':
            return new Game(g.invaders, g.missiles, new Tank(g.tank.x, -1));
        case 'ArrowRight':
            return new Game(g.invaders, g.missiles, new Tank(g.tank.x, 1));
        default:
            return g;
    }
}
