// js/tone-static/lib/DoubleLinkedList.ts

// Definición de un nodo de la lista doblemente enlazada
export class Node<T> {
  value: T;
  next: Node<T> | null = null;
  prev: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// Lista doblemente enlazada
export class DoubleLinkedList<T> {
  head: Node<T> | null = null;
  tail: Node<T> | null = null;
  length = 0;

  push(value: T): Node<T> {
    const node = new Node(value);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
    return node;
  }

  remove(node: Node<T>): T {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    node.next = node.prev = null;
    this.length--;
    return node.value;
  }

  find(value: T): Node<T> | null {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  toArray(): T[] {
    const arr: T[] = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }
    move(fromIndex: number, toIndex: number): void {
    if (
      fromIndex < 0 ||
      fromIndex >= this.length ||
      toIndex < 0 ||
      toIndex >= this.length
    ) {
      return; // índices inválidos
    }
    if (fromIndex === toIndex) return;

    // Buscar el nodo en fromIndex
    let current = this.head;
    let i = 0;
    while (current && i < fromIndex) {
      current = current.next;
      i++;
    }
    if (!current) return;

    // Quitar el nodo de su posición
    this.remove(current);

    // Insertar en nueva posición
    if (toIndex === 0) {
      // Insertar al inicio
      current.next = this.head;
      if (this.head) this.head.prev = current;
      this.head = current;
      if (!this.tail) this.tail = current;
    } else {
      // Buscar la posición destino
      let target = this.head;
      let j = 0;
      while (target && j < toIndex - 1) {
        target = target.next;
        j++;
      }
      if (!target) return;

      current.next = target.next;
      current.prev = target;
      if (target.next) target.next.prev = current;
      target.next = current;
      if (target === this.tail) this.tail = current;
    }
    this.length++;
  }

}
