import { createApp, onMounted, ref, watch } from "vue";
import { Dir, Room, RoomView } from "./Room.js";
import { GraphUI } from "./GraphUI.js";
var Connection;
(function (Connection) {
    Connection.regex = /^(\d+)([WNES])(\d+)([WNES]?)(['!]?)$/;
})(Connection || (Connection = {}));
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
createApp({
    setup: function () {
        var u = new URLSearchParams(location.search);
        var defaults = {
            godMode: true,
            allowMultipleInEdges: false,
            graph: "custom",
            code: "",
            drawDistance: 5
        };
        var godMode = ref(u.get("godMode") !== "false");
        var allowMultipleInEdges = ref(u.get("allowMultipleInEdges") === "true");
        var graph = ref(u.get("graph") || "mobius");
        var code = ref(u.get("code") || defaults.code);
        var rooms = ref([]);
        var invalidCodeFeedback = ref("");
        var drawDistance = ref(parseInt(u.get("drawDistance") || "", 10) || defaults.drawDistance);
        var numRandomRooms = ref(50);
        var ui;
        function statusText() {
            var notVisited = rooms.value.filter(function (r) { return !r.visited; }).map(function (r) { return r.id; });
            return notVisited.length === 0 ? "Congratulations! You found all the rooms!" : "".concat(notVisited.length, " rooms left to find: ").concat(notVisited.join(", "));
        }
        function reset2(numRooms, connections) {
            rooms.value = [];
            for (var i = 1; i <= numRooms; i++) {
                rooms.value.push(new Room(i, godMode.value));
            }
            for (var _i = 0, connections_1 = connections; _i < connections_1.length; _i++) {
                var c = connections_1[_i];
                var r = rooms.value[c.s - 1].connect({ dir: c.sDir, other: rooms.value[c.t - 1], otherDir: c.tDir, flipOrientation: c.flip, allowMultipleInEdges: allowMultipleInEdges.value });
                if (!r.success) {
                    throw r.error;
                }
            }
            ui.reset(new RoomView(rooms.value[0]));
            ui.render();
        }
        function parse(str) {
            var arr = str.toUpperCase().match(Connection.regex);
            if (arr === null) {
                throw "Cannot parse string ".concat(str, ".");
            }
            var s = parseInt(arr[1]) - 1;
            if (!(s in rooms.value))
                rooms.value[s] = new Room(s + 1, godMode.value);
            var t = parseInt(arr[3]) - 1;
            if (!(t in rooms.value))
                rooms.value[t] = new Room(t + 1, godMode.value);
            return {
                s: rooms.value[s],
                sDir: Dir.parse(arr[2]),
                t: rooms.value[t],
                tDir: Dir.parse(arr[4]),
                flip: arr[5] !== ""
            };
        }
        function execute(list) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var c = list_1[_i];
                var r = c.s.connect({ dir: c.sDir, other: c.t, otherDir: c.tDir, flipOrientation: c.flip, allowMultipleInEdges: allowMultipleInEdges.value });
                if (!r.success) {
                    throw r.error;
                }
            }
        }
        function resetWithCode(str) {
            rooms.value = [new Room(1, true)];
            var cList = str.split(/[,\s]+/).map(function (s) { return parse(s); });
            execute(cList);
            ui.reset(new RoomView(rooms.value[0]));
            if (godMode.value) {
                rooms.value.forEach(function (r) { return r.visited = true; });
            }
            ui.render();
        }
        function resetToMobiusStrip(width, height) {
            if (width === void 0) { width = 10; }
            if (height === void 0) { height = 3; }
            var connections = [];
            for (var y = 0; y < height; y++) {
                for (var x = 1; x <= width; x++) {
                    if (x < width)
                        connections.push({ sDir: Dir.E, s: y * width + x, t: y * width + (x % width + 1) });
                    if (y < height - 1)
                        connections.push({ sDir: Dir.S, s: y * width + x, t: ((y + 1) % height) * width + x });
                }
            }
            // Connect right edge flipped to left edge
            for (var y = 0; y < height; y++) {
                connections.push({ sDir: Dir.E, s: (y + 1) * width, t: (height - y - 1) * width + 1, flip: true });
            }
            reset2(width * height, connections);
        }
        function resetToKleinBottle(width, height) {
            if (width === void 0) { width = 4; }
            if (height === void 0) { height = 4; }
            var connections = [];
            for (var y = 0; y < height; y++) {
                for (var x = 1; x <= width; x++) {
                    if (x < width)
                        connections.push({ sDir: Dir.E, s: y * width + x, t: y * width + (x % width + 1) });
                    connections.push({ sDir: Dir.S, s: y * width + x, t: ((y + 1) % height) * width + x });
                }
            }
            // Connect right edge flipped to left edge
            for (var y = 0; y < height; y++) {
                connections.push({ sDir: Dir.E, s: (y + 1) * width, t: (height - y - 1) * width + 1, flip: true });
            }
            reset2(width * height, connections);
        }
        function resetToProjectivePlane(width, height) {
            if (width === void 0) { width = 4; }
            if (height === void 0) { height = 4; }
            var connections = [];
            for (var y = 0; y < height; y++) {
                for (var x = 1; x <= width; x++) {
                    if (x < width)
                        connections.push({ sDir: Dir.E, s: y * width + x, t: y * width + (x % width + 1) });
                    if (y < height - 1)
                        connections.push({ sDir: Dir.S, s: y * width + x, t: ((y + 1) % height) * width + x });
                }
            }
            // Connect right edge flipped to left edge
            for (var y = 0; y < height; y++) {
                connections.push({ sDir: Dir.E, s: (y + 1) * width, t: (height - y - 1) * width + 1, flip: true });
            }
            for (var x = 1; x <= width; x++) {
                connections.push({ sDir: Dir.N, s: x, t: (height - 1) * width + (width + 1 - x), flip: true });
            }
            reset2(width * height, connections);
        }
        function resetToWeirdGraph() {
            rooms.value = [];
            for (var i = 1; i <= 12; i++) {
                rooms.value.push(new Room(i, godMode.value));
            }
            for (var r = 0; r < rooms.value.length; r++) {
                var j = r + 1;
                for (var i = 0; i < 4; i++) {
                    rooms.value[r].connectByTransitionFunction({ dir: i, other: rooms.value[j++], allowMultipleInEdges: allowMultipleInEdges.value });
                }
            }
            ui.reset(new RoomView(rooms.value[0]));
            ui.render();
        }
        function resetToMobiusStrip2(size) {
            if (size === void 0) { size = 4; }
            var connections = [];
            for (var i = 1; i <= size - 1; i++) {
                connections.push({ sDir: Dir.E, s: i, t: i + 1 });
                connections.push({ sDir: Dir.E, s: i + size, t: i + size + 1 });
            }
            for (var i = 1; i <= size; i++) {
                connections.push({ sDir: Dir.S, s: i, t: i + size });
            }
            connections.push({ sDir: Dir.E, s: size, t: 1, tDir: Dir.N });
            connections.push({ sDir: Dir.E, s: 2 * size, t: size + 1, tDir: Dir.S });
            reset2(2 * size, connections);
        }
        function resetRandom() {
            rooms.value = [];
            for (var i = 1; i <= Math.max(2, Math.min(600, numRandomRooms.value)); i++) {
                var room = new Room(i, godMode.value);
                if (i >= Room.colors.length)
                    room.color = getRandomColor();
                rooms.value.push(room);
            }
            for (var r = 0; r < rooms.value.length; r++) {
                for (var i = 0; i < 4; i++) {
                    var other = rooms.value[Math.floor(Math.random() * rooms.value.length)];
                    while (other === rooms.value[r]) {
                        other = rooms.value[Math.floor(Math.random() * rooms.value.length)];
                    }
                    rooms.value[r].connectByTransitionFunction({ dir: i, other: other, allowMultipleInEdges: allowMultipleInEdges.value });
                }
            }
            ui.reset(new RoomView(rooms.value[0]));
            ui.render();
        }
        function resetCustom() {
            try {
                resetWithCode(code.value);
                document.querySelector("#customCode").setCustomValidity("");
                graph.value = "custom";
                return true;
            }
            catch (ex) {
                document.querySelector("#customCode").setCustomValidity(ex);
                invalidCodeFeedback.value = ex;
            }
            return false;
        }
        function setGraph() {
            var _a;
            if (graph.value === "custom")
                resetCustom();
            else {
                var code_1 = (_a = document.querySelector("#graphSelect option[value='".concat(graph.value, "']"))) === null || _a === void 0 ? void 0 : _a.getAttribute("data-code");
                if (code_1 != null) {
                    resetWithCode(code_1);
                }
                else {
                    switch (graph.value) {
                        case "B":
                            resetToWeirdGraph();
                            break;
                        case "mobius":
                            resetToMobiusStrip();
                            break;
                        case "klein":
                            resetToKleinBottle();
                            break;
                        case "projective":
                            resetToProjectivePlane();
                            break;
                        case "mobius2":
                            resetToMobiusStrip2();
                            break;
                        case "random":
                            resetRandom();
                            break;
                        case "custom":
                            resetCustom();
                            break;
                    }
                }
            }
            updateHistoryState();
        }
        function updateHistoryState(replace) {
            if (replace === void 0) { replace = true; }
            var state = {
                godMode: godMode.value,
                allowMultipleInEdges: allowMultipleInEdges.value,
                graph: graph.value,
                code: code.value,
                drawDistance: drawDistance.value
            };
            var params = new URLSearchParams(state);
            for (var key in state) {
                if (state[key] === defaults[key])
                    params.delete(key);
            }
            if (state.graph !== "custom")
                params.delete("code");
            var url = "?" + params.toString();
            if (replace)
                history.replaceState(state, "", url);
            else
                history.pushState(state, "", url);
        }
        function onCodeSubmit(e) {
            if (resetCustom()) {
                updateHistoryState(false);
            }
            document.querySelector("#codeForm").classList.add("was-validated");
            e.preventDefault();
        }
        watch(graph, function () {
            setGraph();
        });
        watch(code, function () {
            document.querySelector("#customCode").setCustomValidity("");
            document.querySelector("#codeForm").classList.remove("was-validated");
        });
        watch(drawDistance, function (value) {
            ui.setDrawDistance(value);
            ui.render();
            updateHistoryState();
        });
        watch(numRandomRooms, function () {
            resetRandom();
        });
        onMounted(function () {
            var mainCanvas = document.querySelector("#mainCanvas");
            var context = mainCanvas.getContext("2d");
            addEventListener("popstate", function (e) {
                var _a;
                var state = (_a = e.state) !== null && _a !== void 0 ? _a : defaults;
                godMode.value = state.godMode;
                allowMultipleInEdges.value = state.allowMultipleInEdges;
                graph.value = state.graph;
                code.value = state.code;
                setGraph();
            });
            if (code.value != "") {
                graph.value = "custom";
            }
            mainCanvas.width = mainCanvas.height = Math.min(document.querySelector("#app").clientWidth - 20, innerHeight - 200);
            ui = new GraphUI(context, drawDistance.value);
            setGraph();
        });
        return {
            godMode: godMode,
            allowMultipleInEdges: allowMultipleInEdges,
            graph: graph,
            code: code,
            rooms: rooms,
            invalidCodeFeedback: invalidCodeFeedback,
            drawDistance: drawDistance,
            numRandomRooms: numRandomRooms,
            statusText: statusText,
            onCodeSubmit: onCodeSubmit
        };
    }
}).mount("#app");
