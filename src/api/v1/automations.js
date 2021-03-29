import request from '@/utils/request'

export default {
    //获取schedules list
    getAllSchedules(data) {
        return request({
            url: `/url/v1/schedule/automations/list`,
            method: `post`,
            data: data
        })
    }
}