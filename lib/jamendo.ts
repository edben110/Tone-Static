const JAMENDO_CLIENT_ID = "036f0b37";

interface JamendoTrack {
  id: number;
  name: string;
  artist_name: string;
  audio?: string;
  audiodownload?: string;
}

interface JamendoResponse {
  results: JamendoTrack[];
}

export interface Track {
  id: string;
  name: string;
  artist_name: string;
  audio: string;
}

export async function searchTracks(query: string): Promise<Track[]> {
  try {
    const res = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=10&search=${query}`
    );
    if (!res.ok) throw new Error("Error al obtener canciones");

    const data: JamendoResponse = await res.json();

    return (data.results || []).map((track) => ({
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


