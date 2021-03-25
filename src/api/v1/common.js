import request from '@/utils/request'

export default {
    // 获取BOT的所有变量
    getBotVariables(id) {
        return request({
            url: `/url/v1/filecontent/${id}/interface`,
            method: 'get'
        })
    }
}