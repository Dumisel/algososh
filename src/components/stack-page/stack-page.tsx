import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { IStackItem, Stack } from "./Stack";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import styles from "./stack-page.module.css";

const stack = new Stack<IStackItem>();

export const StackPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [letters, setLetters] = useState<{ item: string; state: ElementStates }[]>([]);
  const [isLoading, setIsLoading] = useState({
    addButton: false,
    deleteButton: false,
    clearButton: false,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAddValue = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading({ addButton: true, deleteButton: false, clearButton: false });

    stack.push({ item: value, state: ElementStates.Changing });
    setLetters(stack.items);
    setTimeout(() => {
      stack.setDefault();
      setLetters(stack.items);
      setIsLoading({ addButton: false, deleteButton: false, clearButton: false });
    }, 500);

    setValue("");
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading({ addButton: false, deleteButton: true, clearButton: false });

    stack.setChanging();
    setLetters(stack.items);

    setTimeout(() => {
      stack.pop();
      setLetters(stack.items);
      setIsLoading({ addButton: false, deleteButton: false, clearButton: false });
    }, 500);
  };

  const handleClearAll = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading({ addButton: false, deleteButton: false, clearButton: true });

    stack.clear();
    setLetters(stack.items);
    setIsLoading({ addButton: false, deleteButton: false, clearButton: false });
  };
  return (
    <SolutionLayout title="Стек">
      <div className = { styles.wrapper }>
        <form className = { styles.options } onSubmit={ handleSubmit }>
          <Input
            maxLength = { 4 }
            type = "text"
            isLimitText = { true }
            placeholder = "Введите значение"
            value = { value.replace(/\D/g, "") }
            onInput={ handleInput }
          />
          <Button
            text = "Добавить"
            onClick = { handleAddValue }
            disabled = { !value }
            isLoader = { isLoading.addButton }
          />
          <Button
            text = "Удалить"
            onClick = { handleDelete }
            disabled = { letters.length === 0 }
            isLoader = { isLoading.deleteButton }
          />
          <Button
            text = "Очистить"
            onClick = { handleClearAll }
            disabled ={ letters.length === 0 }
            isLoader = { isLoading.clearButton }
          />
        </form>
        <div className = { styles.visualBlock }>
          {letters.map((letter, i, array) => {
            return (
              <Circle
                letter = { letter.item }
                state = { letter.state }
                key = { i }
                index = { i }
                head = { array.length - 1 === i ? "top" : "" }
              ></Circle>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
