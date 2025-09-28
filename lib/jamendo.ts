// Usando un client_id de demostración para Jamendo
const JAMENDO_CLIENT_ID = "036f0b37";

// Definimos el tipo de dato que queremos usar en la app
export interface Track {
  id: string;
  name: string;
  artist_name: string;
  audio: string;
}

// Función para buscar canciones
export async function searchTracks(query: string): Promise<Track[]> {
  try {
    const res = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=10&search=${query}`
    );
    if (!res.ok) throw new Error("Error al obtener canciones");

    const data = await res.json();
    console.log("Resultados de búsqueda:", data);

    // Aquí eliminamos el any y usamos el tipo Track
    return (data.results || []).map((track: any) => ({
      id: track.id,
      name: track.name,
      artist_name: track.artist_name,
      audio: track.audio || track.audiodownload || ""
    })) as Track[];
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    return [];
  }
}
