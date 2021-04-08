import request from '@/utils/request'

export default{
    //搜索凭证
    searchCredentials(){
        return request({
            url: '/url/v2/credentialvault/credentials/list',
            method: 'post',
            data: {}
        })
    }
}