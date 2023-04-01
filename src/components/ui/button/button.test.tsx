import { Button } from "./button";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Тестирование компонента Button", () => {
	it("Корректная отрисовка кнопки без текста", () => {
	  const buttonWithoutText = render(<Button />);
	  expect(buttonWithoutText).toMatchSnapshot();
	});
  
	it("Корректная отрисовка кнопки с текстом", () => {
	  const buttonWithText = render(<Button text = "text" />);
	  expect(buttonWithText).toMatchSnapshot();
	});
  
	it("Корректная отрисовка заблокированной кнопки", () => {
	  const buttonDisabled = render(<Button disabled = { true } />);
	  expect(buttonDisabled).toMatchSnapshot();
	});
  
	it("Корректная отрисовка кнопки с индикацией загрузки", () => {
	  const buttonWithLoader = render(<Button isLoader = { true } />);
	  expect(buttonWithLoader).toMatchSnapshot();
	});

	it("Корректность вызова колбека при клике на кнопку", () => {
		const handleTestClick = jest.fn();
		render(<Button onClick = { handleTestClick } text = "testing" />);
		fireEvent.click(screen.getByText("testing"));
		expect(handleTestClick).toHaveBeenCalled();
	  });
  })