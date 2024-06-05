import { createApp, onMounted, ref, watch } from "vue";
import { Dir, Room, RoomView } from "./Room.js";
import { GraphUI } from "./GraphUI.js";

interface Connection { s: Room; sDir: Dir; t: Room; tDir?: Dir; flip?: boolean; }

namespace Connection {
    export var regex = /^(\d+)([WNES])(\d+)([WNES]?)(['!]?)$/;
}

interface MyConnection { s: number; sDir: Dir; t: number; tDir?: Dir; flip?: boolean; }

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

createApp({
    setup() {
        const u = new URLSearchParams(location.search);

        const defaults: Record<string, any> = {
            godMode: false,
            allowMultipleInEdges: false,
            graph: "custom",
            code: "",
            drawDistance: 5
        }

        const godMode = ref(u.get("godMode") === "true");
        const allowMultipleInEdges = ref(u.get("allowMultipleInEdges") === "true");
        const graph = ref(u.get("graph") || "mobius");
        const code = ref(u.get("code") || defaults.code as string);
        const rooms = ref<Room[]>([]);
        const invalidCodeFeedback = ref("");
        const drawDistance = ref(parseInt(u.get("drawDistance") || "", 10) || defaults.drawDistance as number);
        const numRandomRooms = ref(50);

        let ui: GraphUI;

        function statusText() {
            let notVisited = rooms.value.filter(r => !r.visited).map(r => r.id);
            return notVisited.length === 0 ? "Congratulations! You found all the rooms!" : `${notVisited.length} rooms left to find: ${notVisited.join(", ")}`;
        }

        function reset2(numRooms: number, connections: MyConnection[]) {
            rooms.value = [];
            for (let i = 1; i <= numRooms; i++) {
                rooms.value.push(new Room(i, godMode.value));
            }
            for (let c of connections) {
                let r = rooms.value[c.s - 1].connect({ dir: c.sDir, other: rooms.value[c.t - 1], otherDir: c.tDir, flipOrientation: c.flip, allowMultipleInEdges: allowMultipleInEdges.value });
                if (!r.success) {
                    throw r.error;
                }
            }
            ui.reset(new RoomView(rooms.value[0]));
            ui.render();
        }

        function parse(str: string): Connection {
            let arr = str.toUpperCase().match(Connection.regex);
            if (arr === null) {
                throw `Cannot parse string ${str}.`;
            }
            let s = parseInt(arr[1]) - 1;
            if (!(s in rooms.value))
                rooms.value[s] = new Room(s + 1, godMode.value);
            let t = parseInt(arr[3]) - 1;
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

        function execute(list: Connection[]) {
            for (let c of list) {
                let r = c.s.connect({ dir: c.sDir, other: c.t, otherDir: c.tDir, flipOrientation: c.flip, allowMultipleInEdges: allowMultipleInEdges.value });
                if (!r.success) {
                    throw r.error;
                }
            }
        }
        function resetWithCode(str: string) {
            rooms.value = [new Room(1, true)];
            let cList = str.split(/[,\s]+/).map(s => parse(s));
            execute(cList);
            ui.reset(new RoomView(rooms.value[0]));
            if (godMode.value) {
                rooms.value.forEach(r => r.visited = true);
            }
            ui.render();
        }

        function resetToMobiusStrip(width = 10, height = 3) {
            let connections: MyConnection[] = [];
            for (let y = 0; y < height; y++) {
                for (let x = 1; x <= width; x++) {
                    if (x < width)
                        connections.push({ sDir: Dir.E, s: y * width + x, t: y * width + (x % width + 1) });
                    if (y < height - 1)
                        connections.push({ sDir: Dir.S, s: y * width + x, t: ((y + 1) % height) * width + x });
                }
            }
            // Connect right edge flipped to left edge
            for (let y = 0; y < height; y++) {
                connections.push({ sDir: Dir.E, s: (y + 1) * width, t: (height - y - 1) * width + 1, flip: true });
            }
            reset2(width * height, connections);
        }

        function resetToKleinBottle(width = 4, height = 4) {
            let connections: MyConnection[] = [];
            for (let y = 0; y < height; y++) {
                for (let x = 1; x <= width; x++) {
                    if (x < width)
                        connections.push({ sDir: Dir.E, s: y * width + x, t: y * width + (x % width + 1) });
                    connections.push({ sDir: Dir.S, s: y * width + x, t: ((y + 1) % height) * width + x });
                }
            }
            // Connect right edge flipped to left edge
            for (let y = 0; y < height; y++) {
                connections.push({ sDir: Dir.E, s: (y + 1) * width, t: (height - y - 1) * width + 1, flip: true });
            }
            reset2(width * height, connections);
        }

        function resetToProjectivePlane(width = 4, height = 4) {
            let connections: MyConnection[] = [];
            for (let y = 0; y < height; y++) {
                for (let x = 1; x <= width; x++) {
                    if (x < width)
                        connections.push({ sDir: Dir.E, s: y * width + x, t: y * width + (x % width + 1) });
                    if (y < height - 1)
                        connections.push({ sDir: Dir.S, s: y * width + x, t: ((y + 1) % height) * width + x });
                }
            }
            // Connect right edge flipped to left edge
            for (let y = 0; y < height; y++) {
                connections.push({ sDir: Dir.E, s: (y + 1) * width, t: (height - y - 1) * width + 1, flip: true });
            }
            for (let x = 1; x <= width; x++) {
                connections.push({ sDir: Dir.N, s: x, t: (height - 1) * width + (width + 1 - x), flip: true });
            }
            reset2(width * height, connections);
        }

        function resetToWeirdGraph() {
            rooms.value = [];
            for (let i = 1; i <= 12; i++) {
                rooms.value.push(new Room(i, godMode.value));
            }

            for (let r = 0; r < rooms.value.length; r++) {
                let j = r + 1;
                for (let i = 0; i < 4; i++) {
                    rooms.value[r].connectByTransitionFunction({ dir: i, other: rooms.value[j++], allowMultipleInEdges: allowMultipleInEdges.value });
                }
            }
            ui.reset(new RoomView(rooms.value[0]));
            ui.render();
        }

        function resetToMobiusStrip2(size = 4) {
            let connections: MyConnection[] = [];
            for (let i = 1; i <= size - 1; i++) {
                connections.push({ sDir: Dir.E, s: i, t: i + 1 });
                connections.push({ sDir: Dir.E, s: i + size, t: i + size + 1 });
            }
            for (let i = 1; i <= size; i++) {
                connections.push({ sDir: Dir.S, s: i, t: i + size });
            }
            connections.push({ sDir: Dir.E, s: size, t: 1, tDir: Dir.N });
            connections.push({ sDir: Dir.E, s: 2 * size, t: size + 1, tDir: Dir.S });
            reset2(2 * size, connections);
        }

        function resetRandom() {
            rooms.value = [];
            for (let i = 1; i <= Math.max(2, Math.min(600, numRandomRooms.value)); i++) {
                let room = new Room(i, godMode.value);
                if (i >= Room.colors.length)
                    room.color = getRandomColor();
                rooms.value.push(room);
            }

            for (let r = 0; r < rooms.value.length; r++) {
                for (let i = 0; i < 4; i++) {
                    let other = rooms.value[Math.floor(Math.random() * rooms.value.length)];
                    while (other === rooms.value[r]) {
                        other = rooms.value[Math.floor(Math.random() * rooms.value.length)];
                    }
                    rooms.value[r].connectByTransitionFunction({ dir: i, other, allowMultipleInEdges: allowMultipleInEdges.value });
                }
            }
            ui.reset(new RoomView(rooms.value[0]));
            ui.render();
        }

        function resetCustom() {
            try {
                resetWithCode(code.value);
                document.querySelector<HTMLInputElement>("#customCode")!.setCustomValidity("");
                graph.value = "custom";
                return true;
            }
            catch (ex) {
                document.querySelector<HTMLInputElement>("#customCode")!.setCustomValidity(ex as string);
                invalidCodeFeedback.value = ex as string;
            }
            return false;
        }

        function setGraph() {
            if (graph.value === "custom")
                resetCustom();
            else {
                let code = document.querySelector(`#graphSelect option[value='${graph.value}']`)?.getAttribute("data-code");
                if (code != null) {
                    resetWithCode(code);
                } else {
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

        function updateHistoryState(replace = true) {
            let state: Record<string, any> = {
                godMode: godMode.value,
                allowMultipleInEdges: allowMultipleInEdges.value,
                graph: graph.value,
                code: code.value,
                drawDistance: drawDistance.value
            };
            let params = new URLSearchParams(state);
            for (let key in state) {
                if (state[key] === defaults[key])
                    params.delete(key);
            }
            if (state.graph !== "custom")
                params.delete("code");
            let url = "?" + params.toString();
            if (replace)
                history.replaceState(state, "", url);
            else
                history.pushState(state, "", url);
        }

        function onCodeSubmit(e: Event) {
            if (resetCustom()) {
                updateHistoryState(false);
            }
            document.querySelector("#codeForm")!.classList.add("was-validated");
            e.preventDefault();
        }

        watch(graph, () => {
            setGraph();
        })

        watch(code, () => {
            document.querySelector<HTMLInputElement>("#customCode")!.setCustomValidity("");
            document.querySelector("#codeForm")!.classList.remove("was-validated");
        });

        watch(drawDistance, (value) => {
            ui.setDrawDistance(value);
            ui.render();
            updateHistoryState();
        });

        watch(numRandomRooms, () => {
            resetRandom();
        });

        onMounted(() => {
            const mainCanvas = document.querySelector("#mainCanvas") as HTMLCanvasElement;
            const context = mainCanvas.getContext("2d")!;

            addEventListener("popstate", e => {
                let state = e.state ?? defaults;
                godMode.value = state.godMode;
                allowMultipleInEdges.value = state.allowMultipleInEdges;
                graph.value = state.graph;
                code.value = state.code;
                setGraph();
            });

            if (code.value != "") {
                graph.value = "custom";
            }

            mainCanvas.width = mainCanvas.height = Math.min(document.querySelector("#app")!.clientWidth - 20, innerHeight - 200);

            ui = new GraphUI(context, drawDistance.value);
            setGraph();
        });

        return {
            godMode,
            allowMultipleInEdges,
            graph,
            code,
            rooms,
            invalidCodeFeedback,
            drawDistance,
            numRandomRooms,
            statusText,
            onCodeSubmit
        };
    }
}).mount("#app");
