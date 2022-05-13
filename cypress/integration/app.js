import Chance from "chance";

const chance = new Chance();
const fullName = `${chance.first()} ${chance.last()}`;
const email = chance.email();

describe("requestInviteModal", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("#requestInviteButton").click();
  });

  it("should have form in modal when requestInvite button is clicked", () => {
    cy.get("#requestInviteForm").should("be.visible");
  });

  it("should throw an error if required fields are not filled", () => {
    cy.get("#requestInviteSubmitButton").click();
    cy.get("#requestInviteForm")
      .children()
      .should("contain", "Please provide a full name.")
      .and("contain", "Please provide an email")
      .and("contain", "Please provide a confirmation email.");
  });

  it("should throw an error if full name is less than 3 characters", () => {
    cy.get("#fullName").type("ab");
    cy.get("#requestInviteSubmitButton").click();
    cy.get("#requestInviteForm")
      .children()
      .should("contain", "Please provide a valid full name");
  });

  it("should throw an error if confirmation email is not the same", () => {
    cy.get("#fullName").type(fullName);
    cy.get("#email").type(email);
    cy.get("#confirmEmail").type("nop@example.com");
    cy.get("#requestInviteSubmitButton").click();
    cy.get("#requestInviteForm")
      .children()
      .should("contain", "Your email do no match.");
  });

  it("should clear error after wrong confirmation email, and a correct one is entered", () => {
    cy.get("#fullName").type(fullName);
    cy.get("#email").type(email);
    cy.get("#confirmEmail").type("nop@example.com");
    cy.get("#requestInviteSubmitButton").click();
    cy.get("#requestInviteForm");

    cy.get("#requestInviteForm")
      .children()
      .should("contain", "Your email do no match.");

    cy.get("#confirmEmail").clear();
    cy.get("#confirmEmail").type(email);

    cy.get("#requestInviteForm")
      .children()
      .should("not.contain", "Your email do no match.");
  });

  it("should show success message if correct data is set", () => {
    cy.get("#fullName").type(fullName);
    cy.get("#email").type(email);
    cy.get("#confirmEmail").type(email);
    cy.get("#requestInviteSubmitButton").click();
    cy.get("#requestInviteCompletion").should(
      "contain",
      "Thank you we will be in touch soon"
    );
  });

  it("should show email already in use error for certain email", () => {
    cy.get("#fullName").type(fullName);
    cy.get("#email").type("usedemail@blinq.app");
    cy.get("#confirmEmail").type("usedemail@blinq.app");
    cy.get("#requestInviteSubmitButton").click();
    cy.get("#requestInviteForm")
      .children()
      .should("contain", "This email address is already in use");
  });

  it("should be able to retry with a valid email after failing with used email", () => {
    cy.get("#fullName").type(fullName);
    cy.get("#email").type("usedemail@blinq.app");
    cy.get("#confirmEmail").type("usedemail@blinq.app");
    cy.get("#requestInviteSubmitButton").click();
    cy.get("#requestInviteForm")
      .children()
      .should("contain", "This email address is already in use");

    cy.get("#email").clear().type(email);
    cy.get("#confirmEmail").clear().type(email);

    cy.get("#requestInviteSubmitButton").click();
    cy.get("#requestInviteCompletion").should(
      "contain",
      "Thank you we will be in touch soon"
    );
  });
});
