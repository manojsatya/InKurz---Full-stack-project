context("Commenting on Card", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("has the right App title", () => {
    cy.title().should("contain", "InKurz");
    cy.get("input[name=email]").type("manoj.pesit@gmail.com");
    cy.get("input[name=password]").type("123456");
    cy.get("button[type=submit]").click();
    cy.get(
      ":nth-child(2) > .Card__ContentStyled-xcytgi-2 > .Card__BelowContent-xcytgi-4 > p"
    ).click();
    cy.get(
      ":nth-child(2) > .Card__ContentStyled-xcytgi-2 > .Card__FormSection-xcytgi-6 > form > .Card__FormInputStyled-xcytgi-7"
    ).type("Hello");
    cy.get(".Card__ButtonStyled-xcytgi-8 > .MuiSvgIcon-root").click();
  });
});
