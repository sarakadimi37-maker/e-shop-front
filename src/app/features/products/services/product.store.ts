import {inject, Injectable, signal} from '@angular/core';
import {Review} from '../../../models/Review-model';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {
historiqueAllReviews = signal<Map<number, Review[]>>(new Map());





}
