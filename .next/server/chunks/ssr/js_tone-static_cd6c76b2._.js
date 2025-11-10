module.exports = [
"[project]/js/tone-static/lib/jamendo.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Usando un client_id de demostración para Jamendo
__turbopack_context__.s([
    "searchTracks",
    ()=>searchTracks
]);
const JAMENDO_CLIENT_ID = "036f0b37";
async function searchTracks(query) {
    try {
        const res = await fetch(`https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=10&search=${query}`);
        if (!res.ok) throw new Error("Error al obtener canciones");
        const data = await res.json();
        console.log("Resultados de búsqueda:", data);
        // Transformar los resultados al formato que espera nuestra aplicación
        return (data.results || []).map((track)=>({
                id: track.id,
                name: track.name,
                artist_name: track.artist_name,
                audio: track.audio || track.audiodownload || ''
            }));
    } catch (error) {
        console.error("Error en la búsqueda:", error);
        return [];
    }
}
}),
"[project]/js/tone-static/lib/playlist.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/playlist.ts
__turbopack_context__.s([
    "DoublyLinkedList",
    ()=>DoublyLinkedList
]);
class Node {
    track;
    next;
    prev;
    constructor(track){
        this.track = track;
        this.next = null;
        this.prev = null;
    }
}
class DoublyLinkedList {
    head = null;
    tail = null;
    current = null;
    add(track) {
        const newNode = new Node(track);
        if (!this.head) {
            this.head = this.tail = this.current = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }
    playCurrent() {
        return this.current ? this.current.track : null;
    }
    nextTrack() {
        if (this.current && this.current.next) {
            this.current = this.current.next;
            return this.current.track;
        }
        return null;
    }
    prevTrack() {
        if (this.current && this.current.prev) {
            this.current = this.current.prev;
            return this.current.track;
        }
        return null;
    }
}
}),
"[project]/js/tone-static/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/js/tone-static/app/page.tsx'\n\nExpression expected");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/js/tone-static/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/js/tone-static/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=js_tone-static_cd6c76b2._.js.map