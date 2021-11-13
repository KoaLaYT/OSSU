const expect = chai.expect;

describe('updateGameState', function() {
    it('should update the current game state', function() {
        // Arrange
        const oldGame = new Game([], [], new Tank(50, 1));
        Math.random = () => 0.001;
        // Act
        const newGame = updateGameState(oldGame);
        // Assert
        expect(newGame).to.deep.equal({
            invaders: [new Invader(0.3, 0, -1)],
            missiles: [],
            tank: new Tank(52, 1)
        });
    });
});

describe('updatePosition', function() {
    it('should return empty array for empty invaders and missiles', function() {
        // Arrange
        const oldGame = new Game([], [], new Tank(50, 1));
        // Act
        const newGame = updatePosition(oldGame);
        // Assert
        expect(newGame).to.deep.equal({
            invaders: [],
            missiles: [],
            tank: new Tank(52, 1)
        });
    });
    it('should update all invaders to next position', function() {
        // Arrange
        const oldGame = new Game(
            [
                new Invader(200, 300, 1),
                new Invader(canvas.width, 300, 1),
                new Invader(0, 200, -1)
            ],
            [],
            new Tank(50, 1)
        );
        // Act
        const newGame = updatePosition(oldGame);
        // Assert
        expect(newGame).to.deep.equal({
            invaders: [
                new Invader(201.5, 301.5, 1),
                new Invader(canvas.width - 1.5, 301.5, -1),
                new Invader(1.5, 201.5, 1)
            ],
            missiles: [],
            tank: new Tank(52, 1)
        });
    });
    it('should update all missiles to next position', function() {
        // Arrange
        const oldGame = new Game(
            [],
            [new Missile(100, 200), new Missile(200, 100)],
            new Tank(10, -1)
        );
        // Act
        const newGame = updatePosition(oldGame);
        // Assert
        expect(newGame).to.deep.equal({
            invaders: [],
            missiles: [new Missile(100, 190), new Missile(200, 90)],
            tank: new Tank(8, -1)
        });
    });
});

describe('checkNewInvader', function() {
    it('should add new invader when Math.random <= 0.01', function() {
        // Arrange
        const oldInvaders = [new Invader(100, 200, 1)];
        Math.random = () => 0.005;
        // Act
        const newInvaders = checkNewInvader(oldInvaders);
        // Assert
        expect(newInvaders).to.deep.equal([
            new Invader(100, 200, 1),
            new Invader(1.5, 0, -1)
        ]);
    });
    it('should not add new invader when Math.random > 0.01', function() {
        // Arrange
        const oldInvaders = [new Invader(100, 200, 1)];
        Math.random = () => 0.6;
        // Act
        const newInvaders = checkNewInvader(oldInvaders);
        // Assert
        expect(newInvaders).to.deep.equal(oldInvaders);
    });
});

describe('checkOutOfScreen', function() {
    it('should delete all those missiles that are out of screen', function() {
        // Arrange
        const oldMissiles = [
            new Missile(100, -100),
            new Missile(50, 2),
            new Missile(150, -1)
        ];
        // Act
        const newMissiles = checkOutOfScreen(oldMissiles);
        // Assert
        expect(newMissiles).to.deep.equal([new Missile(50, 2)]);
    });
});

describe('checkShooted', function() {
    it('should delete those collapsed missile and invader', function() {
        // Arrange
        const oldInvadersAndMissiles = [
            [new Invader(100, 100, 1), new Invader(200, 200, -1)],
            [new Missile(100, 90), new Missile(10, 200)]
        ];
        // Act
        const newInvadersAndMissiles = checkShooted(oldInvadersAndMissiles);
        // Assert
        console.log(newInvadersAndMissiles);
        expect(newInvadersAndMissiles).to.deep.equal([
            [new Invader(200, 200, -1)],
            [new Missile(10, 200)]
        ]);
    });
});
