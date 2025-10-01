// ================= Node =================
export class Node<T> {
  value: T;
  next: Node<T> | null;
  prev: Node<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

// ================= Double Linked List =================
export class DoubleLinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Añadir al final
  append(value: T): Node<T> {
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
  prepend(value: T): Node<T> {
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
  getAt(index: number): Node<T> | null {
    if (index < 0 || index >= this.length) return null;

    let current: Node<T> | null;
    let i: number;

    if (index < this.length / 2) {
      current = this.head;
      i = 0;
      while (i < index && current) {
        current = current.next;
        i++;
      }
    } else {
      current = this.tail;
      i = this.length - 1;
      while (i > index && current) {
        current = current.prev;
        i--;
      }
    }

    return current;
  }

  // Eliminar nodo por referencia
  removeNode(node: Node<T>): void {
    if (!node) return;

    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;

    this.length--;
  }

  // Insertar en posición
  insertAt(index: number, value: T): void {
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
    const nextNode = prevNode?.next;

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
  removeAt(index: number): T | null {
    const nodeToRemove = this.getAt(index);
    if (!nodeToRemove) return null;
    this.removeNode(nodeToRemove);
    return nodeToRemove.value;
  }

  // Convertir lista a array
  toArray(): T[] {
    const arr: T[] = [];
    let current = this.head;

    while (current) {
      arr.push(current.value);
      current = current.next;
    }

    return arr;
  }

  // Vaciar lista
  clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Mover nodo de una posición a otra
  move(fromIndex: number, toIndex: number): void {
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
}
