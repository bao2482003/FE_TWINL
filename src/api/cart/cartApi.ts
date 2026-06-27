import { axiosClient } from '../axiosClient'
import type { AddCartItemRequest, CartResponse, UpdateCartItemRequest } from '../../types/cart'
import { toAbsUrl } from '../../config/constants'

const fixCart = (res: CartResponse): CartResponse => ({
  ...res,
  items: res.items.map(i => ({ ...i, imageUrl: toAbsUrl(i.imageUrl) || null })),
})

const cartApi = {
  getCart: async () => { const r = await axiosClient.get<CartResponse>('/api/cart'); r.data = fixCart(r.data); return r },
  addItem: async (payload: AddCartItemRequest) => { const r = await axiosClient.post<CartResponse>('/api/cart/items', payload); r.data = fixCart(r.data); return r },
  updateItem: async (itemId: number, payload: UpdateCartItemRequest) => { const r = await axiosClient.put<CartResponse>(`/api/cart/items/${itemId}`, payload); r.data = fixCart(r.data); return r },
  removeItem: (itemId: number) => axiosClient.delete<CartResponse>(`/api/cart/items/${itemId}`),
  clearCart: () => axiosClient.delete<CartResponse>('/api/cart'),
}

export default cartApi
