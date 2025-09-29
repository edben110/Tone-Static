"use client";

import { useState, useRef } from "react";
import { searchTracks, Track } from "../lib/jamendo";
import { DoubleLinkedList, Node } from "../lib/DoubleLinkedList";
import "../app/globals.css";

// ================= Utils =================
const formatTime = (timeInSeconds: number): string => {
  if (isNaN(timeInSeconds)) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Función para obtener duración de un track
async function getTrackDuration(url: string): Promise<number> {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => resolve(audio.duration));
  });
}

export default function Player() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<(Track & { duration: number })[]>([]);
  const [currentNode, setCurrentNode] = useState<Node<Track & { duration: number }> | null>(null);
  const [loop, setLoop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playlistRef = useRef(new DoubleLinkedList<Track & { duration: number }>());
  const [, forceUpdate] = useState({});

  // ================= Funciones =================
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const results = await searchTracks(query);

    // Obtener duración de cada track
    const resultsWithDuration = await Promise.all(
      results.map(async (track) => {
        const duration = track.audio ? await getTrackDuration(track.audio) : 0;
        return { ...track, duration };
      })
    );

    setTracks(resultsWithDuration);
  }

  function addToPlaylist(track: Track & { duration: number }, autoPlay = false) {
    // Evitar duplicados por id
    let exists = false;
    let node = playlistRef.current.head;
    while (node) {
      if (node.value.id === track.id) {
        exists = true;
        break;
      }
      node = node.next;
    }
    if (exists) return;

    const newNode = playlistRef.current.push(track);
    forceUpdate({});
    if (!currentNode || autoPlay) playNode(newNode);
    return newNode;
  }

  function playNode(node: Node<Track & { duration: number }>) {
    if (!node) return;
    setCurrentNode(node);
    if (!audioRef.current) audioRef.current = new Audio();
    const audioEl = audioRef.current;

    audioEl.src = node.value.audio;
    audioEl.loop = loop;
    audioEl.play().then(() => setIsPlaying(true)).catch(console.error);

    audioEl.onended = () => {
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
    if (currentNode?.prev) playNode(currentNode.prev);
  }

  function playNext() {
    if (currentNode?.next) playNode(currentNode.next);
  }

  function updateProgress() {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const localTrack: Track & { duration: number } = {
        id: file.name,
        name: file.name,
        artist_name: "Local",
        audio: url,
        duration: 0,
      };
      addToPlaylist(localTrack, true);
    }
  }

  function removeFromPlaylist(id: string) {
    let node = playlistRef.current.head;
    while (node) {
      if (node.value.id === id) {
        // Si es la canción en reproducción, parar
        if (currentNode?.value.id === id) stopSong();
        playlistRef.current.remove(node);
        forceUpdate({});
        break;
      }
      node = node.next;
    }
  }

  // ================= UI =================
  return (
    <div className="player-container">
      <h1>Tone Static</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Buscar en Jamendo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <div className="lists-container">
        {/* Resultados */}
        <div className="results">
          <h3>Resultados</h3>
          <ul>
            {tracks.map((track) => (
              <li key={track.id}>
                <span className="track-info">
                  <strong>{track.name}</strong> -- {track.artist_name}{" "}
                  {track.duration && <span>({formatTime(track.duration)})</span>}
                </span>
                <div className="opt">
                  <button onClick={() => addToPlaylist(track, true)}>▶ Reproducir</button>
                  <button onClick={() => addToPlaylist(track)}>+ Añadir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Playlist */}
        <div className="playlist">
          <h3>Lista</h3>
          <ul>
            {playlistRef.current.length > 0 ? (
              (() => {
                const items: React.ReactElement[] = [];
                let node = playlistRef.current.head;
                let index = 0;
                while (node) {
                  const isCurrent = currentNode?.value.id === node.value.id;
                  const trackId = node.value.id; // Evita errores de scope
                  items.push(
                    <li key={trackId} className={isCurrent ? "active" : ""}>
                      {index + 1}. {node.value.name} -- {node.value.artist_name}{" "}
                      {node.value.duration && <span>({formatTime(node.value.duration)})</span>}
                      <button onClick={() => playNode(node)}>
                        {isCurrent ? "⏸ En reproducción" : "▶ Reproducir"}
                      </button>
                      <button onClick={() => removeFromPlaylist(trackId)}> Eliminar</button>
                    </li>
                  );
                  node = node.next;
                  index++;
                }
                return items;
              })()
            ) : (
              <p>No hay canciones en la lista.</p>
            )}
          </ul>
        </div>
      </div>

      {/* Barra de reproducción */}
      <div className="player-bar">
        <div className="player-content">
          <p>
            {currentNode ? (
              <>
                <strong>{currentNode.value.name}</strong> -- {currentNode.value.artist_name}
              </>
            ) : (
              "Ninguna canción seleccionada"
            )}
          </p>

          <div className="sound-spectrum">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="bar"></span>
            ))}
          </div>

          <div className="progress-container" onClick={seek}>
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>

          {/* Tiempo actual / duración total */}
          <div className="time">
            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
          </div>

          <div className="controls">
            <div className="upload">
              <label className="upload-btn">
                Subir canción
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <button onClick={playPrev} disabled={!currentNode?.prev}>⏮</button>
            <button onClick={togglePlayPause} disabled={!currentNode}>{isPlaying ? "⏸" : "▶"}</button>
            <button onClick={stopSong} disabled={!currentNode}>⏹</button>
            <button onClick={playNext} disabled={!currentNode?.next}>⏭</button>
            <button onClick={() => setLoop(!loop)}>{loop ? "Loop ON" : "Loop OFF"}</button>
          </div>

          <audio ref={audioRef} onTimeUpdate={updateProgress} style={{ display: "none" }} />
        </div>
      </div>
    </div>
  );
}
