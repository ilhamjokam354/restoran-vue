<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <div class="col-md-6">

            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <projects-table-order-detail title="Light Table"></projects-table-order-detail>
                </div>
            </div>
            
        </div>

    </div>
</template>
<script>
  import ProjectsTableOrderDetail from './Tables/ProjectsTableOrderDetail'
  export default {
    name: 'tables',
    components: {
      ProjectsTableOrderDetail
    },
    data (){
        return {
            result : ''
        }
    },
    mounted() {
      let token = localStorage.getItem('token')
      let level = localStorage.getItem('level')
      if(!token){
        this.$router.push('/admin/login')
      }else if(!level){
        this.$router.push('/dashboard')
      }
    }

  };
</script>
<style scoped>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js';
</style>
