/// <reference types="cypress" />

const testId = id => `[data-testid="${id}"]`;
const TODO_CREATE = testId('todo-create');
const TODO_NAME = testId('todo-name');
const TODO_ITEM = testId('todo-item');

const ITEM1 = 'Find the Plans';
const ITEM2 = 'Save World';
const ITEM3 = 'Get out of my house';

let add3Items = () => {
  // TODO
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
      cy.get('.new-todo').type('New TODO{enter}')
      cy.get('[data-testid=todo-name]').contains('New TODO')
    });
    it('should create new todo that is not completed', () => {
      cy.get('.new-todo').type('New TODO{enter}')
      cy.get('.toggle').should('not.be.checked')
    });

    it('should create 3 new todos (verify number and last entry)', () => {
      cy.get('.new-todo').type('TODO1{enter}')
      cy.get('.new-todo').type('TODO2{enter}')
      cy.get('.new-todo').type('TODO3{enter}')
      cy.get('.todo-list').children().should('have.length', 3)
      cy.get('.todo-list').children().last().should('contain', 'TODO3')
    });

    it('should show correct todo count)', () => {
      cy.get('.new-todo').type('TODO1{enter}')
      cy.get('.todo-count').should('contain', '1 item left')
      cy.get('.new-todo').type('TODO2{enter}')
      cy.get('.todo-count').should('contain', '2 items left')
    });
  });

  describe('Toggle', () => {
    it('toggle first item reduces number of left items', () => {
      cy.get('.new-todo').type('TODO1{enter}')
      cy.get('.new-todo').type('TODO2{enter}')
      cy.get('.todo-count').should('contain', '2 items left')
      cy.get(':nth-child(2) > .view > .toggle').click()
      cy.get('.todo-count').should('contain', '1 item left')
    });
    it('toggle completes item', () => {
      cy.get('.new-todo').type('TODO1{enter}')
      cy.get('.toggle').click().should('be.checked')
    });
    // There is no toggle button?
    // it('toggle-all toggles all items');
  });

  describe('Filter', () => {
    it('filter All show all items', () => {
      cy.get('.new-todo').type('TODO1{enter}')
      cy.get('.toggle').click()
      cy.get('.new-todo').type('TODO2{enter}')
      cy.get('.filters a').contains('All').click()
      cy.get('.todo-count').should('contain', '1 item left')
      cy.get('.todo-list').children().should('have.length', 2)
    });
    it('filter Active shows only active items ', () => {
      cy.get('.new-todo').type('TODO1{enter}')
      cy.get('.toggle').click()
      cy.get('.new-todo').type('TODO2{enter}')
      cy.get('.filters a').contains('Active').click()
      cy.get('.todo-count').should('contain', '1 item left')
      cy.get('[data-testid=todo-name]').contains('TODO2')
    });
    it('filter Completed shows only completed items ', () => {
      cy.get('.new-todo').type('TODO1{enter}')
      cy.get('.toggle').click()
      cy.get('.new-todo').type('TODO2{enter}')
      cy.get('.filters a').contains('Completed').click()
      cy.get('.todo-count').should('contain', '1 item left')
      cy.get('[data-testid=todo-name]').contains('TODO1')
    });
  });

  describe('clear button', () => {
    it('removes completed items', () => {
      cy.get('.new-todo').type('TODO1{enter}')
      cy.get('.toggle').click()
      cy.get('.new-todo').type('TODO2{enter}')
      cy.get('.clear-completed').click()
      cy.get('.todo-count').should('contain', '1 item left')
      cy.get('[data-testid=todo-name]').contains('TODO2')
    });
  });
});
