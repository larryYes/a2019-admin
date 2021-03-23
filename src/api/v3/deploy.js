import request from '@/utils/request'

export default {
    // 部署bot
    deployBot(data) {
        return request({
            url: '/url/v3/automations/deploy',
            method: 'post',
            data
        })
    }
}

