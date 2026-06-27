import { axiosClient } from '../axiosClient'
import type { Order, OrderPage } from '../../types/order'
import { toAbsUrl } from '../../config/constants'

const fixOrder = (o: Order): Order => ({
  ...o,
  items: o.items.map(i => ({ ...i, imageUrl: toAbsUrl(i.imageUrl) || null })),
})

const orderApi = {
  list: async (page = 0, sizePage = 10) => {
    const r = await axiosClient.get<OrderPage>('/api/orders', { params: { page, sizePage } })
    r.data.content = r.data.content.map(fixOrder)
    return r
  },
  getByCode: async (code: string) => { const r = await axiosClient.get<Order>(`/api/orders/${code}`); r.data = fixOrder(r.data); return r },
  confirmReceipt: (id: number) => axiosClient.post<Order>(`/api/orders/${id}/confirm-receipt`),
  reportMissing: (id: number, reason?: string) => axiosClient.post<Order>(`/api/orders/${id}/report-missing`, { reason }),
}

export default orderApi
