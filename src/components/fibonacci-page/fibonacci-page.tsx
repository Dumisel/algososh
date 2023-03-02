import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./fibonacci-page.module.css";
import { networkInterfaces } from "os";
import { isArrayLiteralExpression } from "typescript";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [letters, setLetters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [IsDisabled, setIsDisabled] = useState(true);

  const getFibonacciNumbers = (n: number): string[] => {
    const array: number[] = [n];
    for (let i = 0; i <= n; i++) {
      if (i === 0) {
        array[0] = 1;
      } else if (i === 1) {
        array[1] = 1;
      } else {
        array[i] = array[i - 1] + array[i - 2];
      }
    }
    return array.map((n) => n.toString());
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (parseInt(e.target.value) <= 19) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let number = Number(value);

    setIsLoading(true);

    const array: string[] = [];
    let counter: number = 0;
    const fibonacciArray = getFibonacciNumbers(number);

    const interval = setInterval(() => {
      array.push(fibonacciArray[counter]);
      setLetters([...array]);

      counter++;

      if (fibonacciArray.length - 1 === array.length - 1) {
        clearInterval(interval);
        setIsLoading(false);
      }
    }, 500)
  };

  return (
    <SolutionLayout title = "Последовательность Фибоначчи">
      <div className = { styles.wrapper }>
        <form className = { styles.options } onSubmit = { handleSubmit }>
          <Input
            max = { 19 }
            type = "number"
            isLimitText = { true } 
            value = { value.replace(/\D/g, "") }
            onInput = { handleInput }
          />
          <Button
            text = "Рассчитать"
            type = "submit"
            isLoader = { isLoading }
            disabled = { IsDisabled }
          />
        </form>
        <div className = { styles.visualBlock }>
          {letters.map((letter, i) => {
            return (
              <Circle 
                letter = { letter } 
                key = { i } 
                index = { i }
              />);
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
