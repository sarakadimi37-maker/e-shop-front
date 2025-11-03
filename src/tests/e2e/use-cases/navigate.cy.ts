describe('Navigation', () => {
  it('naviguate to product page', () => {
    cy.visit('/');
    // Simule un clic sur le lien "Produits"
    cy.get('a[href="/products"]').click();
    // Vérifie que l'URL contient "/products"
    cy.url().should('include', '/products');
    // Vérifie que le contenu de la page correspond bien
    cy.contains('Nos produits');
  });
});

describe('Load datas', () => {
  it('display produc list when feched', () => {
    cy.visit('/products');
    // Attend que 5 cartes apparaissent
    cy.get('.product-card').should('have.length', 7);
  });

});

describe('Product list', () => {
  it('display products from a mock', () => {
    cy.fixture('products').then((data) => {
      cy.intercept('GET', '/api/products', data); // 👈 on INTERCEPTE bam 💥
    });

    cy.visit('/products');
    cy.get('.product-card').should('have.length', 7);
  });
});






