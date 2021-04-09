import request from '@/utils/request'

export default {
    // 获取所有用户
    getAllUsers(data) {
        return request({
            url: '/url/v1/usermanagement/users/list',
            method: 'post',
            data: data
        })
    },
    // 获取所有角色
    getAllRole(){
        return request({
            url: `/url/v1/usermanagement/roles/list`,
            method: `post`,
            data: {}
        })
    },
    // 获取所有runner用户
    getRunnerUsers(){
        return request({
            url: `/url/v1/devices/runasusers/list`,
            method: `post`,
            data: {}
        })
    }
}