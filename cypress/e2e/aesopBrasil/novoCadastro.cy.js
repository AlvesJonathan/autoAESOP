/// <reference types="cypress" />
//import faker from 'faker'


context('Cadastrar usuário com o preenchimento de todos os campos.', () => {

  beforeEach(function () {
    cy.visit('/')
    cy.clearCookies()
    //Pegando os dados necessarios
    cy.fixture('dados.json').as('dados').then(() => { })
    //Pegando os conteudos do site para validação
    cy.fixture('conteudo.json').as('cont').then(() => { })

  })

  it('Realizar novo cadastro', function () {
    //Tentativa de gerar dados aleátorios
    /*const nome = faker.name.findName()
    const sobrenome = faker.name.lastName()
    const email = faker.internet.email()*/

    //Acessando o site
    cy.visit('cadastre-se')
      .get('#onetrust-accept-btn-handler').click()
      .wait(this.dados.break)
      .url().should('eq', this.dados.urlCadastro)

    //Preenchendo nome
    cy.get('[name="firstName"]')
      .should('be.visible')
      .type(this.dados.nome)

    //Preenchendo sobrenome
    cy.get('[name="lastName"]')
      .should('be.visible')
      .type(this.dados.sobrenome)

    //Preenchendo e-mail
    cy.get('[name="email"]')
      .should('be.visible')
      .type(this.dados.email)

    //Preenchendo senha
    cy.get('#password-field')
      .should('be.visible')
      .type(this.dados.senha)
      //Ferificando os dados da senha
      .get('.MuiBox-root').contains(this.cont.especial).should('be.visible')
      .get('.MuiBox-root').contains(this.cont.numero).should('be.visible')
      .get('.MuiBox-root').contains(this.cont.ltMaiuscula).should('be.visible')
      .get('.MuiBox-root').contains(this.cont.ltMinuscula).should('be.visible')
      .get('.MuiBox-root').contains(this.cont.minCaracteres).should('be.visible')

    //Preenchendo a confirmação da senha
    cy.get('#confirmPassword-field')
      .should('be.visible')
      .type(this.dados.senha)

    //Preenchendo CPF
    cy.get('[name="cpf"]')
      .should('be.visible')
      .type(this.dados.cpf)

    //Selecionando o genero
    cy.get('[name="gender"]')
      .check('female')

    //Preenchendo data de nascimento
    cy.get('[name="dateOfBirth"]')
      .should('be.visible')
      .type(this.dados.dtNascimento)

    //Preenchendo Telefone
    cy.get('[name="homePhone"]')
      .should('be.visible')
      .type(this.dados.telefone)

    //Marcando o checkbox para receber novidades
    cy.get('[name="receiveNewsLetter"]').check()
      .get('.MuiTypography-root').contains(this.cont.novEmail).should('be.visible')

    //Marcando o checkbox para disponibilizar as informações
    cy.get('[name="infContOptIn"]').check()
      .get('.MuiTypography-root').contains(this.cont.dispInfo).should('be.visible')

    //Marcando o checkbox para confirmar a leitura dos termos
    cy.get('[name="acceptedterms"]').check()
      .get('.MuiTypography-root').contains(this.cont.termos).should('be.visible')

    //Salvando o cadastro
    cy.get('.MuiButton-label')
      .contains('Criar Conta').click()
      .wait(this.dados.longBreak)
  });

})