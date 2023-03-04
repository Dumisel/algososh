import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";

export type TNewArray = {
  value: number;
  state: ElementStates;
}

export const SortingPage: React.FC = () => {
  
  const [array, setArray] = useState<TNewArray[]>([]);
  const [radioChecked, setRadioChecked] = useState("selectionType");
  const [isLoading, setIsLoading] = useState("");
  
  const asc: string = "ascending";
  const desc: string = "descending";

  const setDelay = (ms: number) =>
    new Promise((res) => setTimeout(res, ms));

  const randomArr = (): TNewArray[] => {
    let array = [{ value: 0, state: ElementStates.Default }];
    let size = 0;
    const minLen = 3;
    const maxLen = 17;

    while (size < minLen || size > maxLen) {
      size = Math.round(Math.random() * 20);
    }
    for (let i = 0; i <= size; i++) {
      array.push({
        value: Math.round(Math.random() * 100),
        state: ElementStates.Default,
      });
    }
    return array;
  };

  useEffect(() => {
    setArray(randomArr());
  }, []);

  const handleAddNewArray = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading("newArray");
    setArray(randomArr());
    setIsLoading("");
  };

  const handleRadioCheck = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadioChecked(e.target.value);
  };

  const swap = (array: TNewArray[], element1: number, element2: number): void => {
    const temp = array[element1];
    array[element1] = array[element2];
    array[element2] = temp;
  };

  const selectionSort = async (
    array: TNewArray[],
    mode: boolean
  ): Promise<TNewArray[]> => {
  
    for (let i = 0; i < array.length; i++) {
      let smallestIndex = i;
      array[smallestIndex].state = ElementStates.Changing;
      for (let j = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing;
        setArray([...array]);
        await setDelay(1000);
        if (
          mode
            ? array[j].value < array[smallestIndex].value
            : array[j].value > array[smallestIndex].value
        ) {
          smallestIndex = j;
          array[j].state = ElementStates.Changing;
          array[smallestIndex].state =
            i === smallestIndex ? ElementStates.Changing : ElementStates.Default;
          smallestIndex = j;
        }
        if (j !== smallestIndex) {
          array[j].state = ElementStates.Default;
        }
        setArray([...array]);
      }
      swap(array, i, smallestIndex);
      array[smallestIndex].state = ElementStates.Changing;
      array[i].state = ElementStates.Modified;
      setArray([...array]);
    }
    return array;
  };

  const bubbleSort = async (
    array: TNewArray[],
    mode: boolean
  ): Promise<TNewArray[]> => {

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j+ 1].state = ElementStates.Changing;
        const value1 = array[j].value;
        const value2 = array[j + 1].value;
        setArray([...array]);
        await setDelay(1000);
        if (mode ? value1 > value2 : value1 < value2) {
          array[j].value = value2;
          array[j + 1].value = value1;
        }
        array[j].state = ElementStates.Default;
        if (array[j + 1]) {
          array[j + 1].state = ElementStates.Default;
        }
        setArray([...array]);
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setArray([...array]);
    }

    return array;
  };

  const setSortingType = async (mode: string): Promise<void> => {
    setIsLoading(mode);
    const currentMode = mode === desc;
    if (radioChecked === "selectionType") {
      setArray(await selectionSort([...array], currentMode));
    } else {
      setArray(await bubbleSort([...array], currentMode));
    }
    setIsLoading("");
  };

  return (
    <SolutionLayout title = "Сортировка массива">
      <div className = { styles.wrapper }>
        <form className = { styles.options }>
          <div className = { styles.radioButtons }>
            <RadioInput
              label = "Выбор"
              value = { "selectionType" }
              name = { "sorting" }
              defaultChecked
              onChange = { handleRadioCheck }
            />
            <RadioInput
              label = "Пузырёк"
              value = { "bubbleType" }
              name = { "sorting" }
              onChange = { handleRadioCheck }
            />
          </div>
          <div className = { styles.sortingButtons }>
            <Button
              text = "По возрастанию"
              sorting = { Direction.Descending }
              onClick = { () => setSortingType(desc) }
              isLoader = { isLoading === desc }
              disabled = { isLoading === asc }
              extraClass = { styles.button }
            />
            <Button
              text = "По убыванию"
              sorting = { Direction.Ascending }
              onClick = { () => setSortingType(asc) }
              isLoader = { isLoading === asc }
              disabled = { isLoading === desc }
              extraClass = { styles.button }
            />
          </div>
          <Button
            text = "Новый массив"
            onClick = { handleAddNewArray }
            isLoader = { isLoading === "newArray" }
            disabled = { isLoading === asc || isLoading === desc }
            extraClass = { styles.button }
          />
        </form>
        <div className = { styles.visualBlock }>
          { array.map((element, i) => {
            return (
              <Column
                index = { element.value }
                state = { element.state }
                key = { i }
                extraClass = { styles.element }
              />
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
