export var Dir;
(function (Dir) {
    Dir[Dir["Invalid"] = -1] = "Invalid";
    Dir[Dir["W"] = 0] = "W";
    Dir[Dir["N"] = 1] = "N";
    Dir[Dir["E"] = 2] = "E";
    Dir[Dir["S"] = 3] = "S";
})(Dir || (Dir = {}));
export const NUM_DIRS = 4;
(function (Dir) {
    function flip(dir) { return (dir + 2) % 4; }
    Dir.flip = flip;
    function rotateClockwise(dir) { return (dir + 1) % 4; }
    Dir.rotateClockwise = rotateClockwise;
    function rotateCounterclockwise(dir) { return (dir + 3) % 4; }
    Dir.rotateCounterclockwise = rotateCounterclockwise;
    function toPoint(dir) {
        switch (dir) {
            case Dir.W:
                return pt(-1, 0);
            case Dir.N:
                return pt(0, -1);
            case Dir.E:
                return pt(1, 0);
            case Dir.S:
                return pt(0, 1);
            default:
                return pt(0, 0);
        }
    }
    Dir.toPoint = toPoint;
    function fromPoint({ x, y }) {
        if (y === 0) {
            if (x === 0)
                return Dir.Invalid;
            return x < 0 ? Dir.W : Dir.E;
        }
        else if (x === 0) {
            return y < 0 ? Dir.N : Dir.S;
        }
        return Dir.Invalid;
    }
    Dir.fromPoint = fromPoint;
    function parse(str) {
        return Dir[str];
    }
    Dir.parse = parse;
})(Dir || (Dir = {}));
export class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static equals(left, right) { return left.x === right.x && left.y === right.y; }
    ;
    static add({ x: x1, y: y1 }, { x: x2, y: y2 }) { return pt(x1 + x2, y1 + y2); }
    static addDir(p, dir) { return this.add(p, Dir.toPoint(dir)); }
    static scale({ x, y }, f) { return pt(x * f, y * f); }
    static str({ x, y }) { return `(${x}, ${y})`; }
}
export function pt(x, y) { return new Point(x, y); }
export class Permutation {
    map;
    /**
     * 0: where W goes, 1: where N goes, 2: where E goes, 3: where S goes.
     * Default is the identity.
     */
    constructor(map = [Dir.W, Dir.N, Dir.E, Dir.S]) {
        this.map = map;
    }
    apply(dir) { return this.map[dir]; }
    compose(right) {
        return new Permutation([this.map[right.map[0]], this.map[right.map[1]], this.map[right.map[2]], this.map[right.map[3]]]);
    }
    inverse() {
        let map = [];
        for (let i = 0; i < NUM_DIRS; i++) {
            map[this.map[i]] = i;
        }
        return new Permutation(map);
    }
    equals(other) {
        return this.map.every((v, i) => other.map[i] === v);
    }
    toMatrix() {
        let { x: a, y: b } = Dir.toPoint(this.apply(Dir.E));
        let { x: c, y: d } = Dir.toPoint(this.apply(Dir.S));
        return { a, b, c, d };
    }
}
const identity = new Permutation();
// const flipHorizontal = new Permutation([Dir.E, Dir.N, Dir.W, Dir.S]);
// const flipVertical = new Permutation([Dir.W, Dir.S, Dir.E, Dir.N]);
export const rotateClockwise = new Permutation([Dir.N, Dir.E, Dir.S, Dir.W]);
export const rotateCounterclockwise = new Permutation([Dir.S, Dir.W, Dir.N, Dir.E]);
// const rotate180 = new Permutation([Dir.E, Dir.S, Dir.W, Dir.N]);
export class Room {
    id;
    visited;
    static colors = [
        "black", "blue", "green", "red", "#7f00ff", "maroon", "turquoise", "black", "gray",
        "gold", "purple", "pink", "orange", "brown", "yellow", "navy", "lime",
    ];
    constructor(id, visited = false) {
        this.id = id;
        this.visited = visited;
        this.color = id >= Room.colors.length ? "black" : Room.colors[id];
    }
    /** E, N, W, S in that order */
    neighbors = [];
    transitionFunctions = [new Permutation(), new Permutation(), new Permutation(), new Permutation()];
    color;
    to(dir) {
        return this.neighbors[dir];
    }
    degree() {
        return this.neighbors.filter(x => x != null).length;
    }
    connect({ dir, other, otherDir = Dir.flip(dir), flipOrientation = false, allowMultipleInEdges = false }) {
        // Compute the transition function
        let map = [];
        for (let d = 0; d < NUM_DIRS; d++) {
            map[d] = ((flipOrientation ? -1 : 1) * (d - dir) + Dir.flip(otherDir) + NUM_DIRS) % NUM_DIRS;
        }
        return this.connectByTransitionFunction({ dir, other, transitionFunction: new Permutation(map), allowMultipleInEdges });
    }
    connectByTransitionFunction({ dir, other, transitionFunction = identity, allowMultipleInEdges = false }) {
        let targetDir = Dir.flip(transitionFunction.apply(dir));
        if (other == null) {
            return { success: false, error: `Cannot connect ${this} to null.` };
        }
        let errorPrefix = `Can't connect ${this.id} to ${other.id}`;
        if (this.neighbors[dir] != null && !allowMultipleInEdges) {
            return { success: false, error: `${errorPrefix}; ${Dir[dir]} edge out of ${this} is already taken.` };
        }
        if (other.neighbors[targetDir] != null) {
            if (!allowMultipleInEdges)
                return { success: false, error: `${errorPrefix}; ${Dir[targetDir]} edge into ${other} is already taken.` };
            console.log(`Warning: ${Dir[targetDir]} edge into ${other} is already taken.`);
        }
        else {
            other.neighbors[targetDir] = this;
            other.transitionFunctions[targetDir] = transitionFunction.inverse();
        }
        this.neighbors[dir] = other;
        this.transitionFunctions[dir] = transitionFunction;
        return { success: true, error: "" };
    }
    toString() {
        return this.id.toString();
    }
}
/** Represents a room with a transformation. */
export class RoomView {
    room;
    transform;
    constructor(room, transform = new Permutation()) {
        this.room = room;
        this.transform = transform;
    }
    get id() { return this.room.id; }
    get color() { return this.room.color; }
    get visited() { return this.room.visited; }
    set visited(value) { this.room.visited = value; }
    static conflict = new RoomView(new Room(-1, true));
    to(dir) {
        let actual = this.transform.apply(dir);
        let newRoom = this.room.to(actual);
        if (newRoom == null)
            return null;
        let transition = this.room.transitionFunctions[actual];
        return new RoomView(newRoom, transition.compose(this.transform));
    }
    equals(other) {
        return other != null && this.room === other.room && this.transform.equals(other.transform);
    }
    drawWall(ui, { x, y }, dir) {
        let ctx = ui.context;
        let c = ui.toClientCoords({ x, y });
        let p0 = Point.add(c, Point.scale(Dir.toPoint(dir), ui.roomInnerSize / 2));
        let p1 = Point.add(p0, Point.scale(Dir.toPoint(Dir.rotateClockwise(dir)), ui.roomInnerSize / 2));
        let p2 = Point.add(p0, Point.scale(Dir.toPoint(Dir.rotateCounterclockwise(dir)), ui.roomInnerSize / 2));
        ctx.strokeStyle = ui.wallColor;
        ctx.lineWidth = ui.wallWidth;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
    draw(ui, { x, y }) {
        let c = ui.toClientCoords({ x, y });
        let ctx = ui.context;
        let text = this.visited ? this.id.toString() : "?";
        let color = this.visited ? this.color : ui.unvisitedRoomTextColor;
        ctx.fillStyle = this.visited ? ui.roomColor : ui.unvisitedRoomColor;
        ctx.strokeStyle = this.visited ? ui.roomOutlineColor : ui.unvisitedRoomOutlineColor;
        if (this.id == -1) {
            // Means conflict, just draw something basic.
            ctx.fillStyle = "#ebddc8";
            ctx.lineWidth = 1;
            ctx.fillRect(c.x - (ui.roomInnerSize + ui.wallWidth + 2) / 2, c.y - (ui.roomInnerSize + ui.wallWidth + 2) / 2, (ui.roomInnerSize + ui.wallWidth + 2), (ui.roomInnerSize + ui.wallWidth + 2));
            ctx.strokeRect(c.x - (ui.roomInnerSize + ui.wallWidth + 2) / 2, c.y - (ui.roomInnerSize + ui.wallWidth + 2) / 2, (ui.roomInnerSize + ui.wallWidth + 2), (ui.roomInnerSize + ui.wallWidth + 2));
            ctx.fillStyle = "white";
            ctx.lineWidth = 1;
            ctx.fillText("!", c.x, c.y);
            ctx.restore();
        }
        else {
            ctx.save();
            // Rotate the room unless it's a question mark.
            if (this.visited) {
                let mat = this.transform.inverse().toMatrix();
                ctx.translate(c.x, c.y);
                ctx.transform(mat.a, mat.b, mat.c, mat.d, 0, 0);
                ctx.translate(-c.x, -c.y);
            }
            ctx.lineWidth = 1;
            ctx.fillRect(c.x - (ui.roomInnerSize + ui.wallWidth + 2) / 2, c.y - (ui.roomInnerSize + ui.wallWidth + 2) / 2, (ui.roomInnerSize + ui.wallWidth + 2), (ui.roomInnerSize + ui.wallWidth + 2));
            ctx.strokeRect(c.x - (ui.roomInnerSize + ui.wallWidth + 2) / 2, c.y - (ui.roomInnerSize + ui.wallWidth + 2) / 2, (ui.roomInnerSize + ui.wallWidth + 2), (ui.roomInnerSize + ui.wallWidth + 2));
            ctx.fillStyle = color;
            ctx.fillText(text, c.x, c.y);
            ctx.restore();
            // Draw edges
            for (let d = 0; d < 4; d++) {
                if (this.to(d) == null) {
                    this.drawWall(ui, { x, y }, d);
                }
            }
            // Draw player, transformed relative to this.
            if (ui.roomView.room === this.room) {
                ctx.save();
                let mat = this.transform.inverse().compose(ui.roomView.transform).toMatrix();
                ctx.translate(c.x, c.y);
                ctx.transform(mat.a, mat.b, mat.c, mat.d, 0, 0);
                ctx.translate(-c.x, -c.y);
                ctx.drawImage(ui.playerImage, c.x - ui.roomInnerSize / 4, c.y - ui.roomInnerSize / 4);
                ctx.restore();
            }
        }
    }
}
