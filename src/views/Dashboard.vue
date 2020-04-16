<template>
    <div >
        <base-header type="gradient-success" class="pb-6 pb-2 pt-5 pt-md-1">
          
          
        </base-header>
        
        <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="200"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
        
      >
        <!-- Text slides with image -->
        <b-carousel-slide
        img-src="http://localhost:1000/upload/image/resto2.jpg">
        <h1 id="carUcap" class="text-white">Selamat Datang </h1>

        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide img-src="http://localhost:1000/upload/image/carousel1.jpg"></b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide img-src="http://localhost:1000/upload/image/menu2.jpg">
          <h1 id="carUcap" class="text-white">Menu</h1>
          <p id="carPa">Total : {{totalMenu}}</p>
        </b-carousel-slide>

        

      </b-carousel>
      
      <div class="container-fluid">
        <div class="col-md-12 mt-3">
          <h1 id="kategori" class="text-center">Kategori</h1>
        </div>  
        <div class="row">
          <div class="col-md-6">
            <img  src="http://localhost:1000/upload/image/makanan.jpg" alt="">
          </div>
          <div class="col-md-6">
            
            <h1 id="contentKat" class="text-center">Makanan</h1>
            
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <h1 id="contentKat" class="text-center">Minuman</h1>
          </div>
          <div class="col-md-6">
            
            <img  src="http://localhost:1000/upload/image/minuman.jpg" alt="">
            
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <img  src="http://localhost:1000/upload/image/snacks.jpg" alt="">
          </div>
          <div class="col-md-6">
            
            <h1 id="contentKat" class="text-center">Snacks</h1>
            
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <h1 id="contentKat" class="text-center">Main Course</h1>
          </div>
          <div class="col-md-6">
            
            <img  src="http://localhost:1000/upload/image/maincourse.jpg" alt="">
            
          </div>
        </div>
      </div>


    </div>
    
</template>
<script>
import axios from 'axios'

  export default {
    
    data() {
      return {
        totalMenu : '',
        slide: 0,
        sliding: null
        
        
      };
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
    mounted() {
      axios.get('http://localhost:1000/pelanggan/menu')
      .then(response => {
        this.totalMenu = response.data.total
      })
    }
  };
</script>
<style scoped>
@import 'https://fonts.googleapis.com/css?family=Pacifico&display=swap';
@import 'https://fonts.googleapis.com/css?family=Staatliches&display=swap';
@import 'https://fonts.googleapis.com/css?family=Bungee&display=swap';
@import 'https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap';
#carUcap{
  font-family: 'Pacifico';
  font-size: 10vh;
  
}
#carPa{
  font-family: 'Staatliches';
  font-size: 6vh;
}
#kategori{
  font-family: 'Bebas Neue';
  font-size: 10vh;
  
  color: #242b26;
  letter-spacing: 15px;
  text-decoration: #242b26;
}
.col-md-12{
  border-bottom: 3px solid #242b26 ;

}
#contentKat{
  font-family: 'Bungee';
  font-size: 10vh;
  color: #242b26;
  padding: 70px;
  margin-top: 50px;
}
</style>
