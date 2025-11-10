(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/js/tone-static/lib/jamendo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "searchTracks",
    ()=>searchTracks
]);
const JAMENDO_CLIENT_ID = "036f0b37";
async function searchTracks(query) {
    try {
        const res = await fetch("https://api.jamendo.com/v3.0/tracks/?client_id=".concat(JAMENDO_CLIENT_ID, "&format=json&limit=10&search=").concat(query));
        if (!res.ok) throw new Error("Error al obtener canciones");
        const data = await res.json();
        return (data.results || []).map((track)=>({
                id: track.id.toString(),
                name: track.name,
                artist_name: track.artist_name,
                audio: track.audio || track.audiodownload || ''
            }));
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        return [];
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/js/tone-static/lib/DoubleLinkedList.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ================= Node =================
__turbopack_context__.s([
    "DoubleLinkedList",
    ()=>DoubleLinkedList,
    "Node",
    ()=>Node
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/js/tone-static/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
class Node {
    constructor(value){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "value", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "next", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "prev", void 0);
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
class DoubleLinkedList {
    // Añadir al final
    append(value) {
        const newNode = new Node(value);
        if (!this.tail) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return newNode;
    }
    // Añadir al inicio
    prepend(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
        return newNode;
    }
    // Obtener nodo en índice (seguro)
    getAt(index) {
        if (index < 0 || index >= this.length) return null;
        let current;
        let i;
        if (index < this.length / 2) {
            current = this.head;
            i = 0;
            while(i < index && current){
                current = current.next;
                i++;
            }
        } else {
            current = this.tail;
            i = this.length - 1;
            while(i > index && current){
                current = current.prev;
                i--;
            }
        }
        return current;
    }
    // Eliminar nodo por referencia
    removeNode(node) {
        if (!node) return;
        if (node.prev) node.prev.next = node.next;
        else this.head = node.next;
        if (node.next) node.next.prev = node.prev;
        else this.tail = node.prev;
        this.length--;
    }
    // Insertar en posición
    insertAt(index, value) {
        if (index < 0 || index > this.length) return;
        if (index === 0) {
            this.prepend(value);
            return;
        }
        if (index === this.length) {
            this.append(value);
            return;
        }
        const newNode = new Node(value);
        const prevNode = this.getAt(index - 1);
        const nextNode = prevNode === null || prevNode === void 0 ? void 0 : prevNode.next;
        if (prevNode) {
            prevNode.next = newNode;
            newNode.prev = prevNode;
        }
        if (nextNode) {
            newNode.next = nextNode;
            nextNode.prev = newNode;
        }
        this.length++;
    }
    // Eliminar en posición
    removeAt(index) {
        const nodeToRemove = this.getAt(index);
        if (!nodeToRemove) return null;
        this.removeNode(nodeToRemove);
        return nodeToRemove.value;
    }
    // Convertir lista a array
    toArray() {
        const arr = [];
        let current = this.head;
        while(current){
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
    // Vaciar lista
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    // Mover nodo de una posición a otra
    move(fromIndex, toIndex) {
        if (fromIndex < 0 || fromIndex >= this.length || toIndex < 0 || toIndex >= this.length) return;
        if (fromIndex === toIndex) return;
        const nodeToMove = this.getAt(fromIndex);
        if (!nodeToMove) return;
        // desconectar
        if (nodeToMove.prev) nodeToMove.prev.next = nodeToMove.next;
        else this.head = nodeToMove.next;
        if (nodeToMove.next) nodeToMove.next.prev = nodeToMove.prev;
        else this.tail = nodeToMove.prev;
        // insertar en nueva posición
        if (toIndex === 0) {
            nodeToMove.next = this.head;
            if (this.head) this.head.prev = nodeToMove;
            this.head = nodeToMove;
            nodeToMove.prev = null;
        } else {
            const prevNode = this.getAt(toIndex - 1);
            if (!prevNode) return;
            nodeToMove.next = prevNode.next;
            nodeToMove.prev = prevNode;
            if (prevNode.next) prevNode.next.prev = nodeToMove;
            prevNode.next = nodeToMove;
            if (prevNode === this.tail) this.tail = nodeToMove;
        }
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "head", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "tail", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "length", void 0);
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/js/tone-static/components/Player.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// js/tone-static/components/Player.tsx
__turbopack_context__.s([
    "default",
    ()=>Player
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/js/tone-static/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/js/tone-static/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$lib$2f$jamendo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/js/tone-static/lib/jamendo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$lib$2f$DoubleLinkedList$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/js/tone-static/lib/DoubleLinkedList.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// ================= Utils =================
const formatTime = (timeInSeconds)=>{
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return "".concat(minutes, ":").concat(seconds < 10 ? "0" : "").concat(seconds);
};
// Función para obtener duración de un track
async function getTrackDuration(url) {
    return new Promise((resolve)=>{
        const audio = new Audio(url);
        audio.addEventListener("loadedmetadata", ()=>resolve(audio.duration));
    });
}
function Player() {
    _s();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [tracks, setTracks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [playlist, setPlaylist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentNode, setCurrentNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loop, setLoop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [duration, setDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loadingSearch, setLoadingSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playlistRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$lib$2f$DoubleLinkedList$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleLinkedList"]());
    const [dragIndex, setDragIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ================= Funciones =================
    async function handleSearch(e) {
        e.preventDefault();
        setLoadingSearch(true);
        const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$lib$2f$jamendo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["searchTracks"])(query);
        const resultsWithDuration = await Promise.all(results.map(async (track)=>{
            const duration = track.audio ? await getTrackDuration(track.audio) : 0;
            return {
                ...track,
                duration
            };
        }));
        setTracks(resultsWithDuration);
        setLoadingSearch(false);
    }
    function syncPlaylist() {
        setPlaylist(playlistRef.current.toArray());
    }
    function addToPlaylist(track) {
        let autoPlay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        let exists = false;
        let node = playlistRef.current.head;
        while(node){
            if (node.value.id === track.id) {
                exists = true;
                break;
            }
            node = node.next;
        }
        if (exists) return;
        const newNode = playlistRef.current.append(track);
        syncPlaylist();
        if (!currentNode || autoPlay) playNode(newNode);
        return newNode;
    }
    function playNode(node) {
        if (!node) return;
        setCurrentNode(node);
        if (!audioRef.current) audioRef.current = new Audio();
        const audioEl = audioRef.current;
        audioEl.src = node.value.audio;
        audioEl.loop = loop;
        audioEl.play().then(()=>setIsPlaying(true)).catch(console.error);
        audioEl.onended = ()=>{
            if (loop) playNode(node);
            else if (node.next) playNode(node.next);
            else setIsPlaying(false);
        };
    }
    function togglePlayPause() {
        if (!audioRef.current || !currentNode) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }
    function stopSong() {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
        }
    }
    function playPrev() {
        if (currentNode === null || currentNode === void 0 ? void 0 : currentNode.prev) playNode(currentNode.prev);
    }
    function playNext() {
        if (currentNode === null || currentNode === void 0 ? void 0 : currentNode.next) playNode(currentNode.next);
    }
    function updateProgress() {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime / audioRef.current.duration * 100);
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    }
    function seek(e) {
        if (!audioRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audioRef.current.currentTime = percent * audioRef.current.duration;
    }
    function handleFileUpload(e) {
        var _e_target_files;
        const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            getTrackDuration(url).then((duration)=>{
                const localTrack = {
                    id: file.name,
                    name: file.name,
                    artist_name: "Local",
                    audio: url,
                    duration
                };
                addToPlaylist(localTrack, true);
            });
        }
    }
    function removeFromPlaylist(id) {
        let node = playlistRef.current.head;
        while(node){
            if (node.value.id === id) {
                if ((currentNode === null || currentNode === void 0 ? void 0 : currentNode.value.id) === id) stopSong();
                playlistRef.current.removeNode(node);
                syncPlaylist();
                break;
            }
            node = node.next;
        }
    }
    // ================= Drag & Drop =================
    function handleDragStart(e, index) {
        setDragIndex(index);
        e.dataTransfer.setData("text/plain", index.toString());
    }
    function handleDragOver(e) {
        e.preventDefault();
    }
    function handleDrop(e, dropIndex) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        const fromIndex = data ? parseInt(data, 10) : dragIndex !== null && dragIndex !== void 0 ? dragIndex : -1;
        if (fromIndex < 0 || fromIndex === dropIndex || isNaN(fromIndex)) {
            setDragIndex(null);
            return;
        }
        playlistRef.current.move(fromIndex, dropIndex);
        syncPlaylist();
        const currentId = currentNode === null || currentNode === void 0 ? void 0 : currentNode.value.id;
        if (currentId) {
            let node = playlistRef.current.head;
            while(node && node.value.id !== currentId){
                node = node.next;
            }
            setCurrentNode(node !== null && node !== void 0 ? node : null);
        }
        setDragIndex(null);
    }
    // ================= UI =================
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "player-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Tone Static"
            }, void 0, false, {
                fileName: "[project]/js/tone-static/components/Player.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSearch,
                className: "search-form",
                children: [
                    loadingSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sound-spectrum",
                        "aria-hidden": "true",
                        style: {
                            marginRight: 8
                        },
                        children: Array.from({
                            length: 12
                        }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bar"
                            }, i, false, {
                                fileName: "[project]/js/tone-static/components/Player.tsx",
                                lineNumber: 216,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/js/tone-static/components/Player.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Buscar en Jamendo...",
                        value: query,
                        onChange: (e)=>setQuery(e.target.value),
                        className: "w-full p-8 pr-100"
                    }, void 0, false, {
                        fileName: "[project]/js/tone-static/components/Player.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loadingSearch,
                        children: "Buscar"
                    }, void 0, false, {
                        fileName: "[project]/js/tone-static/components/Player.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/js/tone-static/components/Player.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lists-container",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "results",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Resultados"
                            }, void 0, false, {
                                fileName: "[project]/js/tone-static/components/Player.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: tracks.map((track)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "track-info",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: track.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/js/tone-static/components/Player.tsx",
                                                        lineNumber: 241,
                                                        columnNumber: 19
                                                    }, this),
                                                    " -- ",
                                                    track.artist_name,
                                                    " ",
                                                    track.duration && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "(",
                                                            formatTime(track.duration),
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/js/tone-static/components/Player.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 38
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/js/tone-static/components/Player.tsx",
                                                lineNumber: 240,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "opt",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>addToPlaylist(track, true),
                                                        children: "▶ Reproducir"
                                                    }, void 0, false, {
                                                        fileName: "[project]/js/tone-static/components/Player.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>addToPlaylist(track),
                                                        children: "+ Añadir"
                                                    }, void 0, false, {
                                                        fileName: "[project]/js/tone-static/components/Player.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/js/tone-static/components/Player.tsx",
                                                lineNumber: 244,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, track.id, true, {
                                        fileName: "[project]/js/tone-static/components/Player.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/js/tone-static/components/Player.tsx",
                                lineNumber: 237,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/js/tone-static/components/Player.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "playlist",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Lista"
                            }, void 0, false, {
                                fileName: "[project]/js/tone-static/components/Player.tsx",
                                lineNumber: 255,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: playlist.length > 0 ? playlist.map((track, index)=>{
                                    const isCurrent = (currentNode === null || currentNode === void 0 ? void 0 : currentNode.value.id) === track.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        className: isCurrent ? "active" : "",
                                        draggable: true,
                                        onDragStart: (e)=>handleDragStart(e, index),
                                        onDragOver: handleDragOver,
                                        onDrop: (e)=>handleDrop(e, index),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "track-info",
                                                children: [
                                                    index + 1,
                                                    ". ",
                                                    track.name,
                                                    " -- ",
                                                    track.artist_name,
                                                    " ",
                                                    track.duration && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "(",
                                                            formatTime(track.duration),
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/js/tone-static/components/Player.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 42
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/js/tone-static/components/Player.tsx",
                                                lineNumber: 269,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "button-group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            let node = playlistRef.current.head;
                                                            while(node && node.value.id !== track.id)node = node.next;
                                                            if (node) playNode(node);
                                                        },
                                                        children: isCurrent ? "⏸ En reproducción" : "Reproducir"
                                                    }, void 0, false, {
                                                        fileName: "[project]/js/tone-static/components/Player.tsx",
                                                        lineNumber: 275,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>removeFromPlaylist(track.id),
                                                        children: "Eliminar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/js/tone-static/components/Player.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/js/tone-static/components/Player.tsx",
                                                lineNumber: 274,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, track.id, true, {
                                        fileName: "[project]/js/tone-static/components/Player.tsx",
                                        lineNumber: 261,
                                        columnNumber: 19
                                    }, this);
                                }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "No hay canciones en la lista."
                                }, void 0, false, {
                                    fileName: "[project]/js/tone-static/components/Player.tsx",
                                    lineNumber: 290,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/js/tone-static/components/Player.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/js/tone-static/components/Player.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/js/tone-static/components/Player.tsx",
                lineNumber: 233,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "player-bar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "player-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: currentNode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: currentNode.value.name
                                    }, void 0, false, {
                                        fileName: "[project]/js/tone-static/components/Player.tsx",
                                        lineNumber: 302,
                                        columnNumber: 17
                                    }, this),
                                    " -- ",
                                    currentNode.value.artist_name
                                ]
                            }, void 0, true) : "Ninguna canción seleccionada"
                        }, void 0, false, {
                            fileName: "[project]/js/tone-static/components/Player.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "progress-container",
                            onClick: seek,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "progress",
                                style: {
                                    width: "".concat(progress, "%")
                                }
                            }, void 0, false, {
                                fileName: "[project]/js/tone-static/components/Player.tsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/js/tone-static/components/Player.tsx",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "time",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: formatTime(currentTime)
                                }, void 0, false, {
                                    fileName: "[project]/js/tone-static/components/Player.tsx",
                                    lineNumber: 314,
                                    columnNumber: 13
                                }, this),
                                " / ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: formatTime(duration)
                                }, void 0, false, {
                                    fileName: "[project]/js/tone-static/components/Player.tsx",
                                    lineNumber: 314,
                                    columnNumber: 54
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/js/tone-static/components/Player.tsx",
                            lineNumber: 313,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "controls",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "upload",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "upload-btn",
                                        children: [
                                            "Subir canción",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                accept: "audio/*",
                                                onChange: handleFileUpload,
                                                style: {
                                                    display: "none"
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/js/tone-static/components/Player.tsx",
                                                lineNumber: 321,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/js/tone-static/components/Player.tsx",
                                        lineNumber: 319,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/js/tone-static/components/Player.tsx",
                                    lineNumber: 318,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: playPrev,
                                    disabled: !(currentNode === null || currentNode === void 0 ? void 0 : currentNode.prev),
                                    children: "⏮"
                                }, void 0, false, {
                                    fileName: "[project]/js/tone-static/components/Player.tsx",
                                    lineNumber: 329,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: togglePlayPause,
                                    disabled: !currentNode,
                                    children: isPlaying ? "⏸" : "▶"
                                }, void 0, false, {
                                    fileName: "[project]/js/tone-static/components/Player.tsx",
                                    lineNumber: 330,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: stopSong,
                                    disabled: !currentNode,
                                    children: "⏹"
                                }, void 0, false, {
                                    fileName: "[project]/js/tone-static/components/Player.tsx",
                                    lineNumber: 333,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: playNext,
                                    disabled: !(currentNode === null || currentNode === void 0 ? void 0 : currentNode.next),
                                    children: "⏭"
                                }, void 0, false, {
                                    fileName: "[project]/js/tone-static/components/Player.tsx",
                                    lineNumber: 334,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setLoop(!loop),
                                    children: loop ? "Loop ON" : "Loop OFF"
                                }, void 0, false, {
                                    fileName: "[project]/js/tone-static/components/Player.tsx",
                                    lineNumber: 335,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/js/tone-static/components/Player.tsx",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                            ref: audioRef,
                            onTimeUpdate: updateProgress,
                            style: {
                                display: "none"
                            }
                        }, void 0, false, {
                            fileName: "[project]/js/tone-static/components/Player.tsx",
                            lineNumber: 338,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/js/tone-static/components/Player.tsx",
                    lineNumber: 298,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/js/tone-static/components/Player.tsx",
                lineNumber: 297,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/js/tone-static/components/Player.tsx",
        lineNumber: 209,
        columnNumber: 5
    }, this);
}
_s(Player, "Xi7SK5I39W1/vzDx5mfPHKtYaKk=");
_c = Player;
var _c;
__turbopack_context__.k.register(_c, "Player");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/js/tone-static/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/js/tone-static/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$components$2f$Player$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/js/tone-static/components/Player.tsx [app-client] (ecmascript)");
"use client";
;
;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$components$2f$Player$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/js/tone-static/app/page.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/js/tone-static/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/js/tone-static/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/js/tone-static/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/js/tone-static/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$js$2f$tone$2d$static$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/js/tone-static/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/js/tone-static/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/js/tone-static/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_define_property
]);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
;
}),
]);

//# sourceMappingURL=js_tone-static_aa4fdd5a._.js.map