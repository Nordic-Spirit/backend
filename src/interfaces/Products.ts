export interface ProductProps extends ProductCardProps {
  alcohol: number;
  capacity: number;
  manufacturer: string;
  countryOfManufacturer: string;
  subCategoryId: number | null;
  subCategoryName: number | null;
}

export interface ProductCardProps {
  productId: number;
  productName: string;
  productUrl: string;
  productPrice: number;
  categoryId: number;
  categoryName: string;
  productRatingAvg: number | null;
  productRatingCount: number | null;
  isFavorite: boolean;
  productsInStorage: number;
  discountPercentage?: number;
}
