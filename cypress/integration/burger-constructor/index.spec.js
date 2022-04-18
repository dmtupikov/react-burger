describe('Проверка оформления заказа', function () {

  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('Добавление ингредиента в конструктор', function () {
    cy.get('[class^=burger-ingredients_wrap__]').contains('Флюоресцентная булка').should('not.exist');
    cy.contains('Флюоресцентная булка').trigger('dragstart');
    cy.get('[class^=burger-constructor_wrap__]').trigger('drop');
    cy.get('[class^=burger-constructor_wrap__]').contains('Флюоресцентная булка').should('exist');
  });

  it('Оформление заказа без авторизации', function () {
    cy.get('button').contains('Оформить заказ').click();
    cy.url().should('eq', 'http://localhost:3000/login');
  });

  it('Оформление заказа с авторизацией', function () {
  	cy.get('[class^=input__container]').first().get('[class^=input__icon]').first().click();
    cy.get('input[name="email"]').type('dimon89_06@mail.ru');
    cy.get('input[name="password"]').type('123456');
    cy.get('button').contains('Войти').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('button').contains('Оформить заказ').click();   
    cy.get('[class^=modal]').as('modal').should('exist');
    cy.contains('Ваш заказ начали готовить');
    cy.contains('Дождитесь готовности на орбитальной станции');
  });
  
  it('Закрытие модального окна', function () {
    cy.get('[class^=modal_close__]').click();
    cy.get('[class^=modal]').should('not.exist');
  });

})