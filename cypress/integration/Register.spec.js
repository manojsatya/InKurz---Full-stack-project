context("Register User", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("has the right App title", () => {
    cy.title().should("contain", "InKurz");
    cy.get('[href="/register"]').click();
    cy.get(".Register__RegisterStyled-gzqz3f-1 > :nth-child(2)").should(
      "include.text",
      "Create Your Account"
    );
    cy.get(":nth-child(1) > .Register__InputStyled-gzqz3f-0").type("Test");
    cy.get(".Register__ButtonStyled-gzqz3f-5").click();
    cy.get(":nth-child(2) > .Register__InputStyled-gzqz3f-0").type(
      "test@de.com"
    );
    cy.get(".Register__ButtonStyled-gzqz3f-5").click();
    cy.get(":nth-child(3) > .Register__InputStyled-gzqz3f-0").type("123456");
    cy.get(".Register__ButtonStyled-gzqz3f-5").click();

    cy.get(":nth-child(5) > .Register__InputStyled-gzqz3f-0").type("123456");
    cy.get(".Register__ButtonStyled-gzqz3f-5").click();
  });
});
