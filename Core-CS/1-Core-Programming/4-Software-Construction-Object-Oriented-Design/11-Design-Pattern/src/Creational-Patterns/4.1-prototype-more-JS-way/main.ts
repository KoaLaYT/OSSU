const baseWall = {
    print: () => '|'
};

const baseRoom = {
    roomNo: 0,
    sides: {},
    print: function() {
        let result = '';
        Object.keys(this.sides).forEach(side => {
            result += side + ': ' + this.sides[side].print() + '\n';
        });
        return result;
    }
};

const baseDoor = {
    roomFrom: undefined,
    roomTo: undefined,
    print: function() {
        return `Room${this.roomFrom.roomNo} <---> Room${this.roomTo.roomNo}`;
    }
};

const baseMaze = {
    rooms: new Map()
};

const factory = (wall, room, door, maze) => {
    return {
        prototypeWall: wall,
        prototypeRoom: room,
        prototypeDoor: door,
        prototypeMaze: maze,
        makeWall: () => Object.create(wall),
        makeRoom: num => {
            const newRoom = Object.create(room);
            newRoom.roomNo = num;
            return newRoom;
        },
        makeDoor: (r1, r2) => {
            const newDoor = Object.create(door);
            newDoor.roomFrom = r1;
            newDoor.roomTo = r2;
            return newDoor;
        },
        makeMaze: () => Object.create(maze)
    };
};

const mazeGame = factory => {
    const aMaze = factory.makeMaze();
    const r1 = factory.makeRoom(1);
    const r2 = factory.makeRoom(2);

    const d = factory.makeDoor(r1, r2);

    r1.sides.north = d;
    r1.sides.south = factory.makeWall();
    r1.sides.west = factory.makeWall();
    r1.sides.east = factory.makeWall();

    r2.sides.north = factory.makeWall();
    r2.sides.south = d;
    r2.sides.west = factory.makeWall();
    r2.sides.east = factory.makeWall();

    aMaze.rooms.set(r1.roomNo, r1);
    aMaze.rooms.set(r2.roomNo, r2);

    return {
        maze: aMaze,
        showConstruct: function() {
            for (const key of this.maze.rooms.keys()) {
                const room = this.maze.rooms.get(key);
                console.log(room.print());
            }
        }
    };
};

/**
 * base usage
 */
// const baseFactory = factory(baseWall, baseRoom, baseDoor, baseMaze);
// const game = mazeGame(baseFactory);

/**
 * extend usage
 */
const thickWall = Object.create(baseWall);
thickWall.print = () => '|||';

const thickWallMazeFactory = factory(thickWall, baseRoom, baseDoor, baseMaze);
const game = mazeGame(thickWallMazeFactory);

game.showConstruct();
