export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
export interface IProductWithQuantity extends IProduct {
  quantity?: number;
}
