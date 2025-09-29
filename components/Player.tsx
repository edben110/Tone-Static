"use client";

import { useState, useRef } from "react";
import { searchTracks, Track } from "../lib/jamendo";
import { DoubleLinkedList, Node } from "../lib/DoubleLinkedList";
import "../app/globals.css"; // Importamos el CSS Dead Space

// ================= Utils =================
const formatTime = (timeInSeconds: number): string => {
  if (isNaN(timeInSeconds)) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default function Player() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentNode, setCurrentNode] = useState<Node<Track> | null>(null);
  const [loop, setLoop] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playlistRef = useRef(new DoubleLinkedList<Track>());
  const [, forceUpdate] = useState({});

  // ================= Funciones principales =================
  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const results = await searchTracks(query);
    setTracks(results); // Ahora tipos coinciden
  }

  function addToPlaylist(track: Track, autoPlay = false) {
    const node = playlistRef.current.push(track);
    forceUpdate({});
    if (!currentNode || autoPlay) playNode(node);
    return node;
  }

  function playNode(node: Node<Track>) {
    setCurrentNode(node);
    if (!audioRef.current) audioRef.current = new Audio();
    const audioEl = audioRef.current;

    audioEl.src = node.value.audio;
    audioEl.loop = loop;
    audioEl
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error("Error al reproducir:", err));

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
      setProgress(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
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
      const localTrack: Track = {
        id: file.name,
        name: file.name,
        artist_name: "Local",
        audio: url,
      };
      addToPlaylist(localTrack, true);
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
        <div className="results">
          <h3>Resultados</h3>
          <ul>
            {tracks.map((track) => (
              <li key={track.id}>
                <span className="track-info">
                  <strong>{track.name}</strong> -- {track.artist_name}
                </span>
                <div className="opt">
                  <button onClick={() => addToPlaylist(track, true)}>
                    ▶ Reproducir
                  </button>
                  <button onClick={() => addToPlaylist(track)}>+ Añadir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="playlist">
          <h3>Lista</h3>
          <ul>
            {playlistRef.current.length > 0 ? (
              (() => {
                const items: React.ReactElement[] = [];
                let node = playlistRef.current.head;
                let index = 0;
                while (node) {
                  items.push(
                    <li
                      key={node.value.id}
                      className={
                        currentNode?.value.id === node.value.id ? "active" : ""
                      }
                    >
                      {index + 1}. {node.value.name} -- {node.value.artist_name}
                      <button onClick={() => playNode(node)}>
                        {currentNode?.value.id === node.value.id
                          ? "|| En reproducción"
                          : "> Reproducir"}
                      </button>
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

      <div className="player-bar">
        <div className="player-content">
          <p>
            {currentNode ? (
              <>
                <strong>{currentNode.value.name}</strong> --{" "}
                {currentNode.value.artist_name}
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

          <div className="time">
            <span>
              {audioRef.current
                ? formatTime(audioRef.current.currentTime)
                : "0:00"}
            </span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="controls">
            <div className="upload">
              <label className="upload-btn">
                Subir cancion
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <button onClick={playPrev} disabled={!currentNode?.prev}>
              ⏮
            </button>
            <button onClick={togglePlayPause} disabled={!currentNode}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button onClick={stopSong} disabled={!currentNode}>
              ⏹
            </button>
            <button onClick={playNext} disabled={!currentNode?.next}>
              ⏭
            </button>
            <button onClick={() => setLoop(!loop)}>
              {loop ? "Loop ON" : "Loop OFF"}
            </button>
          </div>

          <audio
            ref={audioRef}
            onTimeUpdate={updateProgress}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
