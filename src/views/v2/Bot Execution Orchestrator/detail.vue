<template>
  <h2>这是{{req.automationName}}的详情页面</h2>
</template>

<script>
import common from '@/api/v1/common'
export default {
    data(){
        return {
            id:'',
            req: {}
        }
    },
    created(){
        this.id = this.$route.params.id
        common.getDetailInfo(this.id).then((response) =>{
            this.req = response;
        })
        .catch((error) => {
            console.log(error);
        })
    },
    

}
</script>