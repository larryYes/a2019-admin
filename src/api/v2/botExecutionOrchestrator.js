import request from '@/utils/request'

export default{
    //搜索bot执行情况
    botExecutions(body){
        return request({
            url: '/url/v2/activity/list',
            method: 'post',
            data: body
        })
    }
}