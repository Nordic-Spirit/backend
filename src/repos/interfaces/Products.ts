export interface ProductProps extends ProductCardProps {
  description: string;
  alcohol: number;
  capacity: number;
  manufacturer: string;
  country_of_manufacturer: string;
}

export interface ProductCardProps {
  id: number;
  name: string;
  url: string;
  price: number;
}
