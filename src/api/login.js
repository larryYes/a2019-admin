import request from '@/utils/request'

export function login(username, password, apiKey) {
  return request({
    url: '/url/v1/authentication',
    method: 'post',
    data: {
      username,
      password,
      apiKey
    }
  })
}

export function getInfo(id) {
  return request({
    url: `/url/v1/usermanagement/users/${id}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/url/v1/authentication/logout',
    method: 'post'
  })
}
