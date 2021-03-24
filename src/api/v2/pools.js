import request from '@/utils/request'

export default {
    // 查询所有设备池
    getAllPools() {
        return request({
            url: '/url/v2/devices/pools/list',
            method: 'post',
            data: {}
        })
    }
}

