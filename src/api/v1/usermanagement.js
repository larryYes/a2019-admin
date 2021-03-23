import request from '@/utils/request'

export default {
    getAllUsers() {
        return request({
            url: '/url/v1/usermanagement/users/list',
            method: 'post',
            data: {}
        })
    }
}

