export class Stack<T> {
  container: T[] = [];
  
  get items() {
    return [...this.container];
  }

  get size() {
    return this.container.length;
  }

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  clear = () => {
    this.container = [];
  };

  getByIndex(index: number, item: T) {
    this.container[index] = item;
  }
  
}