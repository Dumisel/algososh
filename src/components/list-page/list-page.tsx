import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { LinkedList} from "./LinkedList";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";

const initialArray = ["1", "8", "34", "0"]
const linkedList = new LinkedList<string>(initialArray);

export const ListPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [indexValue, setIndexValue] = useState("");
  const [letters, setLetters] = useState<string[]>(linkedList.array);
  const [topCircleIndex, setTopCircleIndex] = useState(-1);
  const [topCircleLetter, setTopCircleLetter] = useState("");
  const [bottomCircleIndex, setBottomCircleIndex] = useState(-1);
  const [bottomCircleLetter, setBottomCircleLetter] = useState("");
  const [modifiedIndexes, setModifiedIndexes] = useState<number[]>([]);
  const [changedIndexes, setChangedIndexes] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState({
    addToHead: false,
    addToTail: false,
    removeFromHead: false,
    removeFromTail: false,
    addByIndex: false,
    removeByIndex: false,
  });
  const [isDisabled, setIsDisabled] = useState({
    addToHead: false,
    addToTail: false,
    removeFromHead: false,
    removeFromTail: false,
    addByIndex: false,
    removeByIndex: false,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleIndexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndexValue(e.target.value);
  };

  const handleAddToHead = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading((prevState) => ({ ...prevState, addToHead: true }));
    setIsDisabled((prevstate) => ({
      ...prevstate,
      removeFromHead: true,
      removeFromTail: true,
    }));
    if (!value) return null;
    
    linkedList.prepend(value);
    setTopCircleIndex(0);
    setTopCircleLetter(value);
    setValue("");

    setTimeout(() => {
      setLetters(linkedList.array);
      setTopCircleIndex(-1);
      setTopCircleLetter("");
      setModifiedIndexes([0]);

      setTimeout(() => {
        setModifiedIndexes([]);
        setIsLoading((prevState) => ({ ...prevState, addToHead: false }));
        setIsDisabled((prevstate) => ({
          ...prevstate,
          removeFromHead: false,
          removeFromTail: false,
        }));
      }, 500);
    }, 500);
  };

  const handleAddToTail = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading((prevState) => ({ ...prevState, addInTail: true }));
    setIsDisabled((prevstate) => ({
      ...prevstate,
      removeFromHead: true,
      removeFromTail: true,
    }));
    if (!value) return null;
    
    setTopCircleIndex(linkedList.array.length - 1);
    setTopCircleLetter(value);
    linkedList.append(value);
    setValue("");

    setTimeout(() => {
      setLetters(linkedList.array);
      setTopCircleIndex(-1);
      setTopCircleLetter("");

      setModifiedIndexes([linkedList.array.length - 1]);

      setTimeout(() => {
        setModifiedIndexes([]);
        setIsLoading((prevState) => ({ ...prevState, addInTail: false }));
        setIsDisabled((prevstate) => ({
          ...prevstate,
          removeFromHead: false,
          removeFromTail: false,
        }));
      }, 500);
    }, 500);
  };

  const handleDeleteFromHead = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading((prevState) => ({ ...prevState, removeFromHead: true }));
    setIsDisabled((prevstate) => ({
      ...prevstate,
      removeFromTail: true,
    }));
    setLetters(
      letters.map((letter, index) => {
        if (index === 0) {
          return (letter = "");
        } else {
          return letter;
        }
      })
    );
    setBottomCircleIndex(0);
    setBottomCircleLetter(linkedList.currentHead);
    
    linkedList.deleteHead();

    setTimeout(() => {
      setLetters(linkedList.array);
      setBottomCircleIndex(-1);
      setBottomCircleLetter("");
      setIsLoading((prevState) => ({ ...prevState, removeFromHead: false }));
      setIsDisabled((prevstate) => ({
        ...prevstate,
        removeFromTail: false,
      }));
    }, 500);
  };

  const handleDeleteFromTail = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading((prevState) => ({ ...prevState, removeFromTail: true }));
    setIsDisabled((prevstate) => ({
      ...prevstate,
      removeFromHead: true,
    }));
    
    setLetters(
      letters.map((letter, index) => {
        if (index === linkedList.array.length - 1) {
          return (letter = "");
        } else {
          return letter;
        }
      })
    );
    setBottomCircleIndex(linkedList.array.length - 1);
    setBottomCircleLetter(linkedList.currentTail);
    linkedList.deleteTail();

    setTimeout(() => {
      setLetters(linkedList.array);
      setBottomCircleIndex(-1);
      setBottomCircleLetter("");
      setIsLoading((prevState) => ({ ...prevState, removeFromTail: false }));
      setIsDisabled((prevState) => ({
        ...prevState,
        removeFromHead: false,
      }));
    }, 500);
  };

  const handleAddByIndex = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    let counter: number = 0;
    setIsLoading((prevState) => ({ ...prevState, addByIndex: true }));
    setIsDisabled({
      addToHead: true,
      addToTail: true,
      removeFromHead: true,
      removeFromTail: true,
      addByIndex: true,
      removeByIndex: true,
    });
    const interval = setInterval(() => {
      if (counter + 1 <= Number(indexValue)) {
        setTimeout(() => {
          setChangedIndexes((prevState) => [...prevState, counter - 1]);
          setTopCircleIndex(counter);
          setTopCircleLetter(value);
          counter++;
        }, 500);
      } else {
        clearInterval(interval);

        linkedList.addByIndex(value, Number(indexValue));

        setTimeout(() => {
          setModifiedIndexes([Number(indexValue)]);
          setLetters(linkedList.array);
          setTopCircleIndex(-1);
          setTopCircleLetter("");
          
          setTimeout(() => {
            setModifiedIndexes([]);
            setChangedIndexes([]);
            setIsLoading((prevState) => ({ ...prevState, addByIndex: false }));
            setIsDisabled({
              addToHead: false,
              addToTail: false,
              removeFromHead: false,
              removeFromTail: false,
              addByIndex: false,
              removeByIndex: false,
            });
          }, 500);
        }, 500);
      }
    }, 500);
    setIndexValue("");
    setValue("");
  };

  const handleDeleteByIndex = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    let counter: number = 0;
    setIsLoading((prevState) => ({ ...prevState, removeByIndex: true }));
    setIsDisabled({
      addToHead: true,
      addToTail: true,
      removeFromHead: true,
      removeFromTail: true,
      addByIndex: true,
      removeByIndex: true,
    });
    const interval = setInterval(() => {
      if (counter + 1 <= Number(indexValue)) {
        setChangedIndexes((prevState) => [...prevState, counter]);
        counter++;
      } else {
        clearInterval(interval);
        setChangedIndexes([counter]);
        setLetters(
          letters.map((letter, index) => {
            if (index === counter) {
              return (letter = "");
            } else {
              return letter;
            }
          })
        );
        if (counter === 0) {
          setBottomCircleIndex(0);
          setBottomCircleLetter(linkedList.currentHead);
          linkedList.deleteHead();
        } else {
        setBottomCircleIndex(counter);
        setBottomCircleLetter(linkedList.getByIndex(Number(indexValue)));
        linkedList.deleteByIndex(Number(indexValue));
        }

        setTimeout(() => {
          setLetters(linkedList.array);
          setBottomCircleIndex(-1);
          setBottomCircleLetter("");

          setTimeout(() => {
            setChangedIndexes([]);
            setIsLoading((prevState) => ({
              ...prevState,
              removeByIndex: false,
            }));
            setIsDisabled({
              addToHead: false,
              addToTail: false,
              removeFromHead: false,
              removeFromTail: false,
              addByIndex: false,
              removeByIndex: false,
            });
          }, 500);
        }, 500);
      }
    }, 500);
    setValue("");
    setIndexValue("");
  };

  const getCurrentState = (index: number): ElementStates => {
    if (modifiedIndexes.includes(index)) return ElementStates.Modified;
    if (changedIndexes.includes(index)) return ElementStates.Changing;
    return ElementStates.Default;
  };

  return (
    <SolutionLayout title="Связный список">
      <div className = { styles.wrapper }>
        <form className = { styles.options }>
          <div className = { styles.container }>
            <div className = { styles.input }>
              <Input
                placeholder = "Введите значение"
                maxLength = { 4 }
                type = "text"
                isLimitText =  {true }
                value = { value.replace(/\D/g, "") }
                onChange = { handleInput }
              />
            </div>
            <Button
              text = "Добавить в head"
              onClick = { handleAddToHead }
              disabled = {(value.length === 0 && indexValue.length === 0) 
                || isDisabled.addToHead 
                || (value.length === 0 && indexValue.length !== 0)
              }
              isLoader = { isLoading.addToHead }
              extraClass={ styles.valueButton }
            />
            <Button
              text = "Добавить в tail"
              onClick = { handleAddToTail }
              disabled = {(value.length === 0 && indexValue.length === 0) 
                || isDisabled.addToTail 
                || (value.length === 0 && indexValue.length !== 0)
              }
              isLoader = { isLoading.addToTail }
              extraClass={ styles.valueButton }
            />
            <Button
              text = "Удалить из head"
              onClick = { handleDeleteFromHead }
              isLoader = { isLoading.removeFromHead }
              disabled = { isDisabled.removeFromHead 
                || (value.length !== 0 && indexValue.length === 0)
                || (letters.length === 0)
              }
              extraClass={ styles.valueButton }
            />
            <Button
              text = "Удалить из tail"
              onClick = { handleDeleteFromTail }
              isLoader = { isLoading.removeFromTail }
              disabled = { isDisabled.removeFromTail 
                || (value.length !== 0 && indexValue.length === 0)
                || (letters.length === 0)
              }
              extraClass={ styles.valueButton }
            />
          </div>
          <div className={ styles.container }>
            <div className={ styles.input }>
              <Input
                placeholder = "Введите индекс"
                type = "number"
                max = { letters.length - 1 }
                onChange = { handleIndexInput }
                value = { indexValue.replace(/\D/g, "") }
              />
            </div>
            <div className = { styles.container }>
              <Button
                text = "Добавить по индексу"
                onClick = { handleAddByIndex }
                disabled = {(value.length === 0 && indexValue.length === 0) 
                  || (value.length === 0 && indexValue.length !== 0) 
                  || letters.length - 1 < Number(indexValue) 
                  || isDisabled.addByIndex 
                  || indexValue === ""
                }
                isLoader = { isLoading.addByIndex }
                extraClass={ styles.indexButton }
              />
              <Button
                text = "Удалить по индексу"
                onClick = { handleDeleteByIndex }
                disabled = {(value.length === 0 && indexValue.length === 0) 
                  || isDisabled.removeByIndex 
                  || letters.length - 1 < Number(indexValue) 
                  || indexValue === ""
                }
                isLoader={ isLoading.removeByIndex }
                extraClass={ styles.indexButton }
              />
            </div>
          </div>
        </form>
        <div className={ styles.visualBlock }>
          {letters.map((letter, i, array) => {
            return (
              <React.Fragment key = { i }>
                <div className={ styles.twoCirclesWrapper }>
                  {i === topCircleIndex && 
                  (<Circle
                      letter = { topCircleLetter }
                      isSmall = { true }
                      state = { ElementStates.Changing }
                      extraClass = { styles.topCircle }
                    />
                  )}
                  <Circle
                    letter = { letter }
                    index = { i }
                    head = { i === 0 && topCircleIndex ? "head" : "" }
                    tail={ array.length - 1 === i && !bottomCircleLetter ? "tail" : "" }
                    state = { getCurrentState(i) }
                    />
                  {i === bottomCircleIndex && 
                  (<Circle
                      letter = { bottomCircleLetter }
                      isSmall = { true }
                      state = { ElementStates.Changing }
                      extraClass = { styles.bottomCircle }
                    />
                  )}
                </div>
                { array.length - 1 !== i && <ArrowIcon></ArrowIcon> }
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};
