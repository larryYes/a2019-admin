import request from '@/utils/request'

export default {
    //获取schedules list
    getAllSchedules(data) {
        return request({
            url: `/url/v1/schedule/automations/list`,
            method: `post`,
            data: data
        })
    },
    //激活schedules
    activateSchedules(data){
        return request({
            url:`/url/v1/schedule/automations/activate`,
            method: `put`,
            data: data
        })
    },
    //停用schedules
    deactivateSchedules(data){
        return request({
            url:`/url/v1/schedule/automations/deactivate`,
            method: `put`,
            data: data
        })
    },
    //删除schedules
    deleteSchedules(data){
        return request({
            url:`/url/v1/schedule/automations?automationIds=` + data,
            method: `delete`
        })
    }
}