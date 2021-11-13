import { Door } from '../model/door';
import { Wall } from '../model/wall';
import { MazeBuilder } from './maze-builder.abstract';
import { Maze } from '../model/maze';
import { Room, Direction } from '../model/room';

export class StandardMazeBuilder extends MazeBuilder {
    buildMaze() {
        this.maze = new Maze();
    }

    buildRoom(num: number) {
        if (!this.maze.roomNo(num)) {
            const room = new Room(num);

            room.setSide(Direction.NORTH, new Wall());
            room.setSide(Direction.SOUTH, new Wall());
            room.setSide(Direction.EAST, new Wall());
            room.setSide(Direction.WEST, new Wall());

            this.maze.addRoom(room);
        }
    }

    buildDoor(roomFrom: number, roomTo: number) {
        const r1 = this.maze.roomNo(roomFrom);
        const r2 = this.maze.roomNo(roomTo);

        const door = new Door(r1, r2);

        const dir1 = this.getWallDirection(r1);
        const dir2 = this.getWallDirection(r2);

        if (dir1 && dir2) {
            r1.setSide(dir1, door);
            r2.setSide(dir2, door);
        } else {
            throw new Error(
                `Room No${roomFrom} and Room No${roomTo} can't be related by a door`
            );
        }
    }

    // return a direction which has a wall
    // or false if the given room has no wall
    private getWallDirection(room: Room): Direction | false {
        for (const dir of Object.keys(Direction)) {
            const direction = Direction[dir];
            if (room.getSide(direction) instanceof Wall) {
                return direction;
            }
        }
        return false;
    }
}
