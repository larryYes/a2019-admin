import request from '@/utils/request'

export default {
    // 获取BOT的所有变量
    getBotVariables(id) {
        return request({
            url: `/url/v1/filecontent/${id}/interface`,
            method: 'get'
        })
    },
    //获取正在进行的项目
    getInProgressActivity(){
        return request({
            url:'/url/v1/activity/unknownjobs',
            method: 'get',
        })
    },
    //获取项目的详细信息
    getDetailInfo(id){
        return request({
            url:`/url/v1/activity/execution/${id}`,
            method:'get'
        })
    },
    //获取历史项目
    getHistoryActivity(data){
        return request({
            url: '/url/v1/activity/history/list',
            method: 'post',
            data
        })
    }
}