context("Skip Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("has the right App title", () => {
    cy.title().should("contain", "InKurz");
    cy.get('[href="/mainpage"]').click();
    cy.get(
      ":nth-child(2) > .Card__ContentStyled-xcytgi-2 > .Card__FormSection-xcytgi-6 > form > .Card__FormInputStyled-xcytgi-7"
    ).type("Hello");
    cy.get(".Card__ButtonStyled-xcytgi-8 > .MuiSvgIcon-root").click();
  });
});
