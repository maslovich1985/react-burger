import {NORMA_API} from "../../src/utils/burger-api.ts";

const ingredient1 = '[data-cy="ingredientItem-643d69a5c3f7b9001cfa093c"]';
const ingredient2 = '[data-cy="ingredientItem-643d69a5c3f7b9001cfa0943"]';
const modalWindow = '[data-cy="modal-wrapper"]';
const modalCloseButton = '[data-cy="modal-close-icon"]';
const constructorContainer = '[data-cy="constructor-container"]';
const inputEmail = '[data-cy="input-email"]';
const inputPassword = '[data-cy="input-password"]';

describe("template spec", () => {
    beforeEach(function () {
        cy.intercept("POST", `${NORMA_API}/orders`, {
            fixture: "orders.json",
            delay: 1000,
        }).as("postOrder");
        cy.viewport(1024, 768);
        cy.visit("localhost:3000");
    });

    it("should be available localhost:3000", function () {
        cy.contains("Соберите бургер");
    });

    it("should open ingredient details", function () {
        cy.contains("Краторная булка N-200i").click();
        cy.get(modalWindow).should("exist");
        cy.contains("Детали ингредиента");
    });

    it("should close ingredient details by button", function () {
        cy.contains("Краторная булка N-200i").click();
        cy.get(modalCloseButton).click();
        cy.get(modalWindow).should("not.exist");
    });

    it("should drag-n-drop ingredients", function () {
        cy.get(ingredient1).drag(constructorContainer);
        cy.get(ingredient2).drag(constructorContainer);
        cy.contains("Краторная булка N-200i (верх)");
        cy.contains("Краторная булка N-200i (низ)");
        cy.contains("2590");
    });

    it("should exist order identifier", function () {
        cy.visit("http://localhost:3000#/login");

        cy.get(inputEmail).type("maslovichas1985@gmail.com");
        cy.get(inputPassword).type("korvin123!");
        cy.get(".button").click();
        cy.get(ingredient1).drag(constructorContainer);
        cy.get(ingredient2).drag(constructorContainer);
        cy.get(".button").click();
        cy.wait("@postOrder");
        cy.get(modalWindow).should("exist");
        cy.contains("идентификатор заказа");
        cy.get(modalCloseButton).click();
    });
});