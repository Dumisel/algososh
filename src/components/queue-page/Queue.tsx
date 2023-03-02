import { ElementStates } from "../../types/element-states";

export class Queue<T extends {
    item: string | null;
    state: ElementStates;
    head: string | null;
    tail: string | null;
  }> {
  private container: T[] = [];
  private head: number = 0;
  private tail: number = 0;
  private length: number = 0;
  private size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = new Array(size)
      .fill({
        item: null,
        state: ElementStates.Default,
        tail: null,
        head: null,
      })
      .map((element) => ({ ...element }));
  }

  get items() {
    return [...this.container];
  }

  get isEmpty() {
    return this.length === 0;
  }

  enqueue = (item: string) => {
    if (this.length === this.size) {
      return;
    }

    const enqueued: T = this.container.find((element: T, i: number) => element.item === null && i >= this.head)!;
    if (enqueued) {
      enqueued.item = item;
      enqueued.state = ElementStates.Changing;
    }

    const setHead: boolean = this.container.some((element: T) => element.head === "head");
    if (!setHead) {
      enqueued!.head = "head";
    }

    if (enqueued && (this.tail + 1 <= this.size 
        || this.tail === this.head 
        || (this.tail > this.head && enqueued?.item !== null))) {
      enqueued.tail = "tail";
    } else {
      return null;
    }

    if (this.tail !== this.size) {
      this.tail === 0 ? (this.tail = this.tail + 1) : this.tail++;
    }
    this.length++;
  };

  dequeue = () => {
    const top: T = this.container.find((element: T) => element.head === "head")!;
    top!.item = null;
    top!.state = ElementStates.Default;
    top!.head = null;
    top!.tail = null;

    this.head === 0 ? (this.head = this.head + 1) : this.head++;
    this.length--;
  };

  setNewHead() {
    const newHead = this.container.find(
      (element: T) => element.head !== "head" && element.item !== null
    );
    if (newHead) {
      newHead.head = "head";
    }
  }

  removeTail() {
    if (this.length === this.size) {
      return;
    }

    const removedTail = this.container.find(
      (element: T) => element.tail === "tail" && element.state === "default"
    );

    if (removedTail) {
      removedTail.tail = null;
    }
  }

  clear() {
    this.container.forEach((item: T) => {
      item.item = null;
      item.head = null;
      item.tail = null;
      item.state = ElementStates.Default;
    });
    this.tail = 0;
  }

  setDefault() {
    this.container = this.container.map((element: T) => {
      return { ...element, state: ElementStates.Default };
    });
  }

  setChanging() {
    const head = this.container.find((element: T) => element.head === "head");
    head!.state = ElementStates.Changing;
  }
}
