export interface Category {
  id: string;
  name: string;
  displayOrder: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  categoryId: string;
  categoryName?: string;
}

export interface ProductsByCategory {
  category: Category;
  products: Product[];
}
