import { Dir, Room, RoomView, Point, NUM_DIRS, rotateClockwise, rotateCounterclockwise, pt } from "./Room.js";
const moveMapping = { ArrowLeft: Dir.W, ArrowRight: Dir.E, ArrowUp: Dir.N, ArrowDown: Dir.S };
const turnMapping = {
    ArrowLeft: rotateCounterclockwise,
    ArrowRight: rotateClockwise
};
export class GraphUI {
    context;
    drawDistance;
    constructor(context, drawDistance = 1) {
        this.context = context;
        this.drawDistance = drawDistance;
        context.canvas.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                e.preventDefault();
                context.canvas.focus();
                let c = context.getTransform().inverse().transformPoint(pt(e.offsetX, e.offsetY));
                let p = this.toGameCoords(c);
                let pf = pt(Math.round(p.x), Math.round(p.y));
                let dir = Dir.fromPoint(pf);
                if (dir >= 0) {
                    this.movePlayer(dir);
                }
            }
        });
        document.addEventListener("keydown", e => {
            if (e.target === document.body || e.target === this.canvas) {
                if (!e.shiftKey && e.key in moveMapping) {
                    e.preventDefault();
                    let dir = moveMapping[e.key];
                    this.movePlayer(dir);
                }
                else if (e.shiftKey && e.key in turnMapping) {
                    e.preventDefault();
                    this.roomView.transform = this.roomView.transform.compose(turnMapping[e.key]);
                    this.render();
                }
            }
        });
        addEventListener("resize", () => {
            this.canvas.width = this.canvas.height = Math.min(document.querySelector("#app").clientWidth - 20, innerHeight - 200);
            this.updateTransform();
            this.render();
        });
        this.setDrawDistance(drawDistance);
    }
    get canvas() { return this.context.canvas; }
    roomView = new RoomView(new Room(1));
    roomOuterSize = 64;
    wallWidth = 3;
    roomInnerSize = this.roomOuterSize - this.wallWidth - 1;
    backgroundColor = "#f2eee6";
    roomColor = "#dbcdb8";
    roomOutlineColor = "#d0c0b0";
    unvisitedRoomColor = "#725429";
    unvisitedRoomOutlineColor = "#605020";
    unvisitedRoomTextColor = "#ccc";
    wallColor = "#333";
    playerImage = GraphUI.loadImage("/images/player.png");
    static loadImage(path) {
        let img = new Image;
        img.src = path;
        return img;
    }
    width() { return this.canvas.width; }
    height() { return this.canvas.height; }
    setDrawDistance(distance) {
        this.drawDistance = distance;
        this.updateTransform();
    }
    reset(roomView) {
        this.roomView = roomView;
        this.roomView.visited = true;
    }
    toClientCoords({ x, y }) {
        return pt(x * this.roomOuterSize, y * this.roomOuterSize);
    }
    toGameCoords({ x, y }) {
        return pt(x / this.roomOuterSize, y / this.roomOuterSize);
    }
    movePlayer(dir) {
        let neighbor = this.roomView.to(dir);
        if (neighbor != null) {
            this.roomView = neighbor;
            this.roomView.visited = true;
        }
        this.render();
    }
    createRenderGrid() {
        let cells = [];
        for (let y = -this.drawDistance; y <= this.drawDistance; y++) {
            cells[y] = [];
            for (let x = -this.drawDistance; x <= this.drawDistance; x++) {
                cells[y][x] = {};
            }
        }
        let agenda = [{ x: 0, y: 0, depth: 0, r: this.roomView, parent: null }];
        while (agenda.length > 0) {
            let { x, y, depth, r, parent } = agenda.shift();
            if (Math.abs(x) > this.drawDistance || Math.abs(y) > this.drawDistance || (parent != null && parent.roomView == null))
                continue;
            let cell = cells[y][x];
            if (cell.visitDepth == null) {
                cells[y][x] = { visitDepth: depth, roomView: r };
                // Add neighbors
                if (r.visited) {
                    for (let d = 0; d < NUM_DIRS; d++) {
                        let { x: x2, y: y2 } = Point.addDir({ x, y }, d);
                        let r2 = r.to(d);
                        if (r2 != null)
                            agenda.push({ x: x2, y: y2, depth: depth + 1, r: r2, parent: cells[y][x] });
                    }
                }
            }
            else if (depth === cell.visitDepth) {
                if (!r.equals(cells[y][x].roomView)) {
                    cells[y][x].roomView = RoomView.conflict; // Conflict
                }
            }
        }
        return cells;
    }
    render() {
        this.context.save();
        this.context.resetTransform();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
        let cells = this.createRenderGrid();
        for (let y = -this.drawDistance; y <= this.drawDistance; y++) {
            for (let x = -this.drawDistance; x <= this.drawDistance; x++) {
                cells[y][x].roomView?.draw(this, { x, y });
            }
        }
    }
    updateTransform() {
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.font = "24px Candara";
        this.context.resetTransform();
        this.context.translate(this.width() / 2, this.height() / 2);
        let numCells = 2 * this.drawDistance + 1;
        let scale = Math.min(this.width(), this.height()) / this.roomOuterSize / numCells;
        this.context.scale(scale, scale);
    }
}
