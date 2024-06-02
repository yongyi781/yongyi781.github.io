export var Dir;
(function (Dir) {
    Dir[Dir["Invalid"] = -1] = "Invalid";
    Dir[Dir["W"] = 0] = "W";
    Dir[Dir["N"] = 1] = "N";
    Dir[Dir["E"] = 2] = "E";
    Dir[Dir["S"] = 3] = "S";
})(Dir || (Dir = {}));
export var NUM_DIRS = 4;
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
    function fromPoint(_a) {
        var x = _a.x, y = _a.y;
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
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.equals = function (left, right) { return left.x === right.x && left.y === right.y; };
    ;
    Point.add = function (_a, _b) {
        var x1 = _a.x, y1 = _a.y;
        var x2 = _b.x, y2 = _b.y;
        return pt(x1 + x2, y1 + y2);
    };
    Point.addDir = function (p, dir) { return this.add(p, Dir.toPoint(dir)); };
    Point.scale = function (_a, f) {
        var x = _a.x, y = _a.y;
        return pt(x * f, y * f);
    };
    Point.str = function (_a) {
        var x = _a.x, y = _a.y;
        return "(".concat(x, ", ").concat(y, ")");
    };
    return Point;
}());
export { Point };
export function pt(x, y) { return new Point(x, y); }
var Permutation = /** @class */ (function () {
    /**
     * 0: where W goes, 1: where N goes, 2: where E goes, 3: where S goes.
     * Default is the identity.
     */
    function Permutation(map) {
        if (map === void 0) { map = [Dir.W, Dir.N, Dir.E, Dir.S]; }
        this.map = map;
    }
    Permutation.prototype.apply = function (dir) { return this.map[dir]; };
    Permutation.prototype.compose = function (right) {
        return new Permutation([this.map[right.map[0]], this.map[right.map[1]], this.map[right.map[2]], this.map[right.map[3]]]);
    };
    Permutation.prototype.inverse = function () {
        var map = [];
        for (var i = 0; i < NUM_DIRS; i++) {
            map[this.map[i]] = i;
        }
        return new Permutation(map);
    };
    Permutation.prototype.equals = function (other) {
        return this.map.every(function (v, i) { return other.map[i] === v; });
    };
    Permutation.prototype.toMatrix = function () {
        var _a = Dir.toPoint(this.apply(Dir.E)), a = _a.x, b = _a.y;
        var _b = Dir.toPoint(this.apply(Dir.S)), c = _b.x, d = _b.y;
        return { a: a, b: b, c: c, d: d };
    };
    return Permutation;
}());
export { Permutation };
var identity = new Permutation();
// const flipHorizontal = new Permutation([Dir.E, Dir.N, Dir.W, Dir.S]);
// const flipVertical = new Permutation([Dir.W, Dir.S, Dir.E, Dir.N]);
export var rotateClockwise = new Permutation([Dir.N, Dir.E, Dir.S, Dir.W]);
export var rotateCounterclockwise = new Permutation([Dir.S, Dir.W, Dir.N, Dir.E]);
// const rotate180 = new Permutation([Dir.E, Dir.S, Dir.W, Dir.N]);
var Room = /** @class */ (function () {
    function Room(id, visited) {
        if (visited === void 0) { visited = false; }
        this.id = id;
        this.visited = visited;
        /** E, N, W, S in that order */
        this.neighbors = [];
        this.transitionFunctions = [new Permutation(), new Permutation(), new Permutation(), new Permutation()];
        this.color = id >= Room.colors.length ? "black" : Room.colors[id];
    }
    Room.prototype.to = function (dir) {
        return this.neighbors[dir];
    };
    Room.prototype.degree = function () {
        return this.neighbors.filter(function (x) { return x != null; }).length;
    };
    Room.prototype.connect = function (_a) {
        var dir = _a.dir, other = _a.other, _b = _a.otherDir, otherDir = _b === void 0 ? Dir.flip(dir) : _b, _c = _a.flipOrientation, flipOrientation = _c === void 0 ? false : _c, _d = _a.allowMultipleInEdges, allowMultipleInEdges = _d === void 0 ? false : _d;
        // Compute the transition function
        var map = [];
        for (var d = 0; d < NUM_DIRS; d++) {
            map[d] = ((flipOrientation ? -1 : 1) * (d - dir) + Dir.flip(otherDir) + NUM_DIRS) % NUM_DIRS;
        }
        return this.connectByTransitionFunction({ dir: dir, other: other, transitionFunction: new Permutation(map), allowMultipleInEdges: allowMultipleInEdges });
    };
    Room.prototype.connectByTransitionFunction = function (_a) {
        var dir = _a.dir, other = _a.other, _b = _a.transitionFunction, transitionFunction = _b === void 0 ? identity : _b, _c = _a.allowMultipleInEdges, allowMultipleInEdges = _c === void 0 ? false : _c;
        var targetDir = Dir.flip(transitionFunction.apply(dir));
        if (other == null) {
            return { success: false, error: "Cannot connect ".concat(this, " to null.") };
        }
        var errorPrefix = "Can't connect ".concat(this.id, " to ").concat(other.id);
        if (this.neighbors[dir] != null && !allowMultipleInEdges) {
            return { success: false, error: "".concat(errorPrefix, "; ").concat(Dir[dir], " edge out of ").concat(this, " is already taken.") };
        }
        if (other.neighbors[targetDir] != null) {
            if (!allowMultipleInEdges)
                return { success: false, error: "".concat(errorPrefix, "; ").concat(Dir[targetDir], " edge into ").concat(other, " is already taken.") };
            console.log("Warning: ".concat(Dir[targetDir], " edge into ").concat(other, " is already taken."));
        }
        else {
            other.neighbors[targetDir] = this;
            other.transitionFunctions[targetDir] = transitionFunction.inverse();
        }
        this.neighbors[dir] = other;
        this.transitionFunctions[dir] = transitionFunction;
        return { success: true, error: "" };
    };
    Room.prototype.toString = function () {
        return this.id.toString();
    };
    Room.colors = [
        "black", "blue", "green", "red", "#7f00ff", "maroon", "turquoise", "black", "gray",
        "gold", "purple", "pink", "orange", "brown", "yellow", "navy", "lime",
    ];
    return Room;
}());
export { Room };
/** Represents a room with a transformation. */
var RoomView = /** @class */ (function () {
    function RoomView(room, transform) {
        if (transform === void 0) { transform = new Permutation(); }
        this.room = room;
        this.transform = transform;
    }
    Object.defineProperty(RoomView.prototype, "id", {
        get: function () { return this.room.id; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RoomView.prototype, "color", {
        get: function () { return this.room.color; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RoomView.prototype, "visited", {
        get: function () { return this.room.visited; },
        set: function (value) { this.room.visited = value; },
        enumerable: false,
        configurable: true
    });
    RoomView.prototype.to = function (dir) {
        var actual = this.transform.apply(dir);
        var newRoom = this.room.to(actual);
        if (newRoom == null)
            return null;
        var transition = this.room.transitionFunctions[actual];
        return new RoomView(newRoom, transition.compose(this.transform));
    };
    RoomView.prototype.equals = function (other) {
        return other != null && this.room === other.room && this.transform.equals(other.transform);
    };
    RoomView.prototype.drawWall = function (ui, _a, dir) {
        var x = _a.x, y = _a.y;
        var ctx = ui.context;
        var c = ui.toClientCoords({ x: x, y: y });
        var p0 = Point.add(c, Point.scale(Dir.toPoint(dir), ui.roomInnerSize / 2));
        var p1 = Point.add(p0, Point.scale(Dir.toPoint(Dir.rotateClockwise(dir)), ui.roomInnerSize / 2));
        var p2 = Point.add(p0, Point.scale(Dir.toPoint(Dir.rotateCounterclockwise(dir)), ui.roomInnerSize / 2));
        ctx.strokeStyle = ui.wallColor;
        ctx.lineWidth = ui.wallWidth;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    };
    RoomView.prototype.draw = function (ui, _a) {
        var x = _a.x, y = _a.y;
        var c = ui.toClientCoords({ x: x, y: y });
        var ctx = ui.context;
        var text = this.visited ? this.id.toString() : "?";
        var color = this.visited ? this.color : ui.unvisitedRoomTextColor;
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
                var mat = this.transform.inverse().toMatrix();
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
            for (var d = 0; d < 4; d++) {
                if (this.to(d) == null) {
                    this.drawWall(ui, { x: x, y: y }, d);
                }
            }
            // Draw player, transformed relative to this.
            if (ui.roomView.room === this.room) {
                ctx.save();
                var mat = this.transform.inverse().compose(ui.roomView.transform).toMatrix();
                ctx.translate(c.x, c.y);
                ctx.transform(mat.a, mat.b, mat.c, mat.d, 0, 0);
                ctx.translate(-c.x, -c.y);
                ctx.drawImage(ui.playerImage, c.x - ui.roomInnerSize / 4, c.y - ui.roomInnerSize / 4);
                ctx.restore();
            }
        }
    };
    RoomView.conflict = new RoomView(new Room(-1, true));
    return RoomView;
}());
export { RoomView };
