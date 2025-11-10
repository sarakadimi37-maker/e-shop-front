import {CartRules} from '../../app/features/cart/domain/CartRules';
import {Product} from '../../app/models/product-model';
import {CartItemModel} from '../../app/features/cart/model/cart-item-model';

describe('CartRules', () => {
  /**
   * **Chaque test suit la logique “AAA”**
   * - Arrange : prépare les données
   * - Act : réalise l’action que tu souhaites tester
   * - Assert : vérifie si le résultat de l’action menée est conforme à ce que tu souhaites
   */
  let product: Product;

  beforeEach(async () => {
    product = {
      id: 1,
      name: 'Potion',
      description: 'potion potion potion',
      price: 100,
      imageUrl: '',
      category: 'sport',
      inStock: true,
      quantity: 5,
      rating: 5,
      isPromo: false,
      isNew: false,
      // active: true
    };

  });
  /**
   * - **Add**
   *     - should throw if product has no id
   *     - should throw if quantity is zero
   *     - should not allow adding more than stock
   *     - should throw if price is negative
   *     - should not exceed max cart total
   *     - should allow adding product when valid
   */
  it('should throw if product has no id', () => {
    // on force le type pour créer un produit sans id
    const productWithoutId = {...product, id: null } as any;
    expect(() => {
      CartRules.validateAdd(productWithoutId,52, 5)
    }).toThrowError('Produit est invalide');
  });

  it('should throw if quantity is zero', () => {
    expect(()=>{
      CartRules.validateAdd(product, 50, 0)
    }).toThrowError('impossible d’ajouter une quantité nulle ou négative');
  });

  it('should not allow adding more than stock', () => {
    const invalid = { ...product, quantity: -1 };
    expect(()=>{
      CartRules.validateAdd(invalid, 50, 2);
    }).toThrowError('la quantité ajoutée ne doit pas dépasser le stock disponible du produit');
  });

  it('should throw if price is negative', () => {
    const invalid = { ...product, price: 0 };
    expect(()=>{
      CartRules.validateAdd(invalid, 50, 2);
    }).toThrowError('le prix du produit doit être ≥ 0');
  });

  it('should not exceed max cart total', () => {
    const p = {...product, price:5000}
    const totatPrice = 1500;
    expect(()=>{
      CartRules.validateAdd(p, totatPrice, 1);
    }).toThrowError('le montant total du panier ne doit jamais dépasser une limite définie (ex : 5000€)');
  });


  /** Remove
   * - should throw when removing non-existing product
   * - should remove product when existing
   */

  it('should throw when removing non-existing product', () => {
    const storeItems : CartItemModel[]= [{
    product: { ...product },
      quantity: 2
    }];
    expect(()=> {
      CartRules.validateRemove(99, 1, storeItems);
    }).toThrowError('ce produit ne existe pas');
  });

  it('should remove product when existing', () => {
    const storeItems : CartItemModel[]= [{
      product: { ...product },
      quantity: 2
    }];
    expect(()=>{
      CartRules.validateRemove(1, 1, storeItems);
    }).toBeTruthy();
  });
  /**
   * - **Update**
   *     - should throw if updating quantity <= 0
   *     - should throw if updating quantity > stock
   *     - should throw if updating non-existing product
   *     - should update quantity when valid
   */



});
