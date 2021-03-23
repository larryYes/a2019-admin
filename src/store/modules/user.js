import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getTokenUserId, removeTokenUserId, setTokenUserId} from '@/utils/auth'

const user = {
  state: {
    id: getTokenUserId(),
    token: getToken(),
    name: '',
    avatar: 'https://i.pinimg.com/originals/ce/10/81/ce10818cef2696f7445bd0673c51d1ba.png',
    permissions: [],
    roles: [],
    lastLoginTime: ''
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LASTLOGINTIME: (state, lastLoginTime) => {
      state.lastLoginTime = lastLoginTime
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.apiKey).then(response => {
          const data = response
          console.log(data.token)
          setToken(data.token)
          setTokenUserId(data.user.id)
          commit('SET_TOKEN', data.token)
          commit('SET_ID', data.user.id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      // debugger
      return new Promise((resolve, reject) => {
        getInfo(state.id).then(response => {
          const data = response
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_LASTLOGINTIME', data.lastLoginTime)
          commit('SET_PERMISSIONS', data.permissions)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeTokenUserId()
        resolve()
      })
    }
  }
}

export default user
