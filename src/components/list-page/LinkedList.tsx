export interface ILinkedList<T> {
    prepend: (element: T) => void;
    append: (element: T) => void;
    addByIndex: (element: T, index: number) => void;
    deleteByIndex: (index: number) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    toArray: () => T[]
    isEmpty: () => boolean;
    getByIndex: (index: number) => void;
}

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;

  constructor(array: T[]) {
      this.head = null;
      this.size = 0;
      array.forEach(item => this.prepend(item))
  }

  get listSize(): number {
    return this.size;
  }

  get array(): T[] {
    return this.toArray();
  }

  get currentHead() {
    return this.array[0];
  }

  get currentTail() {
    return this.array[this.array.length - 1];
  }

  prepend = (element: T): void => {
    const node = new LinkedListNode<T>(element);
    if (!this.isEmpty()) {
      node.next = this.head
      this.head = node;
    }
    this.head = node;
    this.size++;
  }

  append = (element: T): void => {
    const node = new LinkedListNode<T>(element);
    if (this.head === null) {
      this.head = node;
    }
    if (!this.isEmpty()) {
      let prev = this.head;
      while (prev?.next) {
        prev = prev.next;
      }
      prev.next = node;
    }
    this.size++;
  }

  addByIndex = (element: T, index: number): void => {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const newNode = new LinkedListNode<T>(element);
      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let current = this.head;
        let currentIndex = 0;
        let previous = null;

        while (currentIndex < index) {
          previous = current;
          current = current!.next;
          currentIndex++;
        }
        newNode.next = current;
        previous!.next = newNode;
      }
      this.size++;
    }
  }

  deleteByIndex = (index: number): void => {
    if (index < 0 || index >= this.size) return;
    let current,
      previous,
      counter = 0;
    current = this.head;
    previous = current;

    if (index == 0) {
      this.head = current ? current : null;
    } else {
      while (counter < index) {
        counter++;
        previous = current;
        if (current) {
          current = current.next;
        }
      }
      if (previous) {
        previous.next = current ? current.next : null;
      }
    }
    this.size--;
  }

  deleteHead = (): void => {
    if (!this.head) {
        return;
      }
    this.head = this.head.next;
    this.size--;
  }

  deleteTail = (): void => {
    let curr = this.head;
    let prev;
      while (curr?.next) {
          prev = curr;
          curr = curr.next;
      }
      if (prev?.next) {
          prev.next = null;
      }
    this.size--;
  }

  toArray = (): T[] => {
    const array = [];
    let currentNode = this.head;
    while (currentNode) {
        array.push(currentNode.value)
        currentNode = currentNode.next;
    }

    return array;
  }

  isEmpty = (): boolean => this.listSize === 0;

  getByIndex = (index: number) => {
    return this.array[index];
  };
}