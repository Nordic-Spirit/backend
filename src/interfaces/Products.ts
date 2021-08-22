export interface ProductProps {
  productId: number;
  productName: string;
  productUrl: string;
  productPrice: number;
  categoryId: number;
  categoryName: string;
  productCount: number;
  discountPercentage?: number;
  description?: string;
  alcohol?: number;
  capacity?: number;
  manufacturer?: string;
  countryOfManufacturer?: string;
}
