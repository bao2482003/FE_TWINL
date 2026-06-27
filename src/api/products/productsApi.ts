import { axiosClient } from '../axiosClient';
import { toAbsUrl } from '../../config/constants';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId?: number;
  category: string;
  brand: string;
  gender: string;
  status: string;
  style: string;
  imageUrls: string[];
  stock: number;
  sizes: string[];
  colorIds?: number[];
  colors: string[];
  conditionPercentage?: number;
  length?: number;
  shoulder?: number;
  chest?: number;
  waist?: number;
  defects?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface ProductsParams {
  search?: string;
  category?: string;
  brand?: string;
  gender?: string;
  size?: string;
  color?: string;
  inStock?: boolean;
  minPrice?: string;
  maxPrice?: string;
  style?: string;
  excludeStyle?: string;
  minCondition?: number;
  maxCondition?: number;
  defects?: string;
  sortBy?: string;
  page?: number;
  sizePage?: number;
}

const fixProduct = (p: Product): Product => ({
  ...p,
  imageUrls: p.imageUrls?.map(toAbsUrl) ?? []
})

const productsApi = {
  getProducts: async (params: ProductsParams = {}) => {
    const res = await axiosClient.get<ProductsResponse>('/api/products', { params });
    res.data.content = res.data.content.map(fixProduct);
    return res;
  },

  getProductById: async (id: number) => {
    const res = await axiosClient.get<Product>(`/api/products/${id}`);
    res.data = fixProduct(res.data);
    return res;
  },
};

export default productsApi;
