import { Circle } from "./circle";
import { render, screen, fireEvent } from "@testing-library/react";
import { ElementStates } from "../../../types/element-states";

describe("Тестирование компонента Circle", () => {
  it("Корректная отрисовка элемента без буквы", () => {
    const circleWithoutLetter = render(<Circle />);
    expect(circleWithoutLetter).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с буквами", () => {
    const circleWithLetters = render(<Circle letter = "letter" />);
    expect(circleWithLetters).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с head", () => {
    const circleWithHead = render(<Circle head = "head" />);
    expect(circleWithHead).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с react-элементом в head", () => {
    const circleWithElementHead = render(<Circle head = { <Circle /> } />);
    expect(circleWithElementHead).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с tail", () => {
    const circleWithTail = render(<Circle tail = "tail" />);
    expect(circleWithTail).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с react-элементом в tail", () => {
    const circleWithElementTail = render(<Circle tail = { <Circle /> } />);
    expect(circleWithElementTail).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с index", () => {
    const circleWithIndex = render(<Circle index = { 0 } />);
    expect(circleWithIndex).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента с пропом isSmall", () => {
    const circleWithIsSmall = render(<Circle isSmall = { true } />);
    expect(circleWithIsSmall).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента в состоянии default", () => {
    const circleDefault = render(<Circle state = { ElementStates.Default } />);
    expect(circleDefault).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента в состоянии changing", () => {
    const circleChanging = render(<Circle state = { ElementStates.Changing } />);
    expect(circleChanging).toMatchSnapshot();
  });

  it("Корректная отрисовка элемента в состоянии modified", () => {
    const circleModified = render(<Circle state = { ElementStates.Modified } />);
    expect(circleModified).toMatchSnapshot();
  });
});