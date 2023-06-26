import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage';
import { User } from '../../../src/entities/User';

export const login = (username = 'testuser', password = '123') => cy.request({
  method: 'POST',
  url: 'http://localhost:8000/login',
  body: {
    username,
    password,
  },
}).then(({ body }) => {
  window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));

  return body;
});

export const selectByTestId = (id: string) => cy.get(`[data-testid="${id}"]`);

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<User>
      // @ts-ignore
      selectByTestId(id: string): ReturnType<typeof cy.get>
    }
  }
}
