import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';

export const updateProfile = () => {
  cy.selectByTestId('')
}

export const resetProfile = (id: string) => cy.request({
  method: 'POST',
  url: 'http://localhost:8000/login'
}).then(({ body }) => {
  window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));

  return body;
});

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(): Chainable<void>
      resetProfile(): Chainable<void>
    }
  }
}
