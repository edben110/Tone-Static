// lib/playlist.ts

export interface Track {
  id: string;
  name: string;
  artist_name: string;
  audio: string;
}

class Node {
  track: Track;
  next: Node | null;
  prev: Node | null;

  constructor(track: Track) {
    this.track = track;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
  head: Node | null = null;
  tail: Node | null = null;
  current: Node | null = null;

  add(track: Track) {
    const newNode = new Node(track);
    if (!this.head) {
      this.head = this.tail = this.current = newNode;
    } else {
      this.tail!.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  playCurrent(): Track | null {
    return this.current ? this.current.track : null;
  }

  nextTrack(): Track | null {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.track;
    }
    return null;
  }

  prevTrack(): Track | null {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      return this.current.track;
    }
    return null;
  }
}
