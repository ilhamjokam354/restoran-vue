<template>
    <div>
        <base-header type="gradient-warning" class="pb-6 pb-8 pt-5 pt-md-8">
            
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <projects-table-order title="Light Table"></projects-table-order>
                </div>
            </div>
            
        </div>

    </div>
</template>
<script>
  import ProjectsTableOrder from './Tables/ProjectsTableOrder'
  export default {
    name: 'tables',
    components: {
      ProjectsTableOrder
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
