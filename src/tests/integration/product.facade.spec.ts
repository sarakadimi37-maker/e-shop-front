
// src/tests/integration/product.facade.spec.ts
/*
import { provideHttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ProductApi } from "@app/tests/products/services/product.api";
import { ProductFacade } from "@app/tests/products/services/product.facade";
import { ProductStore } from "@app/tests/products/services/product.store";
import {CartItemModel} from '../../app/features/cart/model/cart-item-model';
import {Product} from '../../app/models/product-model';
// 👆 Tu vois le "@app" ? C'est grâce à nos tsconfig qu'on peut l'utiliser 😉

// Grappe de tests
describe('ProductFacade.createProduct (integration)', () => {
    let facade: ProductFacade;
    let http: HttpTestingController;
    let store: ProductStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideZonelessChangeDetection(),
                ProductFacade,
                ProductApi,
                ProductStore], // Client HTTP & Services DI
        });

        facade = TestBed.inject(ProductFacade);         // Facade sous test
        http = TestBed.inject(HttpTestingController);   // Contrôleur HTTP mock
        store = TestBed.inject(ProductStore);           // Store réel (signal)
    });

    // Test d'intégration
    it('should call API, update store and return product', async () => {
        // 1. Arrange
      let product: Product;
        const mockResponse = { ...dto, id: '123' }; // ce que le backend renverra

        // 2. Act
        const promise = facade.createProduct(dto);

        // 3. Assert (API)
        const req = http.expectOne('https://jsonplaceholder.typicode.com/products');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(dto);

        // 4. Simuler la réponse du backend
        req.flush(mockResponse);

        // 5. Assert (Store + résultat)
        const result = await promise;
        expect(result.id).toBe('123');
        expect(store.products()[0]).toEqual(result);
    });
});
*/
