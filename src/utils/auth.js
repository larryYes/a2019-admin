import Cookies from 'js-cookie'

const TokenKey = 'X-Authorization'
const TokenUserId = 'id'


export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}



export function getTokenUserId() {
  return Cookies.get(TokenUserId)
}
export function setTokenUserId(Id) {
  return Cookies.set(TokenUserId, Id)
}
export function removeTokenUserId() {
  return Cookies.remove(TokenUserId)
}