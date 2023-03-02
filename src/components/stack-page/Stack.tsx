import { ElementStates } from "../../types/element-states";

export interface IStackItem {
  item: string;
  state: ElementStates;
}

interface IStack<IStackItem> {
  peak: () => IStackItem | null;
  push: (item: IStackItem) => void;
  pop: () => void;
}

export class Stack<IStackItem> implements IStack<IStackItem> {
  private container: IStackItem[] | any = [];

  get items() {
    return [...this.container];
  }

  peak = (): IStackItem | null => {
    return this.container[this.container.length - 1];
  }

  push(item: IStackItem): void {
    this.container.push(item);
  }

  pop() {
    if (this.container.length === 0) return;
    return this.container.pop();
  }

  clear(): void {
    this.container = [];
  }

  setDefault() {
    this.container = this.container.map((item: IStackItem) => {
      return { ...item, state: ElementStates.Default };
    });
  }

  setChanging() {
    return (this.container[this.container.length - 1].state = ElementStates.Changing);
  }
}