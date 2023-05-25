describe('Переход на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then((data) => {
      cy.visit(`profile/${data.id}`);
    });
  });

  it('Успешная загрузка профиля', () => {
    cy.selectByTestId('ProfileCard.firstname').should('have.value', 'test');
  });

  it('Редактирование профиля', () => {

  });
});
