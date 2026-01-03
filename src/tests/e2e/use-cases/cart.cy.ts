/**
 * **Scénario 1 — Ajout ➜ Panier ➜ Checkout**

 * - Va sur /products
 * - Clique sur “Ajouter au panier”
 * - Vérifie que le compteur dans le header affiche Panier (1)
 * - Va sur /cart
 * - Vérifie que le produit ajouté est bien présent
 * - Clique sur “Valider la commande”
 * - Vérifie la redirection /confirmation et le message “Commande validée 🎉”
 */
import {NotificationService} from '../../../app/shared/services/notification.service';
import {TestBed} from '@angular/core/testing';

describe('Scenario 1: Add a product, view the cart, confirm the order ', () => {
  beforeEach(() => {
    cy.intercept('GET', '/e-shop/products', { fixture: 'products.json' }).as('getProducts');
    cy.visit('/products');
    cy.wait('@getProducts');
  });
  it('Add a product, view the cart with the added product, then confirm the order.', () => {

    cy.get('app-product-card', { timeout: 10000 }).then($els => {
      expect($els.length).to.be.greaterThan(0);
    });

    // choisir la quantity de produit à mettre dans le panier
    cy.get('#prod_1 .quantity-controls button[aria-label="Augmenter la quantité"]').click();
    // Simule un clic sur le lien “Ajouter au panier”
    cy.get('#prod_1 .btn-add-to-cart').should('not.be.disabled').click();
    // Vérifie que le compteur dans le header affiche Panier (1)
    cy.contains('a[aria-label="Panier"] span', '1').click();
    // voir que dans le panier existe une article
    cy.get('.cart-items article', { timeout: 10000 }).then($els => {
      expect($els.length).to.be.equal(1);
    });
    // finaliser l'achat
    cy.get('.btn-checkout').click();
    // verifier que le panier est vide
    cy.contains('.success p', 'Merci de votre achat');

  });
});
/**
 * **Scénario 2 — Ajout ➜ Panier ➜ Update ➜ Checkout**
 *
 * - Ajoute un produit au panier
 * - Va sur /cart
 * - Clique sur “+” pour augmenter la quantité
 * - Vérifie que la quantité et le total sont mis à jour
 * - Clique sur “Valider la commande”
 * - Vérifie le message de confirmation et la redirection /confirmation
 */
describe('Scenario 2: modify a product: add an item, clear an item, then checkout', () => {
  beforeEach(() => {
    cy.intercept('GET', '/products.json', { fixture: 'products.json' }).as('getProducts');
    cy.visit('/products');
    cy.wait('@getProducts');
  });
  it('Add 2 products, delete 1 item, checkout.', () => {

    cy.get('app-product-card', { timeout: 10000 }).then($els => {
      expect($els.length).to.be.greaterThan(0);
    });
    // choisir la quantity de produit à mettre dans le panier
    cy.get('#prod_1 .quantity-controls button[aria-label="Augmenter la quantité"]').dblclick();
    // Simule un clic sur le lien “Ajouter au panier”
    cy.get('#prod_1 .btn-add-to-cart').should('not.be.disabled').click();

    // Vérifie que le compteur dans le header affiche Panier (1)
    cy.contains('a[aria-label="Panier"] span', '1').click();
    // voir que dans le panier existe une article
    cy.get('.cart-items article', { timeout: 10000 }).then($els => {
      expect($els.length).to.be.equal(1);
    });
    // verif qt = 2
    cy.get('.qty-input').then($els => {
      expect($els.val()).to.be.equal('2');
    });
    // supprimer un produit
    cy.get('button[aria-label="Diminuer la quantité"]').click();
    // finaliser l'achat
    cy.get('.btn-checkout').click();
    // verifier que le panier est vide
    cy.contains('.success p', 'Merci de votre achat');

  });
});




