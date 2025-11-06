import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {CartFacade} from '../../app/features/cart/services/cart.facade';
import {CartApi} from '../../app/features/cart/services/cart.api';
import {CartStore} from '../../app/features/cart/services/cart.store';
import {CartItemModel} from '../../app/features/cart/model/cart-item-model';
import {Product} from '../../app/models/product-model';
import {NotificationService} from '../../app/shared/services/notification.service';
import {ErrorService} from '../../app/core/services/error.service';

describe('Cart Facade', () => {

  let facade: CartFacade;
  let store: CartStore;
  let http: HttpTestingController;
  let notification: NotificationService;
  let product: Product;
  let errorService: ErrorService;

  product =   {
    id: 1,
    name: "The Witcher 3: Wild Hunt",
    description: "Jeu de rôle en monde ouvert dans un univers fantasy sombre",
    price: 39.99,
    imageUrl: "https://placehold.co/300x200/8B0000/ffffff?text=Witcher",
    category: "gaming",
    inStock: true,
    quantity: 3,
    rating: 4.9,
    isNew: true,
    isPromo: false,

  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
        NotificationService,
        CartFacade,
        CartApi,
        CartStore], // Client HTTP & Services DI
    });

    facade = TestBed.inject(CartFacade);         // Facade sous test
    http = TestBed.inject(HttpTestingController);   // Contrôleur HTTP mock
    store = TestBed.inject(CartStore);           // Store réel (signal)
    notification = TestBed.inject(NotificationService);
    errorService = TestBed.inject(ErrorService);
  });
  // test de ajout d'un produit dans panier
  //should call API, update store and return cart item → ajout
  it('should add product in cart, notify message success', async () => {
    // 1. Arrange
    const storeItems : CartItemModel= {
      product: { ...product },
      quantity: 2
    };

    const mockResponse = { ...storeItems, id: 1 }; // ce que le backend renverra
    // 2. Act
     await facade.add(product,2);

    // 3. Assert (API)
    //const req = http.expectOne('http://localhost:4200/cart');
   // expect(req.request.method).toBe('POST');
   // console.log(req.request.method);
    //expect(req.request.body).toEqual(storeItems);
   // console.log(req.request.body);

    // 4. Simuler la réponse du backend
    //req.flush(mockResponse);
    const message = notification.message();
    // 5. Assert (Store + résultat)
    //const result = await promise;
   // expect(result.product.id).toBe(2);
    //expect(store.addProductToCart).toEqual(result);
    expect("Produit a été ajouter avec succès.").toEqual(message!);

  });
  /**
   * - should call API, update store and update cart item → mise à jour de la quantité
   * - should call API, update store and remove cart item → suppression d’un produit
   * - should call API, clear store when clearing cart → vider le panier
   * - should call API and validate checkout flow → valider la commande si le panier est correct
   */

  // cas de test pour m.a.j de panier
  it('should update quantity of product in cart, notify message success', async () => {
    // 1. Arrange : preparer le panier en ajoutant le produit
    store.addProductToCart(product, 1);
    // 2. Act : ajouter le meme produit une deuxième fois
    await facade.add(product,1);

    // 3. Assert (vérifier que le produit a bien été ajouté dans le panier)
    const message = notification.message();

    expect("Produit a été mise à jour avec succès.").toEqual(message!);

  });

  // test de cas d'exeption donc le produit ne doit pas s'ajouter si la quantité ajiuté depasse le stock
  it('should throw execption when quantity of product in cart is > of quantity in stock', async () => {
    // 1. Arrange :
    // 2. Act : ajouter le meme produit une deuxième fois
    await facade.add(product,5);

    // 3. Assert (vérifier que le produit a bien été ajouté dans le panier)
    const message = errorService.error();

    expect("la quantité ajoutée ne doit pas dépasser le stock disponible du produit").toEqual(message!);

  });

  // should call API, update store and remove cart item → suppression d’un produit
  // cas de test se suppression d'un produit et avoir une notification
it("should remove product in cart, notify message success", async () => {
  await facade.remove(1);
  const message = notification.message();
  expect("Produit a été supprimer avec succès.").toEqual(message!);
});

  // cas de test pour effacer les produits qui sont dans le panier
  it("should clear products in cart, notify message success", async () => {
    facade.clearProductsInCart();
    const message = notification.message();
    expect("Le panier a été vider avec succès.").toEqual(message!);
  });
/*
  // cas de test pour déminuer le taux de produit dans panier
  it("should reduce products in cart, notify message success", async () => {
    await  facade.reduceQt(product, 1);
    const message = notification.message();
    expect("Une erreur est survenue.").toEqual(message!);
  });
*/
});
