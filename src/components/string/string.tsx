import React, { useCallback, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";

export interface IString {
  letter: string;
  state?: ElementStates;
}

const delay = (
  time: number
) => new Promise(resolve => setTimeout(resolve, time));

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const [letters, setLetters] = useState<IString[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    reverseString();
  };

  const reverseString = useCallback(async() => {
    const values = value.split('').map(item => {
      return {
        letter: item,
        state: ElementStates.Default
      }
    })
    
    setLetters(values)
    let array = [ ...values ]
    
    for (let i = 0; i < array.length/2; i++) {
      setTimeout(() => {
        let start = i;
        let end = array.length - 1 - start;
        array[start].state = ElementStates.Changing;
        array[end].state = ElementStates.Changing;
        setLetters([ ...array ]);

        setTimeout(() => {
          let swaped = array[start].letter;
          array[start] = {
            letter: array[end].letter,
            state: ElementStates.Modified,
          };
          array[end] = {
            letter: swaped,
            state: ElementStates.Modified,
          }
          setLetters([ ...array ]);
          setValue('');
        }, 1000);
      }, 1000 * i);
    }
    await delay(1000 * array.length/2);
    setIsLoading(false);
  }, [value])

  return (
    <SolutionLayout title = "Строка">
     <div className = { styles.wrapper }>
        <form className = { styles.options } onSubmit = { handleSubmit }>
          <Input
            maxLength = { 11 }
            isLimitText = { true }
            onChange = { handleInput }
            value = { value.replace(/\D/g, "") }
          />
          <Button
            text = "Развернуть"
            type = "submit"
            isLoader = { isLoading}
            disabled = { value.length < 2 }
            extraClass = { styles.button }
          />
        </form>
        <div className = { styles.visualBlock }>
          {letters.map((letter, i) => {
            return (
              <Circle
                letter = { letter.letter }
                key = { i }
                state = { letter.state }
              />
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
