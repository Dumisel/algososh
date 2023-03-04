import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import  {Queue }  from "./Queue";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./queue-page.module.css";

interface IQueue {
  letter: string;
  state: ElementStates;
}

const queue = new Queue<IQueue>(7);

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState("");
  const [letters, setLetters] = useState(queue.items);
  const [ind, setInd] = useState(0);
  const [color, setColor] = useState<ElementStates>();  
  const [isLoading, setIsLoading] = useState({
    addButton: false,
    deleteButton: false,
    clearButton: false,
  });

  const head = queue.head;
  const tail = queue.tail;

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleAddValue = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!value) return;
    setIsLoading({...isLoading, addButton: true})
    queue.enqueue({ letter: value, state: ElementStates.Default })
    setInd(tail);
    setColor(ElementStates.Changing);
    setLetters([...queue.items])
    setTimeout(() => {
      setValue('');
      setColor(ElementStates.Default);
      setIsLoading({ addButton: false, deleteButton: false, clearButton: false });;
    }, 500); 
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading({ addButton: false, deleteButton: true, clearButton: false });
    setInd(head);
    setColor(ElementStates.Changing);
    setTimeout(() => {
      queue.dequeue();
      setColor(ElementStates.Default);
      setLetters([...queue.items]);
      setIsLoading({ addButton: false, deleteButton: false, clearButton: false });
    }, 500);
  };

  const hadleClearAll = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    queue.clear();
    setLetters([...queue.items]);
    setIsLoading({ addButton: false, deleteButton: false, clearButton: false });
  };

  return (
    <SolutionLayout title = "Очередь">
    <div className = { styles.wrapper }>
        <form className = { styles.options } onSubmit = { handleSubmit }>
          <Input
            maxLength = { 4 }
            isLimitText = { true }
            placeholder = "Введите значение"
            value = { value.replace(/\D/g, "") }
            onChange = { handleInput }
          />
          <Button
            text = "Добавить"
            disabled={value && tail != queue.size ? false : true || isLoading.deleteButton}
            onClick = { handleAddValue }
            isLoader = { isLoading.addButton }
          />
          <Button
            text = "Удалить"
            disabled={head === tail ? true : false || isLoading.addButton}
            onClick = { handleDelete }
            isLoader = { isLoading.deleteButton }
          />
          <Button
            text = "Очистить"
            disabled={queue.isEmpty() || isLoading.addButton || isLoading.deleteButton }
            onClick = { hadleClearAll }
            isLoader = { isLoading.clearButton }
          />
        </form>
        <div className = { styles.visualBlock }>
          {letters.map((letter, i) => {
            return (
              <Circle
                state={i === ind ? color : letter?.state}
                letter = { letter?.letter ? letter.letter : "" }
                key = { i }
                index = { i }
                head = { letter?.letter && i === head ? "head" : "" }
                tail = { letter?.letter && i === tail - 1 ? "tail" : "" }
              />);
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
