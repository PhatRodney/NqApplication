import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product, Category, ProductsByCategory } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /**
   * Mock data for demonstration purposes
   * In a real application, this would be fetched from an API endpoint
   */
  private mockCategories: Category[] = [
    { id: '1', name: 'Electronics', displayOrder: 1 },
    { id: '2', name: 'Clothing', displayOrder: 2 },
    { id: '3', name: 'Home & Garden', displayOrder: 3 },
    { id: '4', name: 'Sports & Outdoors', displayOrder: 4 }
  ];

  private mockProducts: Product[] = [
    // Electronics
    { id: '1', name: 'Smartphone X1', description: 'Latest smartphone with amazing features', price: 799.99, categoryId: '1', imageUrl: 'https://via.placeholder.com/300x200?text=Smartphone' },
    { id: '2', name: 'Laptop Pro 15', description: 'Professional laptop for power users', price: 1299.99, categoryId: '1', imageUrl: 'https://via.placeholder.com/300x200?text=Laptop' },
    { id: '3', name: 'Wireless Headphones', description: 'Premium sound quality with noise cancellation', price: 249.99, categoryId: '1', imageUrl: 'https://via.placeholder.com/300x200?text=Headphones' },
    { id: '4', name: '4K Smart TV', description: 'Ultra HD display with smart features', price: 899.99, categoryId: '1', imageUrl: 'https://via.placeholder.com/300x200?text=TV' },
    
    // Clothing
    { id: '5', name: 'Designer Jeans', description: 'Comfortable and stylish denim', price: 89.99, categoryId: '2', imageUrl: 'https://via.placeholder.com/300x200?text=Jeans' },
    { id: '6', name: 'Cotton T-Shirt', description: 'Soft and breathable fabric', price: 24.99, categoryId: '2', imageUrl: 'https://via.placeholder.com/300x200?text=T-Shirt' },
    { id: '7', name: 'Leather Jacket', description: 'Premium leather with classic style', price: 299.99, categoryId: '2', imageUrl: 'https://via.placeholder.com/300x200?text=Jacket' },
    { id: '8', name: 'Running Shoes', description: 'Lightweight and comfortable', price: 119.99, categoryId: '2', imageUrl: 'https://via.placeholder.com/300x200?text=Shoes' },
    
    // Home & Garden
    { id: '9', name: 'Coffee Maker', description: 'Brew perfect coffee every time', price: 79.99, categoryId: '3', imageUrl: 'https://via.placeholder.com/300x200?text=Coffee+Maker' },
    { id: '10', name: 'Garden Tool Set', description: 'Complete set for all your gardening needs', price: 149.99, categoryId: '3', imageUrl: 'https://via.placeholder.com/300x200?text=Tools' },
    { id: '11', name: 'Decorative Pillows', description: 'Add comfort and style to any room', price: 39.99, categoryId: '3', imageUrl: 'https://via.placeholder.com/300x200?text=Pillows' },
    { id: '12', name: 'LED Desk Lamp', description: 'Adjustable brightness with USB charging', price: 45.99, categoryId: '3', imageUrl: 'https://via.placeholder.com/300x200?text=Lamp' },
    
    // Sports & Outdoors
    { id: '13', name: 'Yoga Mat', description: 'Non-slip surface for all exercises', price: 34.99, categoryId: '4', imageUrl: 'https://via.placeholder.com/300x200?text=Yoga+Mat' },
    { id: '14', name: 'Camping Tent', description: 'Spacious and weather-resistant', price: 189.99, categoryId: '4', imageUrl: 'https://via.placeholder.com/300x200?text=Tent' },
    { id: '15', name: 'Mountain Bike', description: 'Durable frame for off-road adventures', price: 599.99, categoryId: '4', imageUrl: 'https://via.placeholder.com/300x200?text=Bike' },
    { id: '16', name: 'Water Bottle', description: 'Insulated stainless steel', price: 24.99, categoryId: '4', imageUrl: 'https://via.placeholder.com/300x200?text=Water+Bottle' }
  ];

  /**
   * Fetch all products grouped by category
   * In a real application, this would make an HTTP request to an API
   */
  getProductsByCategory(): Observable<ProductsByCategory[]> {
    const productsByCategory: ProductsByCategory[] = this.mockCategories
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(category => ({
        category,
        products: this.mockProducts
          .filter(product => product.categoryId === category.id)
          .map(product => ({ ...product, categoryName: category.name }))
      }))
      .filter(item => item.products.length > 0);

    // Simulate API delay
    return of(productsByCategory).pipe(delay(500));
  }

  /**
   * Fetch all categories
   */
  getCategories(): Observable<Category[]> {
    return of(this.mockCategories.sort((a, b) => a.displayOrder - b.displayOrder))
      .pipe(delay(300));
  }

  /**
   * Fetch all products
   */
  getProducts(): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(300));
  }
}
