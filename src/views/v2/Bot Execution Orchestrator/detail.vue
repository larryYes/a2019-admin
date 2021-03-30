<template>
  <h2>{{req.automationName}}</h2>
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
        this.loadInfo()
    },
    methods:{
        loadInfo(){
            common.getDetailInfo(this.id).then((response) =>{
            this.req = response;
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        })
        }
    }
    

}
</script>