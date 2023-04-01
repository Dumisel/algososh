describe("Строка", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("Кнопка добавления недоступна, если в инпуте пусто", () => {
    cy.get("input").clear()
    cy.get("button").should("be.disabled")
  });
  
  it("Строка разворачивается корректно", () => {
    cy.get("input").type("hello").should("have.value", "hello")
    cy.get("button").contains("Развернуть").click()

    cy.clock();
    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("h")

    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("e")

    cy.get('div[class*="circle_circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("l")
      
    cy.get('div[class*="circle_circle"]')
      .eq(3)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("l")

    cy.get('div[class*="circle_circle"]')
      .eq(4)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("o")

    cy.tick(1000);
    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("o")

    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("e")

    cy.get('div[class*="circle_circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("l")
      
    cy.get('div[class*="circle_circle"]')
      .eq(3)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("l")

    cy.get('div[class*="circle_circle"]')
      .eq(4)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("h")

    cy.tick(1000);
    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("o")

    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("l")

    cy.get('div[class*="circle_circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("l")
      
    cy.get('div[class*="circle_circle"]')
      .eq(3)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("e")

    cy.get('div[class*="circle_circle"]')
      .eq(4)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("h")

    cy.tick(1000);
    cy.get('div[class*="circle_circle"]')
      .eq(0)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("o")
  
    cy.get('div[class*="circle_circle"]')
      .eq(1)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("l")
  
    cy.get('div[class*="circle_circle"]')
      .eq(2)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("l")
        
    cy.get('div[class*="circle_circle"]')
      .eq(3)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("e")
  
    cy.get('div[class*="circle_circle"]')
      .eq(4)
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("h")
  });
});