import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeCounter } from './like-counter';

describe('LikeCounter', () => {
  let component: LikeCounter;
  let fixture: ComponentFixture<LikeCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeCounter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeCounter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
