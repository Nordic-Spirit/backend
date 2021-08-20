export interface ProductProps extends ProductCardProps {
  description: string;
  alcohol: number;
  capacity: number;
  manufacturer: string;
  countryOfManufacturer: string;
}

export interface ProductCardProps {
  productId: number;
  productName: string;
  url: string;
  price: number;
  categoryId: number;
  categoryName: string;
  productCount: number;
}
