export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? 'http://localhost:8080' : '')

export const toAbsUrl = (url?: string | null): string =>
  url ? (url.startsWith('/') ? `${API_BASE_URL}${url}` : url) : ''
