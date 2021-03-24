import request from '@/utils/request'

export default {
    // 查询所有公共文件夹下的bot
    getAllPublicBots() {
        return request({
            url: '/url/v2/repository/workspaces/public/files/list',
            method: 'post',
            data: {}
        })
    }
}

