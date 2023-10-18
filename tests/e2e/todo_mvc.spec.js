/// <reference types="cypress" />

const testId = id => `[data-testid="${id}"]`;
const TODO_CREATE = testId('todo-create');
const TODO_NAME = testId('todo-name');
const TODO_ITEM = testId('todo-item');

const ITEM1 = 'Find the Plans';
const ITEM2 = 'Save World';
const ITEM3 = 'Get out of my house';

let addItem = (text) => {
  cy.get('.new-todo').type(`${text}{enter}`)
};

let add3Items = () => {
  cy.get('.new-todo').type(`${ITEM1}{enter}`)
  cy.get('.new-todo').type(`${ITEM2}{enter}`)
  cy.get('.new-todo').type(`${ITEM3}{enter}`)
};

describe('TODO MVC', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('New todo', () => {
    it('should show headline "todos"', () => {
      cy.get('h1').should('contain', 'todos');
    });
    it('should create new todo', () => {
      addItem(ITEM1)
      cy.get(TODO_NAME).contains(ITEM1)
    });
    it('should create new todo that is not completed', () => {
      addItem(ITEM1)
      cy.get('.toggle').should('not.be.checked')
    });

    it.only('should create 3 new todos (verify number and last entry)', () => {
      add3Items();
      cy.get(TODO_ITEM).children().should('have.length', 3)
      cy.get(TODO_ITEM).children().last().should('contain', ITEM3)
    });

    it('should show correct todo count)', () => {
      addItem(ITEM1)
      cy.get('.todo-count').should('contain', '1 item left')
      addItem(ITEM2)
      cy.get('.todo-count').should('contain', '2 items left')
    });
  });

  describe('Toggle', () => {
    it('toggle first item reduces number of left items', () => {
      addItem(ITEM1)
      addItem(ITEM2)
      cy.get('.todo-count').should('contain', '2 items left')
      cy.get(':nth-child(2) > .view > .toggle').click()
      cy.get('[data-testid=todo-name]').contains(ITEM2)
      cy.get('.todo-count').should('contain', '1 item left')
    });
    it('toggle completes item', () => {
      addItem(ITEM1)
      cy.get('.toggle').click().should('be.checked')
    });
    // There is no toggle button?
    // it('toggle-all toggles all items');
  });

  describe('Filter', () => {
    it('filter All show all items', () => {
      addItem(ITEM1)
      cy.get('.toggle').click()
      addItem(ITEM2)
      cy.get('.filters a').contains('All').click()
      cy.get('.todo-count').should('contain', '1 item left')
      cy.get(TODO_ITEM).children().should('have.length', 2)
    });
    it('filter Active shows only active items ', () => {
      addItem(ITEM1)
      cy.get('.toggle').click()
      addItem(ITEM2)
      cy.get('.filters a').contains('Active').click()
      cy.get('.todo-count').should('contain', '1 item left')
      cy.get('[data-testid=todo-name]').contains(ITEM2)
    });
    it('filter Completed shows only completed items ', () => {
      addItem(ITEM1)
      cy.get('.toggle').click()
      addItem(ITEM2)
      cy.get('.filters a').contains('Completed').click()
      cy.get('.todo-count').should('contain', '1 item left')
      cy.get('[data-testid=todo-name]').contains(ITEM1)
    });
  });

  describe('clear button', () => {
    it('removes completed items', () => {
      addItem(ITEM1)
      cy.get('.toggle').click()
      addItem(ITEM2)
      cy.get('.clear-completed').click()
      cy.get('.todo-count').should('contain', '1 item left')
      cy.get('[data-testid=todo-name]').contains(ITEM2)
    });
  });
});
