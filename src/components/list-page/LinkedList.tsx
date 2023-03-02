export interface ILinkedList {
  prepend: (element: string) => void;
  append: (element: string) => void;
  removeHead: () => string[] | null | undefined;
  removeTail: () => string[] | null | undefined;
  toArray: () => string[];
  getAt: (index: number) => string;
  insertAt: (element: string, index: number) => string[] | null | undefined;
  deleteAt: (index: number) => string[] | null | undefined;
}

export class Node {
  value: string;
  next: Node | null;

  constructor(value: string, next?: Node | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

export class LinkedList<T> implements ILinkedList {
  public items: T[] = [];
  private head: Node | null;
  private size: number;

  constructor(initialArray: string[]) {
    this.size = 0;
    this.head = null;
    initialArray.forEach((element) => this.prepend(element));
  }

  get elements() {
    return [...this.items];
  }

  get array() {
    return this.toArray() as string[];
  }

  get currentHead() {
    return this.array[0];
  }

  get currentTail() {
    return this.array[this.array.length - 1];
  }

  prepend = (element: string) => {
    const node = new Node(element, this.head);
    this.head = node;
    this.size++;
  };

  append = (element: string) => {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  };

  removeHead = () => {
    if (!this.head) {
      return null;
    } else {
      this.head = this.head.next;
    }
  };

  removeTail = () => {
    if (!this.head) {
      return null;
    }

    if (!this.head.next) {
      this.head = null;
      return;
    }

    let previous = this.head;
    let tail = this.head.next;

    while (tail.next !== null) {
      previous = tail;
      tail = tail.next;
    }
    previous.next = null;
  };

  toArray = () => {
    let curr = this.head;
    let array = [];

    while (curr) {
      array.push(curr?.value);
      curr = curr?.next;
    }
    return array;
  };

  getAt = (index: number) => {
    return this.array[index];
  };

  insertAt = (element: string, index: number) => {
    if (index < 0 || index > this.size) {
      return null;
    } else {
      const newNode = new Node(element);
      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        let current: any = this.head;
        let currentIndex = 0;
        let previous = null;

        while (currentIndex < index) {
          previous = current;
          current = current.next;
          currentIndex++;
        }
        newNode.next = current;
        previous.next = newNode;
      }
      this.size++;
    }
  };

  deleteAt = (index: number) => {
    if (index < 0 || index >= this.size) return null;;
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
}