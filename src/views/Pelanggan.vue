<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <projects-table-pelanggan title="Light Table"></projects-table-pelanggan>
                </div>
            </div>
            
        </div>

    </div>
</template>
<script>
  import ProjectsTablePelanggan from './Tables/ProjectsTablePelanggan'
  export default {
    name: 'tables',
    components: {
      ProjectsTablePelanggan
    },
    data (){
        return {
            result : ''
        }
    }

  };
</script>
<style scoped>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/all.min.js';
</style>
