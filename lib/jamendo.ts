// Usando un client_id de demostración para Jamendo
const JAMENDO_CLIENT_ID = "036f0b37";

// Definimos la interfaz para un track
interface JamendoTrack {
  id: number;
  name: string;
  artist_name: string;
  audio?: string;
  audiodownload?: string;
}

// Definimos la interfaz para la respuesta completa
interface JamendoResponse {
  results: JamendoTrack[];
}

export async function searchTracks(query: string) {
  try {
    const res = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=10&search=${query}`
    );
    if (!res.ok) throw new Error("Error al obtener canciones");

    const data: JamendoResponse = await res.json();
    console.log("Resultados de búsqueda:", data);

    // Transformar los resultados al formato que espera nuestra aplicación
    return (data.results || []).map((track) => ({
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


