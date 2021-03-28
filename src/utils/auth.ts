import Cookies from 'js-cookie'

export const TOKEN = 'TOKEN'

export function setToken(token: string): string | undefined {
  return Cookies.set(TOKEN, token)
}

export function removeToken(): void {
  return Cookies.remove(TOKEN)
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN)
}
