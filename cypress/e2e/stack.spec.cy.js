describe("Стек", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/stack")
    })
  
    it("Кнопка добавления недоступна, если в инпуте пусто", () => {
      cy.get("input").clear()
      cy.get("button").contains("Добавить").parent().should("be.disabled")
    })
  
    it("Правильность добавления элементов в стек", () => {
      cy.get("input").type("6").should("have.value", "6")
      cy.get("button").contains("Добавить").click()
  
      cy.clock()
      cy.get('div[class*="circle_circle"]')
        .should("have.css", "border-color", "rgb(210, 82, 225)")
        .contains("6")
  
      cy.tick(500)
      cy.get('div[class*="circle_circle"]')
        .should("have.css", "border-color", "rgb(0, 50, 255)")
        .contains("6")
      cy.get("input").type("66").should("have.value", "66");
      cy.get("button").contains("Добавить").click()
  
      cy.get('div[class*="circle_circle"]')
        .eq(0)
        .should("have.css", "border-color", "rgb(0, 50, 255)")
        .contains("6")
      cy.get('div[class*="circle_circle"]')
        .eq(1)
        .should("have.css", "border-color", "rgb(210, 82, 225)")
        .contains("66")
  
      cy.tick(500)
      cy.get('div[class*="circle_circle"]')
        .eq(0)
        .should("have.css", "border-color", "rgb(0, 50, 255)")
        .contains("6")
      cy.get('div[class*="circle_circle"]')
        .eq(1)
        .should("have.css", "border-color", "rgb(0, 50, 255)")
        .contains("66")
    })
  
    it("Правильность удаления элемента из стека", () => {
      cy.clock()
      cy.get("input").type("6").should("have.value", "6")
      cy.get("button").contains("Добавить").click()

      cy.tick(500)
      cy.get("input").type("66").should("have.value", "66")
      cy.get("button").contains("Добавить").click()

      cy.tick(500)
      cy.get('div[class*="circle_circle"]')
        .should("have.length", 2)

      cy.tick(500)
      cy.get("button").contains("Удалить").click();

      cy.get('div[class*="circle_circle"]')
        .eq(0)
        .should("have.css", "border-color", "rgb(0, 50, 255)")
        .contains("6")
      cy.get('div[class*="circle_circle"]')
        .eq(1)
        .should("have.css", "border-color", "rgb(210, 82, 225)")
        .contains("66")

      cy.tick(500)
      cy.get('div[class*="circle_circle"]')
        .should("have.length", 1)

      cy.tick(500)
      cy.get("button").contains("Удалить").click()
      cy.get('div[class*="circle_circle"]')
        .eq(0)
        .should("have.css", "border-color", "rgb(210, 82, 225)")
        .contains("6")
        
			cy.tick(500);
      cy.get('[data-testid="circle"]')
        .should("have.length", 0)
    })
  
    it("Поведение кнопки 'Очистить'", () => {
			cy.get("input").clear()

      cy.clock();
      cy.get("input").type("6").should("have.value", "6")
      cy.get("button").contains("Добавить").click();

      cy.tick(500);
      cy.get("input").type("66").should("have.value", "66")
      cy.get("button").contains("Добавить").click()

      cy.tick(500);
      cy.get("input").type("666").should("have.value", "666")
      cy.get("button").contains("Добавить").click()
			
			cy.tick(500);
      cy.get("button").contains("Очистить").click()
      cy.get('div[class*="circle_circle"]').should("have.length", 0)
    })
  })