import request from '@/utils/request'

export default{
    getInProgressActivity(){
        return request({
            url:'/url/v1/activity/unknownjobs',
            method: 'get',
        })
    },
    getDetailInfo(id){
        return request({
            url:'/url/v1/activity/execution/'+id,
            method:'get'
        })
    }
}