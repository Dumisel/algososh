describe("Тестирование работоспособности приложения", () => {
    it("Приложение поднялось на localhost:3000", () => {
      cy.visit("http://localhost:3000");
    });
  });