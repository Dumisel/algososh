import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import  {Queue }  from "./Queue";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";

export interface IQueue {
  item: string;
  state: ElementStates;
  head: string | null;
  tail: string | null;
}

const queue = new Queue<IQueue>(7);
export const QueuePage: React.FC = () => {
  const [value, setValue] = useState("");
  const [letters, setLetters] = useState<IQueue[]>([]);
  const [isLoading, setIsLoading] = useState({
    addButton: false,
    deleteButton: false,
    clearButton: false,
  });

  useEffect(() => {
    setLetters(queue.items);
  }, []);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleAddValue = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsLoading({ addButton: true, deleteButton: false, clearButton: false });
    queue.removeTail();

    queue.enqueue(value);
    setLetters(queue.items);
    setValue("");

    setTimeout(() => {
      queue.setDefault();
      setLetters(queue.items);
      setIsLoading({ addButton: false, deleteButton: false, clearButton: false });
    }, 500);
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading({ addButton: false, deleteButton: true, clearButton: false });

    queue.setChanging();
    setLetters(queue.items);

    setTimeout(() => {
      queue.dequeue();
      setLetters(queue.items);
      queue.setNewHead();
      setLetters(queue.items);
      setIsLoading({ addButton: false, deleteButton: false, clearButton: false });
    }, 500);
  };

  const hadleClearAll = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading({ addButton: false, deleteButton: false, clearButton: true });
    queue.clear();
    setLetters(queue.items);
    setIsLoading({ addButton: false, deleteButton: false, clearButton: false });
  };

  return (
    <SolutionLayout title = "Очередь">
    <div className = { styles.wrapper }>
        <form className = { styles.options } onSubmit = { handleSubmit }>
          <Input
            maxLength = { 4 }
            type = "text"
            isLimitText = { true }
            placeholder = "Введите значение"
            value = { value.replace(/\D/g, "") }
            onInput = { handleInput }
          />
          <Button
            text = "Добавить"
            disabled = { !value }
            onClick = { handleAddValue }
            isLoader = { isLoading.addButton }
          />
          <Button
            text = "Удалить"
            disabled = { !value && queue.isEmpty }
            onClick = { handleDelete }
            isLoader = { isLoading.deleteButton }
          />
          <Button
            text = "Очистить"
            disabled = { !value && queue.isEmpty }
            onClick = { hadleClearAll }
            isLoader = { isLoading.clearButton }
          />
        </form>
        <div className = { styles.visualBlock }>
          {letters.map((letter, i) => {
            return (
              <Circle
                state = { letter?.state } 
                letter = { letter?.item }
                key = { i }
                index = { i }
                head = { letter?.head }
                tail = { letter?.tail }
              />);
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
