import {
  Dir,
  Room,
  RoomView,
  Point,
  NUM_DIRS,
  rotateClockwise,
  rotateCounterclockwise,
  pt
} from "./Room.js"
var moveMapping = { ArrowLeft: Dir.W, ArrowRight: Dir.E, ArrowUp: Dir.N, ArrowDown: Dir.S }
var turnMapping = {
  ArrowLeft: rotateCounterclockwise,
  ArrowRight: rotateClockwise
}
var GraphUI = /** @class */ (function () {
  class GraphUI {
    constructor(context, drawDistance) {
      if (drawDistance === void 0) {
        drawDistance = 1
      }
      var _this = this
      this.context = context
      this.drawDistance = drawDistance
      this.roomView = new RoomView(new Room(1))
      this.roomOuterSize = 64
      this.wallWidth = 3
      this.roomInnerSize = this.roomOuterSize - this.wallWidth - 1
      this.backgroundColor = "#f2eee6"
      this.roomColor = "#dbcdb8"
      this.roomOutlineColor = "#d0c0b0"
      this.unvisitedRoomColor = "#725429"
      this.unvisitedRoomOutlineColor = "#605020"
      this.unvisitedRoomTextColor = "#ccc"
      this.wallColor = "#333"
      this.playerImage = GraphUI.loadImage("/images/player.png")
      context.canvas.addEventListener("mousedown", function (e) {
        if (e.button === 0) {
          e.preventDefault()
          context.canvas.focus()
          var c = context.getTransform().inverse().transformPoint(pt(e.offsetX, e.offsetY))
          var p = _this.toGameCoords(c)
          var pf = pt(Math.round(p.x), Math.round(p.y))
          var dir = Dir.fromPoint(pf)
          if (dir >= 0) {
            _this.movePlayer(dir)
          }
        }
      })
      document.addEventListener("keydown", function (e) {
        if (e.target === document.body || e.target === _this.canvas) {
          if (!e.shiftKey && e.key in moveMapping) {
            e.preventDefault()
            var dir = moveMapping[e.key]
            _this.movePlayer(dir)
          } else if (e.shiftKey && e.key in turnMapping) {
            e.preventDefault()
            _this.roomView.transform = _this.roomView.transform.compose(turnMapping[e.key])
            _this.render()
          }
        }
      })
      addEventListener("resize", function () {
        _this.canvas.width = _this.canvas.height = Math.min(
          document.querySelector("#app").clientWidth - 20,
          innerHeight - 200
        )
        _this.updateTransform()
        _this.render()
      })
      this.setDrawDistance(drawDistance)
    }
    static loadImage(path) {
      var img = new Image()
      img.src = path
      return img
    }
    width() {
      return this.canvas.width
    }
    height() {
      return this.canvas.height
    }
    setDrawDistance(distance) {
      this.drawDistance = distance
      this.updateTransform()
    }
    reset(roomView) {
      this.roomView = roomView
      this.roomView.visited = true
    }
    toClientCoords(_a) {
      var x = _a.x,
        y = _a.y
      return pt(x * this.roomOuterSize, y * this.roomOuterSize)
    }
    toGameCoords(_a) {
      var x = _a.x,
        y = _a.y
      return pt(x / this.roomOuterSize, y / this.roomOuterSize)
    }
    movePlayer(dir) {
      var neighbor = this.roomView.to(dir)
      if (neighbor != null) {
        this.roomView = neighbor
        this.roomView.visited = true
      }
      this.render()
    }
    createRenderGrid() {
      var cells = []
      for (var y = -this.drawDistance; y <= this.drawDistance; y++) {
        cells[y] = []
        for (var x = -this.drawDistance; x <= this.drawDistance; x++) {
          cells[y][x] = {}
        }
      }
      var agenda = [{ x: 0, y: 0, depth: 0, r: this.roomView, parent: null }]
      while (agenda.length > 0) {
        var _a = agenda.shift(),
          x = _a.x,
          y = _a.y,
          depth = _a.depth,
          r = _a.r,
          parent_1 = _a.parent
        if (
          Math.abs(x) > this.drawDistance ||
          Math.abs(y) > this.drawDistance ||
          (parent_1 != null && parent_1.roomView == null)
        )
          continue
        var cell = cells[y][x]
        if (cell.visitDepth == null) {
          cells[y][x] = { visitDepth: depth, roomView: r }
          // Add neighbors
          if (r.visited) {
            for (var d = 0; d < NUM_DIRS; d++) {
              var _b = Point.addDir({ x: x, y: y }, d),
                x2 = _b.x,
                y2 = _b.y
              var r2 = r.to(d)
              if (r2 != null) agenda.push({ x: x2, y: y2, depth: depth + 1, r: r2, parent: cells[y][x] })
            }
          }
        } else if (depth === cell.visitDepth) {
          if (!r.equals(cells[y][x].roomView)) {
            cells[y][x].roomView = RoomView.conflict // Conflict
          }
        }
      }
      return cells
    }
    render() {
      var _a
      this.context.save()
      this.context.resetTransform()
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.fillStyle = this.backgroundColor
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.restore()
      var cells = this.createRenderGrid()
      for (var y = -this.drawDistance; y <= this.drawDistance; y++) {
        for (var x = -this.drawDistance; x <= this.drawDistance; x++) {
          ;(_a = cells[y][x].roomView) === null || _a === void 0 ? void 0 : _a.draw(this, { x: x, y: y })
        }
      }
    }
    updateTransform() {
      this.context.textAlign = "center"
      this.context.textBaseline = "middle"
      this.context.font = "24px Candara"
      this.context.resetTransform()
      this.context.translate(this.width() / 2, this.height() / 2)
      var numCells = 2 * this.drawDistance + 1
      var scale = Math.min(this.width(), this.height()) / this.roomOuterSize / numCells
      this.context.scale(scale, scale)
    }
  }
  Object.defineProperty(GraphUI.prototype, "canvas", {
    get: function () {
      return this.context.canvas
    },
    enumerable: false,
    configurable: true
  })
  return GraphUI
})()
export { GraphUI }
