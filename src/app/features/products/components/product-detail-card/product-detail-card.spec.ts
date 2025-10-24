import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailCard } from './product-detail-card';

describe('ProductDetailCard', () => {
  let component: ProductDetailCard;
  let fixture: ComponentFixture<ProductDetailCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
