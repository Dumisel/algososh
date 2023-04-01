describe("Тестирование переходов по страницам", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
  
    it("Стартовая страница", () => {
      cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
    });
  
    it("Переход по ссылке на страницы с визуализацией алгоритмов", () => {
      cy.visit("http://localhost:3000/");
      cy.get("a").each((page) => {
        cy.request(page.prop("href"));
      });
    });
  });