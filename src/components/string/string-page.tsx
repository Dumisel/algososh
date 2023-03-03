import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ReversedString } from "./String";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string-page.module.css";

export interface IStringItem {
  item: string;
  state: ElementStates;
}

const reversedString = new ReversedString<IStringItem>();

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState("");
  const [letters, setLetters] = useState<IStringItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    reversedString.setArray(value.split(""));
    setLetters([...reversedString.container]);
    if (reversedString.container.length === 1) {
      return;
    }

    setIsLoading(true);

    let counter = 0;
    const interval = setInterval(() => {
      reversedString.swap(counter);
      setLetters([...reversedString.container]);

      counter++;

      if (reversedString.reverse(counter)) {
        clearInterval(interval);
        setTimeout(() => {
          reversedString.setModified();
          setLetters([...reversedString.container]);
          setIsLoading(false);
        }, 1000);
      }
    }, 1000);
  };

  return (
    <SolutionLayout title = "Строка">
     <div className = { styles.wrapper }>
        <form className = { styles.options } onSubmit = { handleSubmit }>
          <Input
            maxLength = { 11 }
            type = "text"
            isLimitText = { true }
            onInput = { handleInput }
            value = {value}
          />
          <Button
            text = "Развернуть"
            type = "submit"
            isLoader = { isLoading}
            disabled = { !value }
            extraClass = { styles.button }
          />
        </form>
        <div className = { styles.visualBlock }>
          {letters.map((letter, i) => {
            return (
              <Circle
                letter = { letter.item }
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
