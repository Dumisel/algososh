import { ElementStates } from "../../types/element-states";

export class ReversedString<T> {

  container: T[] | any = [];
  counter: number = 0;

  reverse = (counter: number): boolean => {
    return (
      this.container.length === 1 
      || counter === this.container.length - counter 
      || counter === this.container.length - counter - 1
    );
  }

  swap = (counter: number): void => {
    let temp: string = this.container[counter].item;
    this.container[counter].item = this.container[this.container.length - 1 - counter].item;

    this.container[counter].state = ElementStates.Changing;

    if (this.container[counter - 1]?.state) {
      this.container[counter - 1].state = ElementStates.Modified;
    }

    this.container[this.container.length - 1 - counter].item = temp;

    this.container[this.container.length - 1 - counter].state = ElementStates.Changing;

    if (this.container[this.container.length - 1 - counter + 1]?.state) {
      this.container[this.container.length - 1 - counter + 1].state = ElementStates.Modified;
    }
  };

  setModified = (): void => {
    this.container = this.container.map((element: T) => {
      return {
        ...element,
        state: ElementStates.Modified,
      };
    });
  }

  setArray = (letters: string[]): void => {
    this.container = letters.map(
      (element: string, i: number, array) => {
        return {
          item: element,
          state:
            i === 0 || i === array.length - 1
              ? ElementStates.Changing
              : ElementStates.Default,
        };
      }
    );
  }
}