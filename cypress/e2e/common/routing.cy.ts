import getTestIdSelector from "../../helpers/getTestIdSelector";

describe('Роутинг', () => {

  describe('Пользователь авторизован', () => {
    beforeEach(() => {
      cy.login('admin', '123');
    })

    it('Переход на страницу профиля', () => {
      cy.visit('/profile/1');
      cy.get(getTestIdSelector('ProfilePage')).should('exist');
    })

    it('Переход на страницу статей', () => {
      cy.visit('/articles');
      cy.get(getTestIdSelector('ArticlesPage')).should('exist');
    })
  });

  describe('Пользователь не авторизован', () => {
    it('Переход на главную страницу', () => {
      cy.visit('/');
      cy.get(getTestIdSelector('MainPage')).should('exist');
    })

    it('Переход на страницу профиля', () => {
      cy.visit('/profile/1');
      cy.get(getTestIdSelector('MainPage')).should('exist');
    })

    it('Переход на несуществующую страницу', () => {
      cy.visit('/qwerty');
      cy.get(getTestIdSelector('NotFoundPage')).should('exist');
    })
  });
})