describe("Фибоначчи", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("Кнопка добавления недоступна, если в инпуте пусто", () => {
    cy.get("input").clear();
    cy.get("button").should("be.disabled");;
  });

  it("Числа генерируются корректно", () => {
    cy.clock()
    cy.get("input").type("4").should("have.value", "4")
    cy.get("button").contains("Рассчитать").click()

    cy.tick(500)
    cy.get('div[class*="circle_circle"]')
      .should("have.length", 1)
      .eq(0)
      .contains("1")

    cy.tick(500)
    cy.get('div[class*="circle_circle"]')
      .should("have.length", 2)
      .eq(1)
      .contains("1")

    cy.tick(500)
    cy.get('div[class*="circle_circle"]')
      .should("have.length", 3)
      .eq(2)
      .contains("2")

    cy.tick(500)
    cy.get('div[class*="circle_circle"]')
      .should("have.length", 4)
      .eq(3)
      .contains("3")
      
    cy.tick(500)
    cy.get('div[class*="circle_circle"]')
      .should("have.length", 5)
      .eq(4)
      .contains("5")
  });
});